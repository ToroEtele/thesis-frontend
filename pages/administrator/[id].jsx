import React from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { Formik, Form, Field } from "formik";

import { useWeb3Provider } from "../../Web3Context/Web3Context";
import { Button } from "@mui/material";

const styles = {
  modify: "h-screen w-screen px-[5%] py-[10%] flex flex-row bg-[#21242c]",
  modify__learnings: "h-[100%] w-[60%] flex justify-center items-center z-10",
  modify__container: "h-[100%] w-[80%] flex flex-col items-center ",
  modify__learnings_nr: "mb-[2%] text-xl text-gray-300/50",
  modify__card:
    "h-[80%] w-[100%] p-[2%] bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-xl text-gray-300/50",
  modify_content: "h-[100%] w-[100%] flex flex-col items-center",
  modify__other:
    "h-[100%] w-[40%] flex flex-col items-center justify-center gap-[15%]",
  modify__changers: "h-[40%] w-[80%] bg-white/20 backdrop-blur rounded-2xl",
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
          className="text-4xl text-gray-300/50 mr-4"
          onClick={() => handleNext(false)}
        />
        <div className={styles.modify__container}>
          <h1 className={styles.modify__learnings_nr}>
            Learnings:{" "}
            {Object.keys(student).length != 0 ? student.learnings.length : "0"}
          </h1>
          <LearningCard student={student} index={index} id={id}/>
        </div>
        <MdOutlineArrowForwardIos
          className="text-4xl text-gray-300/50 ml-4"
          onClick={() => handleNext(true)}
        />
      </div>

      <div className={styles.modify__other}>
        <div className={styles.modify__changers}></div>
        <div className={styles.modify__changers}></div>
      </div>
    </div>
  );
};

Modify.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { id };
};

export default Modify;

function LearningCard({ student, index , id}) {
  const [isAdding, setIsAdding] = React.useState(false);

  const {requestStudentStartsSpecialization} = useWeb3Provider();

  const learning = student?.learnings ? student?.learnings[index] : [];
  const status =
    learning?.state == 0
      ? "Active"
      : learning?.state == 1
      ? "Suspended"
      : "Finished";
  return (
    <div className={styles.modify__card}>
      {Object.keys(student).length != 0 &&
      index < student?.learnings?.length ? (
        <div className={styles.modify_content}>
          <h1>{student?.name && student.learnings[index].specialization}</h1>
          <p>Status: {status}</p>
          <p>Date:</p>
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
        <Formik initialValues={{ name: "" }} onSubmit={(values) => {
          requestStudentStartsSpecialization(id, values.name);
          setIsAdding(false);
        }}>
          <Form className="flex flex-col">
            <label htmlFor="name" className="mb-5">Specialization Name</label>
            <Field name="name" placeholder="Specialization Name" className="px-5 py-2 rounded outline-0"/>
            <div className="w-[100%] flex justify-between mt-5">
              <Button className="w-[48%] bg-blue-600" variant="contained" type="submit">Submit</Button>
              <Button className="w-[48%] bg-blue-600" variant="contained" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
}
