import React, { useState } from 'react'

import { getFacultyBySymbol } from '../../utils/public_getters'
import { addNewFaculty } from '../../utils/private_methods'

import { VscRunAll, VscChecklist } from 'react-icons/vsc';
import { FaStop } from 'react-icons/fa';

const styles = {
  faculty: 'h-[100%] w-[100%] px-[5%] flex flex-row justify-between',
  faculty__panel: 'h-[100%] w-[30%] p-[2%] flex flex-col bg-white/20 backdrop-blur rounded-2xl',
  panel__header: 'h-[10%] w-[100%] flex flex-row justify-center text-white font-semibold text-xl',
  faculty__get: 'w-[100%] h-[20%] flex flex-col',
  faculty__add: 'w-[100%] h-[35%] flex flex-col',
  inputs: 'h-[40px] outline-none mb-[5%] px-[4%] rounded',
  run: 'flex flex-row items-center justify-center self-end h-[4vh] w-[4vh] bg-blue-700 rounded-xl color-white',
  verify: 'flex flex-row items-center justify-center self-end h-[4vh] w-[4vh] mb-[2%] bg-blue-700 rounded-xl color-white',
  run__logo: 'text-gray-400 text-xl',
  label: 'text-gray-400 font-semibold mb-[2%]',
  data: 'h-[50px] w-full flex flex-col justify-center px-[5%] mb-[5%] text-gray-900 bg-blue-400/40 rounded-2xl font-semibold'
}

const Faculty = () => {
  const [requestedFaculty, setRequestedFaculty] = useState({});

  const [isVereficationStarted, setIsVerificationStarted] = useState(false);
  const [error, setError] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [verifiedValues, setVerifiedValues] = useState({});

  const getFaculty = (e) => {
    e.preventDefault();
    const symbol = document.querySelector('#getFacultySymbol').value;
    console.log(symbol);
    getFacultyBySymbol(setRequestedFaculty, symbol);
  }

  const startVerification = (e) => {
    e.preventDefault();
    setIsVerificationStarted(true);

    const symbol = document.querySelector('#facultySymbol').value;
    const name = document.querySelector('#facultyName').value;
    setInitialValues({name: name, symbol: symbol});
    document.querySelector('#facultySymbol').disabled = true;
    document.querySelector('#facultyName').disabled = true;
  }

  const cancelVerfication = (e) => {
    e.preventDefault();

    document.querySelector('#facultySymbol').disabled = false;
    document.querySelector('#facultyName').disabled = false;
    document.querySelector('#facultySymbol').value = '';
    document.querySelector('#facultyName').value = '';
    setInitialValues({});
    setIsVerificationStarted(false);

    setError(false)
  }

  const verify = (e) => {
    e.preventDefault();

    const name = document.querySelector('#verifyName').value;
    const symbol = document.querySelector('#verifySymbol').value;
    setVerifiedValues({name: name, symbol: symbol});

    console.log(initialValues);
    console.log(verifiedValues);
    if(initialValues.name == verifiedValues.name && initialValues.symbol == verifiedValues.symbol) {
      try {
        addNewFaculty(name, symbol);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      setError(true);
    }
  }

  return (
    <div className={styles.faculty}>

      {/* Get a Faculty */}
      <div className={styles.faculty__panel}>
        <div className={styles.panel__header}>
          <h1>Get a faculty</h1>
        </div>
        <form name='getFaculty' className={styles.faculty__get} onSubmit={getFaculty}>
          <input type="text" name="getFacultySymbol" id="getFacultySymbol" placeholder='Symbol of the faculty' className={styles.inputs}/>
          <button className={styles.run} type='submit' onSubmit={getFaculty}>
            <VscRunAll className={styles.run__logo}/>
          </button>
        </form>
        {
          requestedFaculty.facultyName ? (
            <div className={styles.result}>
              <p className={styles.label}>Name of the Faculty:</p>
              <h2 className={styles.data}>{requestedFaculty.facultyName}</h2>
              <p className={styles.label}>Symbol of the Faculty:</p>
              <h2 className={styles.data}>{requestedFaculty.facultySymbol}</h2>
              <p className={styles.label}>Date of joining WEB3:</p>
              <h2 className={styles.data}>2001-03-24</h2>
          </div>
          ) : (
            <>
            </>
          )
        }
        
      </div>

      {/* Add a Faculty */}
      <div className={styles.faculty__panel}>
        <div className={styles.panel__header}>
          <h1>Add a new Faculty</h1>
        </div>
        <form id='addFaculty' name='addFaculty' className={styles.faculty__add} onSubmit={startVerification}>
          <input type="text" name="facultyName" id="facultyName" placeholder='Name of the faculty' className={styles.inputs}/>
          <input type="text" name="facultySymbol" id="facultySymbol" placeholder='Symbol of the faculty' className={styles.inputs}/>
          <button className={styles.verify} type='submit' onSubmit={startVerification}>
            <VscChecklist className={styles.run__logo}/>
          </button>
        </form>
        {
          isVereficationStarted ? (
            <form action="" name='verifyFaculty' className={styles.faculty__add} onSubmit={verify}>
              <input type="text" name="verifyName" id="verifyName" placeholder='Name of the faculty' className={styles.inputs}/>
              <input type="text" name="verifySymbol" id="verifySymbol" placeholder='Symbol of the faculty' className={styles.inputs}/>
              <div className='flex flex-row self-end gap-5'>
                <button className={styles.run} onClick={cancelVerfication}>
                  <FaStop className={styles.run__logo}/>
                </button>
                <button className={styles.run} type='submit' onSubmit={verify}>
                  <VscRunAll className={styles.run__logo}/>
                </button>

              </div>
            </form>
          ) : (
            <></>
          )
        }

        {
          error ? (
            <h1 className='self-center mt-[10%] text-red-500 font-bold'>The inputted values does not match</h1>
          ) : (
            <></>
          )
        }

      </div>

      <div className={styles.faculty__panel}>
        <div className={styles.panel__header}></div>
      </div>
    </div>
  )
}

export default Faculty