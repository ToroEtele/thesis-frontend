import { useAccount } from "wagmi";
const ethers = require("ethers");

const ContractAbi = require("../../../smart-contract_v2/artifacts/contracts/UBB.sol/UBB.json");
const constractAddress = "0x583598E081725DeB6CE6b52676d7E4A1a92df987";

export function useStudents() {
  const { isConnected } = useAccount();

  const addStudent = async (student) => {
    try {
      const ubb = initializeContract(isConnected);
      await ubb.addStudent(student);
    } catch (e) {
      console.log(e);
    }
  };

  const requestStudentStartsSpecialization = async (id, specialization) => {
    try {
      const ubb = initializeContract(isConnected);
      await ubb.studenStartsSpecialization(id, specialization);
    } catch (e) {
      console.log(e);
    }
  };

  const studentFinished = async (id) => {
    try {
      const ubb = initializeContract(isConnected);
      await ubb.studentFinished(id, specialization);
    } catch (e) {
      console.log(e);
    }
  };

  const studentSuspended = async (id) => {
    try {
      const ubb = initializeContract(isConnected);
      await ubb.studentSuspended(id, specialization);
    } catch (e) {
      console.log(e);
    }
  };

  const studentActivated = async (id) => {
    try {
      const ubb = initializeContract(isConnected);
      await ubb.studentActivated(id, specialization);
    } catch (e) {
      console.log(e);
    }
  };

  const studentChangeAddress = async (id, address) => {
    try {
      const ubb = initializeContract(isConnected);
      await ubb.studentChangeAddress(id, address);
    } catch (e) {
      console.log(e);
    }
  };

  const studentChangeIpfsUrl = async (id, ipfsUrl) => {
    try {
      const ubb = initializeContract(isConnected);
      await ubb.studentChangeImageIpfsUrl(id, ipfsUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    addStudent,
    requestStudentStartsSpecialization,
    studentFinished,
    studentSuspended,
    studentActivated,
    studentChangeAddress,
    studentChangeIpfsUrl,
  };
}

function initializeContract(isConnected) {
  if (isConnected) {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const UBB = new ethers.Contract(
          constractAddress,
          ContractAbi.abi,
          signer
        );
        return UBB;
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log(
      "In order to verify a student you have to connect to the blockchain. Find the connect button on the top right corner."
    );
  }
  return null;
}