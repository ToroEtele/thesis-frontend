import { createContext, useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import { getSession, useSession } from "next-auth/react";

import { useConnectedStudent } from "./connectedUser/useConnectedStudent";
import { useVerifyStudent } from "./verifiedStudent/useVerifyStudent";
import { useStudents } from "./students/useStudents";

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [accountInfo, setAccountInfo] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const { isConnected } = useAccount();
  const { status } = useSession();

  const { studentInfo } = useConnectedStudent();
  const { verifyByID, verifyByAddress } = useVerifyStudent();
  const {
    addStudent,
    requestStudentStartsSpecialization,
    studentFinished,
    studentSuspended,
    studentActivated,
    studentChangeAddress,
    studentChangeIpfsUrl,
  } = useStudents();

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
        isUserLoggedIn,
        studentInfo,
        verifyByAddress,
        verifyByID,
        addStudent,
        requestStudentStartsSpecialization,
        studentFinished,
        studentSuspended,
        studentActivated,
        studentChangeAddress,
        studentChangeIpfsUrl,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Provider = () => {
  return useContext(Web3Context);
};
