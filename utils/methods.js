const ContractAbi = require('../../smart-contract/artifacts/contracts/UBB.sol/UBB.json')

const ethers = require('ethers');

export const connectWallet = async (setCorrectNetwork, setIsUserLoggedIn,setCurrentAccount) => {
    try {
      const { ethereum } = window
      
      if(!ethereum) {
        console.log('Metamask not detected')
        return
      }
  
      let chainId = await ethereum.request({method: 'eth_chainId'})
      console.log('connected to chain:', chainId);
  
      const goerliChainId = '0x5'
      if (chainId != goerliChainId) {
        alert('you are not connected to the goerli testnet!')
        setCorrectNetwork(false)
        return
      } else {
        setCorrectNetwork(true)
      }
  
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('Found account ', accounts[0] );
      setIsUserLoggedIn(true)
      setCurrentAccount(accounts[0])
  
    } catch (error) {
      console.log(error)
    }
}

export const getStudentByAddress = async (setStudentInfo) => {
  try {
    const { ethereum } = window

    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      console.log(signer);
      const UBB = new ethers.Contract(
        '0x61db59b6a4B3E2Db2cAe265a51cA1ED87Ff4f40A',
        ContractAbi.abi,
        signer
      )

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      let info = await UBB.verifyByAddress(accounts[0])
      console.log(info);
      setStudentInfo(info)
      setStudentInfo(values => ({...values, ['address']: accounts[0]}))  
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}