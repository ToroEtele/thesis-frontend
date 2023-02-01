import React, { useState } from 'react'

import { getSpecializationByName } from '../../utils/public_getters'
import { addNewSpecialization, enableSpecialization, disableSpecialization } from '../../utils/private_methods'


import { VscRunAll, VscChecklist } from 'react-icons/vsc';
import { FaStop } from 'react-icons/fa';

const styles = {
  specialization: 'h-[100%] w-[100%] px-[5%] flex flex-row justify-between',
  specialization__panels: 'h-[100%] w-[30%] p-[2%] bg-white/20 backdrop-blur rounded-2xl',
  panel__headers: 'h-[10%] w-[100%] flex flex-row justify-center text-white font-semibold',
  specialization__get: 'w-[100%] h-[20%] flex flex-col',
  specialization__add: 'w-[100%] h-[45%] flex flex-col',
  specialization__enable: 'w-[100%] h-[20%] flex flex-col',
  inputs: 'h-[40px] outline-none mb-[6%] px-[4%] rounded',
  label: 'text-gray-400 font-semibold mb-[2%]',
  data: 'h-[50px] w-full flex flex-col justify-center px-[5%] mb-[5%] text-gray-900 bg-blue-400/40 rounded-2xl font-semibold',
  run: 'flex flex-row items-center justify-center self-end h-[4vh] w-[4vh] bg-blue-700 rounded-xl color-white',
  run__logo: 'text-gray-400 text-xl',
  verify: 'flex flex-row items-center justify-center self-end h-[4vh] w-[4vh] mb-[4%] bg-blue-700 rounded-xl color-white',
  disable: 'px-[8%] py-[2%] mt-[5%] bg-red-500 rounded-2xl text-red-800 border-2 border-red-600',
  enable: 'px-[8%] py-[2%] mt-[5%] bg-green-500 rounded-2xl text-green-800 border-2 border-green-600',
}

