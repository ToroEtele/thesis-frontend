import React from "react";
import { useAccount } from "wagmi";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import Card from "./Card";
import { useWeb3Provider } from "../../Web3Context/Web3Context";
import { AnimatePresence } from "framer-motion";

const styles = {
  conteiner: "z-0 h-[100%] w-[50%] py-[7%] pl-[5%] ",
  message: "w-[100%] mb-[2%] flex flex-col items-center",
  status: "h-[15%] w-[100%] flex flex-row text-center justify-center",
  element: "flex flex-row items-center pr-[5%] font-semibold gap-2",
  card: "w-[100%] h-[100%] flex flex-row",
  next: "text-3xl self-center ml-4 text-white/50 cursor-pointer",
};

const CardContainer = () => {
  const [message, setMessage] = React.useState();
  const [index, setIndex] = React.useState(0);
  const { isConnected } = useAccount();
  const { studentInfo } = useWeb3Provider();

  React.useEffect(() => {
    console.log(studentInfo);
    if (isConnected && studentInfo == undefined) {
      setMessage(
        <p className="text-red-500">
          There is no registered student associated with this account
        </p>
      );
    } else if (!isConnected) {
      setMessage(
        <p className="text-white/50">
          You must connect to a wallet in order to see your student card
        </p>
      );
    } else if (studentInfo != undefined) {
      setMessage(
        <p className="text-white/50">
          Learnings: {studentInfo?.learnings?.length}
        </p>
      );
    }
  }, [isConnected, studentInfo]);

  const handleNext = () => {
    console.log(index);
    if (index < studentInfo?.learnings.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0);
    }
  };

  return (
    <div className={styles.conteiner}>
      <div className={styles.message}>{message}</div>
      <div className={styles.card}>
        <AnimatePresence mode="wait">
          <Card index={index} />
        </AnimatePresence>
        <MdOutlineArrowForwardIos
          className={styles.next}
          onClick={() => handleNext()}
        />
      </div>
      <div className={styles.status}>
        <div className={styles.element + " text-green-700"}>
          <RiCheckboxBlankCircleFill />
          Ongoing
        </div>
        <div className={styles.element + " text-red-700"}>
          <RiCheckboxBlankCircleFill />
          Suspended
        </div>
        <div className={styles.element + " text-blue-700"}>
          <RiCheckboxBlankCircleFill />
          Finished
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
