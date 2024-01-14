import { createContext, useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import { getSession, useSession } from "next-auth/react";

import { useConnectedStudent } from "./connectedUser/useConnectedStudent";
import { useVerifyStudent } from "./verifiedStudent/useVerifyStudent";
import { useStudents } from "./students/useStudents";

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [accountInfo, setAccountInfo] = useState({});

  const { isConnected } = useAccount();
  const { status } = useSession();

  const { studentInfo } = useConnectedStudent();
  const { ...verifyStudentsData } = useVerifyStudent();
  const { ...useStudentsData } = useStudents();

  //*If the user is authenticated in session and connected to the chain, getfrom the session
  useEffect(() => {
    if (isConnected == true && status == "authenticated") {
      getSessionUser();
    }
  }, [isConnected, status]);

  const getSessionUser = async () => {
    const session = await getSession();
    if (!session) {
      setAccountInfo(null);
    } else {
      setAccountInfo(session.user);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        accountInfo,
        setAccountInfo,
        studentInfo,
        ...verifyStudentsData,
        ...useStudentsData,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Provider = () => {
  return useContext(Web3Context);
};
