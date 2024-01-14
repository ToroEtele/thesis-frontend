import { Button } from "@mui/material";
import React from "react";

import { DataGrid } from "@mui/x-data-grid";

const styles = {
  import_students:
    "h-screen w-screen px-[5%] py-[8%] flex flex-col items-center bg-[#21242c] text-gray-300/50",
  attention: "w-[50%] text-center mb-[2%]",
  button: "bg-blue-600",
};

const AddMultipleStudents = () => {
  const [students, setStudents] = React.useState([]);

  const handleFileChange = async (e) => {
    if (!e.target.files) {
      return;
    }
    const data = await readCsvFileToArrayOfObjects(e.target.files[0]);
    console.log(data);
    setStudents(data);
  };

  const columns = [
    { field: "id", headerName: "CNP", width: 140 },
    {
      field: "name",
      headerName: "Name",
      width: 140,
    },
    {
      field: "specialization",
      headerName: "Specialization",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 400,
    },
  ];

  console.log(students);

  return (
    <div className={styles.import_students}>
      <div className="app__effect z-0" />
      <p className={styles.attention}>
        Attention! We highly recommend checking the data multiple times to avoid
        any mistakes. Some of the data can not be changed after block
        confirmation
      </p>
      {students[0] ? (
        <DataGrid
          columns={columns}
          rows={students}
          sx={{ width: "900px", color: "white" }}
          color
          autoPageSize
        />
      ) : (
        <Button variant="contained" className={styles.button} component="label">
          Import student list
          <input type="file" hidden onChange={(e) => handleFileChange(e)} />
        </Button>
      )}
    </div>
  );
};

export default AddMultipleStudents;

function readCsvFileToArrayOfObjects(inputFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(inputFile);

    const csvToArray = [];
    reader.onload = () => {
      const csv = reader.result;
      const rows = csv.split("\n");
      const headers = rows[0].split(",");

      for (let i = 1; i < rows.length - 1; i++) {
        const currentRow = rows[i].split(",");
        const currentObject = {};

        for (let j = 0; j < headers.length; j++) {
          currentObject[headers[j]] = currentRow[j];
        }

        csvToArray.push(currentObject);
      }

      resolve(csvToArray);
    };

    reader.onerror = () => {
      reject(reader.error);
    };
  });
}
