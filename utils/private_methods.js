const ContractAbi = require('../../smart-contract/artifacts/contracts/UBB.sol/UBB.json')

const ethers = require('ethers');

//v1: 0x27aA42b45F54503E7Ae5c12b8c1E80C9B1Cd5708
const constractAddress = '0xDe03d8a408eaaCF71303a980c10A2b34aD485cBA';

export const addNewFaculty = async (name, symbol) => {
  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      )

      let faculty = await UBB.addFaculty(name, symbol);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export const addNewSpecialization = async (name, symbol, duration) => {
  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      )

      let specialization = await UBB.addSpecialization(name, symbol, duration);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export const enableSpecialization = async (name) => {
  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      )

      await UBB.enableSpecialization(name);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export const disableSpecialization = async (name) => {
  console.log(name);
  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      )

      await UBB.disableSpecialization(name);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export const disableStudent = async (cnp) => {
  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      )

      await UBB.studentSuspended(cnp);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export const enableStudent = async (cnp) => {
  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      )

      await UBB.studentResumed(cnp);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}