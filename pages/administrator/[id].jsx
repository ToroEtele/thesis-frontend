import React from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { Formik, Form, Field, useFormikContext, FormikConsumer } from "formik";

import { useWeb3Provider } from "../../Web3Context/Web3Context";
import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  initial: {
    x: 50,
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
    x: -150,
    transition: {
      x: { type: "spring", stiffness: 150, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
};

const styles = {
  modify:
    "h-screen w-screen px-[5%] py-[8%] flex flex-row items-center bg-[#21242c] text-gray-300/50",
  modify__learnings: "h-[80%] w-[60%] flex justify-center items-center z-10",
  modify__container: "h-[100%] w-[80%] flex flex-col items-center ",
  modify__learnings_nr: "mb-[2%] text-xl ",
  modify__card:
    "h-[80%] w-[100%] p-[4%] bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-xl text-gray-300/50",
  modify_content: "h-[100%] w-[100%] flex flex-col",
  modify__title: "self-center mb-[2%]",
  modify__statuschange: "flex flex-row h-[100%] w-[100%] justify-between",
  modify__option: "w-[30%] text-gray-400 text-center text-base cursor-pointer",
  modify__other:
    "h-[100%] w-[40%] flex flex-col items-center justify-center gap-[5%]",
  modify__changers:
    "h-[50%] w-[80%] flex flex-col bg-white/20 backdrop-blur rounded-2xl p-[4%] font-semibold",
};

const Modify = ({ id }) => {
  const [student, setStudent] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const { verifyByID } = useWeb3Provider();

  async function getStudent() {
    if (id != undefined) {
      const response = await verifyByID(id);
      setStudent(response);
    }
  }

  React.useEffect(() => {
    getStudent();
  }, [id]);

  const handleNext = (forvard) => {
    console.log("current", index);
    if (forvard && index < student?.learnings?.length) {
      setIndex((prev) => prev + 1);
    } else if (index > 0 && !forvard) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.modify}>
      <div className="app__effect z-0" />

      <div className={styles.modify__learnings}>
        <MdOutlineArrowBackIosNew
          className="text-4xl text-gray-300/50 mr-4 cursor-pointer"
          onClick={() => handleNext(false)}
        />
        <div className={styles.modify__container}>
          <h1 className={styles.modify__learnings_nr}>
            Learnings:{" "}
            {Object.keys(student).length != 0 ? student.learnings.length : "0"}
          </h1>
          <AnimatePresence mode="wait">
            <LearningCard student={student} index={index} id={id} />
          </AnimatePresence>
        </div>
        <MdOutlineArrowForwardIos
          className="text-4xl text-gray-300/50 ml-4 cursor-pointer"
          onClick={() => handleNext(true)}
        />
      </div>

      <div className={styles.modify__other}>
        <div className={styles.modify__changers}>
          <h1 className={styles.modify__title}>Change Address</h1>
          <p>Current Address</p>
          <p>{student?.walletAddress ? student.walletAddress : ""}</p>
          <Formik
            initialValues={{ address: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="flex flex-col mt-2">
              <Field
                name="address"
                placeholder="Place the new address"
                className="px-5 py-2 rounded outline-0"
                autoComplete="off"
              />
              <div className="w-[100%] flex justify-between mt-5">
                <Button
                  className="w-[48%] bg-blue-600"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
                <FormikConsumer>
                  {({ resetForm }) => (
                    <Button
                      className="w-[48%] bg-blue-600"
                      variant="contained"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                  )}
                </FormikConsumer>
              </div>
            </Form>
          </Formik>
        </div>
        <div className={styles.modify__changers}>
          <h1 className={styles.modify__title}>Change IPFS URL:</h1>
          <Formik
            initialValues={{ ipfs: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="flex flex-col mt-2">
              <Field
                name="ipfs"
                placeholder="Place the new IPFS url"
                className="px-5 py-2 rounded outline-0 text-black"
                autoComplete="off"
              />
              <div className="w-[100%] flex justify-between mt-5">
                <Button
                  className="w-[48%] bg-blue-600"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
                <FormikConsumer>
                  {({ resetForm }) => (
                    <Button
                      className="w-[48%] bg-blue-600"
                      variant="contained"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                  )}
                </FormikConsumer>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

Modify.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { id };
};

export default Modify;

function LearningCard({ student, index, id }) {
  const [isAdding, setIsAdding] = React.useState(false);

  const {
    requestStudentStartsSpecialization,
    studentFinished,
    studentSuspended,
    studentActivated,
  } = useWeb3Provider();

  const learning = student?.learnings ? student?.learnings[index] : [];
  const status =
    learning?.state == 0 ? (
      <p className="text-green-500">Active</p>
    ) : learning?.state == 1 ? (
      <p className="text-red-500">Suspended</p>
    ) : (
      <p className="text-blue-500">Finished</p>
    );

  const handleRequestActivate = () => {
    if (learning?.state == 1) {
      studentActivated(student.id, learning.specialization);
    }
  };
  const handleRequestSuspend = () => {
    console.log("Suspension requested");
    if (learning?.state == 0) {
      studentSuspended(student.id, learning.specialization);
    }
  };
  const handleRequestFinish = () => {
    if (learning?.state == 0) {
      studentFinished(student.id, learning.specialization);
    }
  };
  return (
    <motion.div
      className={styles.modify__card}
      key={index}
      variants={variants}
      animate="animate"
      initial="initial"
      exit="exit"
    >
      {Object.keys(student).length != 0 &&
      index < student?.learnings?.length ? (
        <div className={styles.modify_content}>
          <h1 className={styles.modify__title}>
            {student?.name && student.learnings[index].specialization}
          </h1>
          <p className="flex flex-row gap-4">Status: {status}</p>
          <p>Date:</p>
          <h1 className="text-white self-center font-bold mb-[3%]">
            Change Status
          </h1>
          <div className={styles.modify__statuschange}>
            <div
              className={styles.modify__option + " hover:text-green-500"}
              onClick={() => handleRequestActivate()}
            >
              <p>
                If the student has been suspended, but his studies continue,
                mark as active student.
              </p>
            </div>
            <div
              className={styles.modify__option + " hover:text-red-500"}
              onClick={() => handleRequestSuspend()}
            >
              <p>
                If you want to suspend a student, set his state to suspended.
              </p>
            </div>
            <div
              className={styles.modify__option + " hover:text-blue-500"}
              onClick={() => handleRequestFinish()}
            >
              <p>
                Caution! Setting the students finished state to true is final!
              </p>
            </div>
          </div>
        </div>
      ) : !isAdding ? (
        <Button
          className="h-10 bg-blue-600"
          variant="contained"
          onClick={() => setIsAdding(true)}
        >
          Add a learning
        </Button>
      ) : (
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values) => {
            requestStudentStartsSpecialization(id, values.name);
            setIsAdding(false);
          }}
        >
          <Form className="flex flex-col">
            <label htmlFor="name" className="mb-5">
              Specialization Name
            </label>
            <Field
              name="name"
              placeholder="Specialization Name"
              className="px-5 py-2 rounded outline-0"
            />
            <div className="w-[100%] flex justify-between mt-5">
              <Button
                className="w-[48%] bg-blue-600"
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
              <Button
                className="w-[48%] bg-blue-600"
                variant="contained"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </motion.div>
  );
}
