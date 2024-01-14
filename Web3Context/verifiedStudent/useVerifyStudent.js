import { useAccount } from "wagmi";
import { ethers } from "ethers";

import { ContractAbi, ContractAddress } from "../__common";

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
            ContractAddress,
            ContractAbi.abi,
            signer
          );
          const [student, id] = await UBB.verifyByID(studentID);
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
            ContractAddress,
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
