import React from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

import { ContractAbi, ContractAddress } from "../__common";

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
            ContractAddress,
            ContractAbi.abi,
            signer
          );
          async function getData() {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            try {
              let [student, id] = await UBB.verifyByAddress(accounts[0]);
              setStudentInfo(student);
              setStudentInfo((values) => ({ ...values, ["id"]: id }));
            } catch (e) {
              console.log(e);
            }
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
