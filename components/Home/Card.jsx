import { useState, useEffect } from "react";
import { GoPerson } from "react-icons/go";
import Image from "next/image";
import {motion} from "framer-motion";

import { useWeb3Provider } from "../../Web3Context/Web3Context";

const variants = {
  initial: {
    x: 150,
    z: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,

    transition: {
      x: { type: "spring", stiffness: 100, damping: 20 },
      opacity: { duration: 0.2 },
      duration: 2,
    },
  },
  exit: {
    x: -1000,

    transition: {
      x: { type: "spring", stiffness: 150, damping: 30 },
      opacity: { duration: 0.1 },
      duration: 2,
    },
  },
};

const styles = {
  card: "h-[100%] w-[100%] p-[3%] flex flex-row items-center font-bold border card",
  content: "h-full w-[95%] m-[3%] flex flex-col z-20",
  address:
    "h-[5%] w-[5%] flex items-center justify-center text-[70%] -rotate-90 z-10",
  header: "h-[8%] w-full flex flex-row items-center justify-between",
  title: "text-[180%]",
  design: "h-[80%] w-[60%] design",
  inner__content: "h-[80%] w-full py-[4%] pr-[5%] flex flex-row",
  image:
    "h-full w-[32%] flex items-center justify-center text-white text-[1300%] rounded-xl",
  data: "h-full w-[68%] px-[8%] py-[4%]",
  label: "font-semibold text-[80%] text-gray-800",
  info: "font-bold text-[80%]",
  university: "flex items-center justify-center font-bold text-[120%]",
};

const Card = ({ index }) => {
  const [color, setColor] = useState("text-white/100");
  const [borderColor, setBorderColor] = useState("border-white/100");
  const [backgroundColor, setBackgroundColor] = useState(
    "bg-gradient-to-r from-white/100"
  );

  const { studentInfo } = useWeb3Provider();

  useEffect(() => {
    if (Object.keys(studentInfo).length != 0) {
      if (studentInfo.learnings[index].state == 2) {
        setColor("text-blue-700/100");
        setBorderColor("border-blue-700/100");
        setBackgroundColor("border-blue-700/100");
      } else if (studentInfo.learnings[index].state == 1) {
        setColor("text-red-700/100");
        setBorderColor("border-red-700/100");
        setBackgroundColor("border-red-700/100");
      } else if (
        studentInfo.learnings[index].state == 0 &&
        JSON.stringify(studentInfo) != "{}"
      ) {
        setColor("text-green-700/100");
        setBorderColor("border-green-700/100");
        setBackgroundColor("bg-gradient-to-r from-green-700/100");
      }
    } else {
      setColor("text-white/100");
      setBorderColor("border-white/100");
      setBackgroundColor("bg-gradient-to-r from-white/100");
    }
  }, [studentInfo]);

  return (
    <motion.div
      className={styles.card + " " + borderColor}
      key={index}
      variants={variants}
      animate="animate"
      initial="initial"
      exit="exit"
    >
      <div className="background" />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title + " " + color}>student card</h1>
          <div className={styles.design + " " + backgroundColor}></div>
        </div>

        <div className={styles.inner__content}>
          <div className={styles.image}>
            {studentInfo.ipfsUrl ? (
              <Image
                className="rounded-xl"
                src={studentInfo.ipfsUrl}
                width={130}
                height={150}
                alt="student-image"
              />
            ) : (
              <GoPerson />
            )}
          </div>
          <div className={styles.data}>
            <h2 className={styles.label}>Name</h2>
            <p className={styles.info + " " + color}>
              {!studentInfo.name ? "Firstname Lastname" : studentInfo.name}
            </p>
            <h2 className={styles.label}>CNP</h2>
            <p className={styles.info + " " + color}>
              {!studentInfo.id ? "Your CNP" : studentInfo.id}
            </p>
            <h2 className={styles.label}>Faculty</h2>
            <p className={styles.info + " " + color}>
              {!studentInfo.name
                ? "Your Faculty"
                : studentInfo.learnings[index].faculty}
            </p>
            <h2 className={styles.label}>Specialization</h2>
            <p className={styles.info + " " + color}>
              {!studentInfo.name
                ? "Your Specialization"
                : studentInfo.learnings[index].specialization}
            </p>
          </div>
        </div>

        <div className={styles.university + " " + color}>
          <h2>University of Babeș Bolyai</h2>
        </div>
      </div>

      <div className={styles.address + " " + color}>
        <p>
          {!studentInfo.walletAddress
            ? "0x0000000000000000000000000000000000000000"
            : studentInfo.walletAddress}
        </p>
      </div>
    </motion.div>
  );
};

export default Card;
