import React from "react";
import { Formik, Field, Form, FormikConsumer } from "formik";
import { Button } from "@mui/material";

import { VscRunAll, VscChecklist } from "react-icons/vsc";

const styles = {
  specialization: "h-[100%] w-[100%] px-[5%] flex flex-row justify-between",
  specialization__cards:
    "h-[100%] w-[30%] p-[2%] bg-white/20 backdrop-blur rounded-2xl",
  specialization__headers:
    "h-[10%] w-[100%] flex flex-row justify-center text-white font-semibold",
};

const Specialization = () => {
  return (
    <div className={styles.specialization}>
      <div className={styles.specialization__cards}>
        <div className={styles.specialization__headers}>
          <h1>Add new faculty</h1>
        </div>
        <DynamicForm
          initialValues={{ name: "" }}
          submitFunction={() => {}}
          placeholders={["Name of the faculty"]}
        />
      </div>

      <div className={styles.specialization__cards}>
        <div className={styles.specialization__headers}>
          <h1>Add a new Specialization</h1>
        </div>
        <DynamicForm
          initialValues={{ specialization: "", faculty: "" }}
          submitFunction={() => {}}
          placeholders={["Name of the specialization", "Faculty name"]}
        />
      </div>

      <div className={styles.specialization__cards}>
        <div className={styles.specialization__headers}>
          <h1>Enable/Disable Specialization</h1>
        </div>
        <DynamicForm
          initialValues={{ specialization: "" }}
          submitFunction={() => {}}
          placeholders={["Name of the specialization"]}
        />
      </div>
    </div>
  );
};

export default Specialization;

function DynamicForm({ initialValues, submitFunction, placeholders }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitFunction(values)}
      key={placeholders[0]}
    >
      <Form className="flex flex-col mt-2">
        {Object.keys(initialValues).map((name, index) => (
          <Field
            name={name}
            placeholder={placeholders[index]}
            className="px-5 py-2 rounded outline-0 mb-5"
            autoComplete="off"
          />
        ))}
        <div className="w-[100%] flex justify-between">
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
  );
}
