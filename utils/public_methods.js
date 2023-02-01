const ContractAbi = require('../../smart-contract/artifacts/contracts/UBB.sol/UBB.json')

const ethers = require('ethers');

//v1: 0x27aA42b45F54503E7Ae5c12b8c1E80C9B1Cd5708
const constractAddress = '0xDe03d8a408eaaCF71303a980c10A2b34aD485cBA';

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

export const getMyInfo = async (setStudentInfo) => {
  try {
    const { ethereum } = window

    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      console.log(signer);
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      )

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      let info = await UBB.verifyByAddress(accounts[0]) //itt
      console.log('Data for: ' + accounts[0]);

      let [spec, faculty] = await UBB.getSpecializationWithFaculty(info.studentSpecializationName)
      let facultyName = await UBB.getFaculty(faculty);

      console.log(facultyName);

      setStudentInfo(info)
      setStudentInfo(values => ({...values, ['address']: accounts[0]}))  //itt
      setStudentInfo(values => ({...values, ['faculty']: facultyName.facultyName}))

      
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getStudentByAddress = async (setUser, address) => {
  try {
    const { ethereum } = window

    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      )
      let info = await UBB.verifyByAddress(address)
      let [spec, faculty] = await UBB.getSpecializationWithFaculty(info.studentSpecializationName)
      let facultyName = await UBB.getFaculty(faculty);

      setUser(info)
      setUser(values => ({...values, ['faculty']: facultyName.facultyName}))  
      setUser(values => ({...values, ['address']: address}))  
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getStudentByCNP = async (setUser, CNP) => {
  try {
    const { ethereum } = window

    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      )
      let info = await UBB.verifyByCNP(CNP)
      let address = await UBB.getAddressByID(CNP)
      let [spec, faculty] = await UBB.getSpecializationWithFaculty(info.studentSpecializationName)
      let facultyName = await UBB.getFaculty(faculty);

      setUser(info)
      setUser(values => ({...values, ['faculty']: facultyName.facultyName}))  
      setUser(values => ({...values, ['address']: address}))  
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}