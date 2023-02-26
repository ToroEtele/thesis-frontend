import React from "react";
import { useAccount } from "wagmi";
const ethers = require("ethers");

const ContractAbi = require("../../../smart-contract_v2/artifacts/contracts/UBB.sol/UBB.json");
const constractAddress = "0x583598E081725DeB6CE6b52676d7E4A1a92df987";

export function useConnectedStudent() {
  const [studentInfo, setStudentInfo] = React.useState({});
  const { isConnected } = useAccount();

  React.useEffect(() => {
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
          async function getData() {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            let [student, id] = await UBB.verifyByAddress(accounts[0]);
            setStudentInfo(student);
            setStudentInfo((values) => ({...values, ["id"]: id}));
          }
          getData();
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setStudentInfo({});
    }
  }, [isConnected]);

  return { studentInfo };
}
