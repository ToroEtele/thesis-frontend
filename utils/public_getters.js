import { Specialization } from '../components';

const ContractAbi = require('../../smart-contract/artifacts/contracts/UBB.sol/UBB.json')

const ethers = require('ethers');

//v1: 0x27aA42b45F54503E7Ae5c12b8c1E80C9B1Cd5708
const constractAddress = '0xDe03d8a408eaaCF71303a980c10A2b34aD485cBA';

export const getFacultyBySymbol = async (setFaculty, symbol) => {
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

      let faculty = await UBB.getFaculty(symbol)
      
      setFaculty(faculty)
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getSpecializationByName = async (setSpecialization, name) => {
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

      let specialization = await UBB.getSpecialization(name)
      console.log(specialization);

      setSpecialization(specialization)
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}