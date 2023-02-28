import React, { useState } from "react";
import { VscRunAll } from "react-icons/vsc";
import { Button } from "@mui/material";
import Link from "next/link";

import { useWeb3Provider } from "../../Web3Context/Web3Context";
import AddStudent from "../Administrator/modals/AddStudent";

const styles = {
  student: "h-[100%] w-[100%] px-[5%] flex flex-row justify-between",
  student__panel:
    "flex flex-col h-[100%] w-[40%] p-[2%] bg-white/20 backdrop-blur rounded-2xl",
  student__panel_header:
    "h-[10%] w-[100%] flex flex-row justify-center text-white font-semibold",
  student__form: "w-[100%] h-[20%] flex flex-col",
  student__inputs: "h-[40px] outline-none mb-[5%] px-[4%] rounded bg-white/80",
  students__run:
    "flex flex-row items-center justify-center self-end h-[4vh] w-[4vh] bg-blue-700 rounded-xl color-white",
  student__result: "flex flex-col w-[100%]",
  student__label: "text-gray-400/50 font-semibold mb-[1%] text-sm",
  student__data: "text-green-400 font-semibold mb-[1%] text-xl",
  title: "text-white self-center font-bold mb-[9%]",
  student__address: "w-[100%] h-[70%] flex flex-col",
  modify:
    "mt-[8%] self-center px-[5%] py-[2%] rounded-2xl text-red-400 border-2 border-red-400 font-bold",
  modificationConatiner: "flex flex-col h-[100%] w-[60%]",
  adressMod:
    "flex flex-col h-[90%] w-[48%] p-[4%] bg-white/20 backdrop-blur rounded-2xl",
  specMod:
    "flex flex-col h-[90%] w-[48%] p-[4%] bg-white/20 backdrop-blur rounded-2xl",
  statusMod:
    "flex flex-col h-[40%] p-[2%] w-[100%] bg-white/20 backdrop-blur rounded-2xl",
  statusBar: "flex flex-row h-[100%] w-[100%] justify-between",
  option: "w-[30%] text-gray-400 text-center cursor-pointer",
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

            <Link href={`/administrator/${student.id}`}>
              <button className={styles.modify} onClick={startModification}>
                Modify student data
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className={styles.student__add}>
        <div className={styles.student__panel_header}>
          <h1>Add new students</h1>
        </div>
        <div className={styles.button__container}>
          <Button variant="contained" onClick={() => setIsAddStudentOpen(true)}>
            Add a new student
          </Button>
          <Button variant="contained">Add multiple students</Button>
        </div>
      </div>

      <AddStudent
        isAddStudentOpen={isAddStudentOpen}
        setIsAddStudent={setIsAddStudentOpen}
      />
    </div>
  );
};

export default Student;

// {
//   isModificationStarted ? (
//     <div className={styles.modificationConatiner}>
//   <div className='flex flex-row justify-between h-[70%] w-[100%]'>
//     <div className={styles.adressMod}>
//       <h1 className={styles.title}>Change Address</h1>
//       <form name='modifyAddress' onSubmit={requestAddressModification} className={styles.student__address}>
//         <input type="text" id="newAddress" placeholder='New address of the student' className={styles.student__inputs}/>
//         <input type="text" id="newAddress1" placeholder='Repeat the address' className={styles.student__inputs}/>
//         <button className={styles.students__run} type='submit'>
//           <VscRunAll className={styles.run__logo}/>
//         </button>
//       </form>
//     </div>
//     <div className={styles.specMod}>
//     <h1 className={styles.title}>Change Specialization</h1>
//     <form name='modifySpecialization' onSubmit={requestAddressModification} className={styles.student__address}>
//         <input type="text" id="newAddress" placeholder='New specialization of the student' className={styles.student__inputs}/>
//         <input type="text" id="newAddress1" placeholder='Repeat the specialization' className={styles.student__inputs}/>
//         <button className={styles.students__run} type='submit'>
//           <VscRunAll className={styles.run__logo}/>
//         </button>
//       </form>
//     </div>
//   </div>

//   <div className={styles.statusMod}>
//     <h1 className='text-white self-center font-bold mb-[3%]'>Change Status</h1>
//     <div className={styles.statusBar}>
//       <div className={styles.option + ' hover:text-green-500'} onClick={requestEnableStudent}>
//         <p>If the student has been suspended, but his studies continue, mark as active student.</p>
//       </div>
//       <div className={styles.option + ' hover:text-red-500'} onClick={requestSuspendStudent}>
//         <p>If you want to suspend a student, set his state to suspended.</p>
//       </div>
//       <div className={styles.option + ' hover:text-blue-500'} onClick={requestFinishStudent}>
//         <p>Caution! Setting the students finished state to true is final!</p>
//       </div>
//     </div>
//   </div>
// </div>
//   ) : (

//   )
// }
