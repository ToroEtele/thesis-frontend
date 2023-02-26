import { useAccount } from "wagmi";
const ethers = require("ethers");

const ContractAbi = require("../../../smart-contract_v2/artifacts/contracts/UBB.sol/UBB.json");
const constractAddress = "0x583598E081725DeB6CE6b52676d7E4A1a92df987";

export function useVerifyStudent() {
  const { isConnected } = useAccount();

  const verifyByID = async (studentID) => {
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
          const [student, id] = await UBB.verifyByID(studentID);
          console.log(student);
          return { ...student, id: id };
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
    return;
  };

  const verifyByAddress = async (address) => {
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
          const [student, id] = await UBB.verifyByAddress(address);
          return { ...student, id: id };
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
    return;
  };

  return { verifyByID, verifyByAddress };
}
