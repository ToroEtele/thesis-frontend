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