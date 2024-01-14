import React, { useState } from "react";

import { Modal, Box, Typography, Button } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { AiOutlineUpload } from "react-icons/ai";

import uploadToIpfs from "../../../utils/ipsf";
import { useWeb3Provider } from "../../../Web3Context/Web3Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "20px",
};

const styles = {
  add__form: "w-[100%] h-[100%] p-[3%] flex flex-col ",
  add__title:
    "w-[100%] pb-[5%] mb-[5%] text-center font-bold border-b border-b-2 border-black",
  add__inputs: " border border-2 p-3 rounded-2xl",
  add__labels: "mt-[3%] pb-3",
  add__horizontal: "flex flex-row mt-[10%] gap-2",
  add__button: "mt-[10%] bg-blue-500",
};

const AddStudent = ({ isAddStudentOpen, setIsAddStudent }) => {
  const [file, setFile] = useState(undefined);

  const { addStudent } = useWeb3Provider();

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const x = e.target.files[0];
    setFile(x);
    //uploadToIpfs(file);
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    // console.log(file);
    if (file != undefined) {
      try {
        const ipfs = await uploadToIpfs(file);
        addStudent({
          name: values.name,
          id: values.cnp,
          ipfsUrl: ipfs[0].path,
          walletAddress: values.address,
          specialization: values.specialization,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal open={isAddStudentOpen} onClose={() => setIsAddStudent(false)}>
      <Box sx={style}>
        <Typography
          className={styles.add__title}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Add a new Student
        </Typography>

        <Formik
          initialValues={{
            name: "",
            address: "",
            cnp: "",
            specialization: "",
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form className={styles.add__form}>
            <label htmlFor="name" className={styles.add__labels}>
              Name
            </label>
            <Field
              className={styles.add__inputs}
              id="name"
              name="name"
              placeholder="John Doe"
            />

            <label htmlFor="address" className={styles.add__labels}>
              Address
            </label>
            <Field
              className={styles.add__inputs}
              id="address"
              name="address"
              placeholder="0x0000000000000000000000000000000000000000"
            />

            <label htmlFor="cnp" className={styles.add__labels}>
              CNP
            </label>
            <Field
              className={styles.add__inputs}
              id="cnp"
              name="cnp"
              placeholder="Student CNP"
            />

            <div className={styles.add__horizontal}>
              <Field
                className={styles.add__inputs}
                id="specialization"
                name="specialization"
                placeholder="Student specialization"
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={<AiOutlineUpload />}
                sx={{ marginLeft: "auto" }}
              >
                Upload image
                <input type="file" hidden onChange={handleFileUpload} />
              </Button>
            </div>

            <Button
              type="submit"
              className={styles.add__button}
              variant="contained"
            >
              Add
            </Button>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddStudent;
