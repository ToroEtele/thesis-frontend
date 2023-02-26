import React, { useState } from "react";

import { Modal, Box, Typography, Button } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { AiOutlineUpload } from "react-icons/ai";

import uploadToIpfs from "../../../utils/ipsf";

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
    "w-[100%] pb-[5%] mb-[10%] text-center font-bold border-b border-b-2 border-black",
  add__inputs: " border border-2 p-3 rounded-2xl",
  add__labels: "mt-[3%] pb-3",
  add__horizontal: "flex flex-row mt-[10%] gap-2",
};

const AddStudent = ({ isAddStudentOpen, setIsAddStudent }) => {
  const [file, setFile] = useState("");

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const x = e.target.files[0];
    setFile(x);
    //uploadToIpfs(file);
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
            setIsAddStudent(false);
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
                sx={{ marginRight: "1rem" }}
              >
                Upload image
                <input type="file" hidden onChange={handleFileUpload} />
              </Button>
              {/* testFile.csv in <i>src dir</i>
              <Box>{filename}</Box> */}
            </div>

            <Button type="submit" sx={{ mt: "10%" }} variant="contained">
              Add
            </Button>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddStudent;