const Specialization = () => {
  const [requestedSpecialization, setRequestedSpecialization] = useState({});

  const [isVereficationStarted, setIsVerificationStarted] = useState(false);
  const [error, setError] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [verifiedValues, setVerifiedValues] = useState({});

  const getSpecialization = (e) => {
    e.preventDefault();

    let name = document.querySelector('#specilaizationName').value;
    if (name == '') {
      name = document.querySelector('#specializationName1').value;
    }

    getSpecializationByName(setRequestedSpecialization, name);
  }

  const startVerification = (e) => {
    e.preventDefault();
    setIsVerificationStarted(true);

    const name = document.querySelector('#specializationName').value;
    const symbol = document.querySelector('#facultySymbol').value;
    const duration = document.querySelector('#specializationDuration').value;
  
    setInitialValues({name: name, symbol: symbol, duration: duration});
    document.querySelector('#specializationName').disabled = true;
    document.querySelector('#facultySymbol').disabled = true;
    document.querySelector('#specializationDuration').disabled = true;
  }

  const cancelVerfication = (e) => {
    e.preventDefault();

    document.querySelector('#facultySymbol').disabled = false;
    document.querySelector('#specializationName').disabled = false;
    document.querySelector('#specializationDuration').disabled = false;
    document.querySelector('#facultySymbol').value = '';
    document.querySelector('#specializationName').value = '';
    document.querySelector('#specializationDuration').value = '';

    setInitialValues({});
    setIsVerificationStarted(false);
    setError(false);
  }

  const verify = (e) => {
    e.preventDefault();

    const name = document.querySelector('#verifyName').value;
    const symbol = document.querySelector('#verifySymbol').value;
    const duration = document.querySelector('#specializationDuration').value;

    setVerifiedValues({name: name, symbol: symbol, duration: duration});

    console.log(initialValues);
    console.log(verifiedValues);
    if(initialValues.name == verifiedValues.name && initialValues.symbol == verifiedValues.symbol) {
      try {
        addNewSpecialization(name, symbol, duration);
      } catch (error) {
        console.log(error);
      }
      console.log('Verification Succesfuel');
    }
    else {
      setError(true);
    }
  }

  const requestEnableSpecialization = () => {
    let name = document.querySelector('#specializationName1').value;
    if(name != null){
      enableSpecialization(name);
      setRequestedSpecialization({});
    }
  }

  const requestDisableSpecialization = () => {
    let name = document.querySelector('#specializationName1').value;
    if(name != null){
      disableSpecialization(name);
      setRequestedSpecialization({});
    }
  }

  return (
    <div className={styles.specialization}>

      {/* Get a Specialization */}
      <div className={styles.specialization__panels}>
        <div className={styles.panel__headers}>
          <h1>Get a Specialization</h1>
        </div>

        <form onSubmit={getSpecialization} className={styles.specialization__get}>
          <input type="text" id="specilaizationName" placeholder='Name of the Specialization' className={styles.inputs}/>
          <button className={styles.run} type='submit' onSubmit={getSpecialization}>
            <VscRunAll className={styles.run__logo}/>
          </button>
        </form>

        {
          requestedSpecialization.specName ? (
            <div className={styles.result}>
              <p className={styles.label}>Name of the Specialization:</p>
              <h2 className={styles.data}>{requestedSpecialization.specName}</h2>
              <p className={styles.label}>The availability of the specialization:</p>
              <h2 className={styles.data}>{requestedSpecialization.available ? 'Available' : 'Unavailable'}</h2>
              <p className={styles.label}>Duration:</p>
              <h2 className={styles.data}>{parseInt(requestedSpecialization.duration, 16)}</h2>
          </div>
          ) : (
            <>
            </>
          )
        }
      </div>

      {/* Add a new Specialization */}
      <div className={styles.specialization__panels}>
        <div className={styles.panel__headers}>
          <h1>Add a new Specialization</h1>
        </div>
        <form action="" className={styles.specialization__add} onSubmit={startVerification}>
          <input type="text" id="specializationName" placeholder='Name of the Specialization' className={styles.inputs}/>
          <input type="text" id="facultySymbol" placeholder='Symbol of the faculty' className={styles.inputs}/>
          <input type="number" id="specializationDuration" placeholder='Duration of the specialization' className={styles.inputs}/>
          <button className={styles.verify} type='submit' onSubmit={startVerification}>
            <VscChecklist className={styles.run__logo}/>
          </button>
        </form>
        {
          isVereficationStarted ? (
            <form className={styles.specialization__add} onSubmit={verify}>
              <input type="text" id="verifyName" placeholder='Name of the Specialization' className={styles.inputs}/>
              <input type="text" id="verifySymbol" placeholder='Symbol of the faculty' className={styles.inputs}/>
              <input type="number" id="verifyDuration" placeholder='Duration of the specialization' className={styles.inputs}/>

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

      {/* Enable/Disable Specialization */}
      <div className={styles.specialization__panels}>
        <div className={styles.panel__headers}>
          <h1>Enable/Disable Specialization</h1>
        </div>
        <form onSubmit={getSpecialization} name='getFaculty' className={styles.specialization__enable}>
          <input type="text" id="specializationName1" placeholder='Name of the specialization' className={styles.inputs}/>
          <button className={styles.run} type='submit' onSubmit={getSpecialization}>
            <VscRunAll className={styles.run__logo}/>
          </button>
        </form>
        {
          requestedSpecialization.specName ? (
            <div className={styles.result}>
              <p className={styles.label}>Name of the Specialization:</p>
              <h2 className={styles.data}>{requestedSpecialization.specName}</h2>
              <h2 className={styles.label}>{requestedSpecialization.available ? (
                <>
                  <p className='text-red-500'>This specialization is currently available. Do you want to disable it from the next year?</p>
                  <button className={styles.disable} onClick={requestDisableSpecialization}>Disable</button>
                </>
                ) : (
                <>
                  <p className='text-green-500'>This specialization is currently disabled. Do you want to enable it from the next year?</p>
                  <button className={styles.enable} onClick={requestEnableSpecialization}>Enable</button>                  
                </>
              )}</h2>
          </div>
          ) : (
            <>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Specialization