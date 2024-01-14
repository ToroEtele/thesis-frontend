import React, { useState } from "react";
import { VscRunAll } from "react-icons/vsc";
import { Button } from "@mui/material";
import Link from "next/link";
import { red } from "@mui/material/colors";

import { useWeb3Provider } from "../../Web3Context/Web3Context";
import AddStudent from "../Administrator/modals/AddStudent";

const styles = {
  student: "h-[100%] w-[100%] px-[5%] flex flex-row justify-between",
  student__panel:
    "flex flex-col h-[100%] w-[40%] p-[2%] bg-white/20 backdrop-blur rounded-2xl",
  student__panel_header:
    "h-[10%] w-[100%] mb-[5%] flex flex-row justify-center text-white font-semibold",
  student__form: "w-[100%] h-[20%] flex flex-col",
  student__inputs: "h-[40px] outline-none mb-[5%] px-[4%] rounded bg-white/80",
  students__run:
    "flex flex-row items-center justify-center self-end h-[4vh] w-[4vh] bg-blue-700 rounded-xl color-white",
  student__result: "flex flex-col w-[100%]",
  student__label: "text-gray-400/50 font-semibold mb-[1%] text-sm",
  student__data: "text-green-400 font-semibold mb-[1%] text-xl",
  title: "text-white self-center font-bold mb-[9%]",
  student__address: "w-[100%] h-[70%] flex flex-col",
  student__modify: "mt-[5%] self-center",
  modificationConatiner: "flex flex-col h-[100%] w-[60%]",
  student__add:
    "flex flex-col h-[100%] w-[50%] p-[2%] bg-white/20 backdrop-blur rounded-2xl",
  student__add_form: "flex flex-col h-[90%]",
  button__container: "w-[100%] flex justify-center gap-4 ",
};

const Student = () => {
  const [student, setStudent] = useState({});
  const [isModificationStarted, setIsModificationStarted] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const { verifyByID } = useWeb3Provider();

  const requerstStudentInfo = async (e) => {
    e.preventDefault();
    const id = document.querySelector("#id").value;
    setStudent(await verifyByID(id));
  };

  const startModification = (e) => {
    document.querySelector("#id").disabled = true;
    setIsModificationStarted(true);
  };

  return (
    <div className={styles.student}>
      <div className={styles.student__panel}>
        <div className={styles.student__panel_header}>
          <h1>Get student information</h1>
        </div>

        <form
          name="getStudent"
          onSubmit={requerstStudentInfo}
          className={styles.student__form}
        >
          <input
            type="text"
            id="id"
            placeholder="CNP of the student"
            className={styles.student__inputs}
          />
          <button className={styles.students__run} type="submit">
            <VscRunAll className={styles.run__logo} />
          </button>
        </form>

        {student.name && (
          <div className={styles.student__result}>
            <p className={styles.student__label}>Full Name:</p>
            <h2 className={styles.student__data}>{student.name}</h2>
            <p className={styles.student__label}>Address:</p>
            <h2 className="text-green-400 font-semibold mb-[1%]">
              {student.walletAddress}
            </h2>
            <p className={styles.student__label}>Number of learnings at UBB:</p>
            <h2 className={styles.student__data}>{student.learnings.length}</h2>

            <Link
              href={`/administrator/${student.id}`}
              className={styles.student__modify}
            >
              <Button
                variant="contained"
                color="error"
                className="bg-red-500"
                onClick={startModification}
              >
                Modify student data
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className={styles.student__add}>
        <div className={styles.student__panel_header}>
          <h1>Add new students</h1>
        </div>
        <div className={styles.button__container}>
          <Button
            className="bg-blue-600"
            variant="contained"
            onClick={() => setIsAddStudentOpen(true)}
          >
            Add a new student
          </Button>
          <Link href="/administrator/import-students">
            <Button className="bg-blue-600" variant="contained">
              Add multiple students
            </Button>
          </Link>
        </div>

        <p className="px-[7%] mt-[10%] text-white/50">
          You can add students manually by clicking on the first button above or
          you can import a list of students by clicking the second button.
        </p>
        <p className="px-[7%] mt-[5%] text-white/50">
          Don't forget, adding a new student leaves permanent marks of the data
          on the blockchain.
        </p>
      </div>

      <AddStudent
        isAddStudentOpen={isAddStudentOpen}
        setIsAddStudent={setIsAddStudentOpen}
      />
    </div>
  );
};

export default Student;
