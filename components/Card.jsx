import { useState, useEffect } from 'react';

import { useWeb3Provider } from '../context/Web3Context';
import { getMyInfo } from '../utils/public_methods';

import { GoPerson } from 'react-icons/go';

const styles = {
    card: 'h-[100%] w-[100%] p-[3%] flex flex-row items-center font-bold border card',
    content: 'h-full w-[95%] m-[3%] flex flex-col z-20',
    address: 'h-[5%] w-[5%] flex items-center justify-center text-[70%] -rotate-90 z-10',
    header: 'h-[8%] w-full flex flex-row items-center justify-between',
    title: 'text-[180%]',
    design: 'h-[80%] w-[60%] design',
    inner__content: 'h-[80%] w-full py-[4%] px-[5%] flex flex-row',
    image: 'h-full w-[32%] flex items-center justify-center text-white text-[1300%]',
    data: 'h-full w-[68%] px-[8%] py-[4%]',
    label: 'font-semibold text-[80%] text-gray-800',
    info: 'font-bold text-[80%]',
    university: 'flex items-center justify-center font-bold text-[120%]'
}

const Card = () => {
  const [color, setColor] = useState('text-white/100');
  const [borderColor, setBorderColor] = useState('border-white/100');
  const [backgroundColor, setBackgroundColor] = useState('bg-gradient-to-r from-white/100');
  const { isUserLoggedIn, studentInfo, setStudentInfo } = useWeb3Provider();

  useEffect( () => {
    if(isUserLoggedIn){
      getMyInfo(setStudentInfo);
      console.log(studentInfo);
      if(studentInfo.finished==true){
        setColor('text-blue-700/100');
        setBorderColor('border-blue-700/100');
        setBackgroundColor('border-blue-700/100');
      } else if(studentInfo.suspended==true) {
        setColor('text-red-700/100');
        setBorderColor('border-red-700/100');
        setBackgroundColor('border-red-700/100');
      } else if(studentInfo.started != 0 && JSON.stringify(studentInfo)!='{}'){
        setColor('text-green-700/100');
        setBorderColor('border-green-700/100');
        setBackgroundColor('bg-gradient-to-r from-green-700/100');
      }
    } else {
      setStudentInfo({});
      setColor('text-white/100');
      setBorderColor('border-white/100');
      setBackgroundColor('bg-gradient-to-r from-white/100');
    }
  }, [isUserLoggedIn, studentInfo])

  return (
    <div className={styles.card + ' ' + borderColor}>
        <div className='background'/>

        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title  + ' ' + color}>student card</h1>
            <div className={styles.design  + ' ' + backgroundColor}></div>
          </div>

          <div className={styles.inner__content}>
            <div className={styles.image}>
              <GoPerson />
            </div>
            <div className={styles.data}>
              <h2 className={styles.label}>Name</h2>
              <p className={styles.info + ' ' + color}>{!studentInfo.studentName ? 'Firstname Lastname' : studentInfo.studentName}</p>
              <h2 className={styles.label}>CNP</h2>
              <p className={styles.info + ' ' + color}>{!studentInfo.studentCNP ? 'Your CNP' : studentInfo.studentCNP}</p>
              <h2 className={styles.label}>Faculty</h2>
              <p className={styles.info + ' ' + color}>{!studentInfo.faculty ? 'Your Faculty' : studentInfo.faculty}</p>
              <h2 className={styles.label}>Specialization</h2>
              <p className={styles.info + ' ' + color}>{!studentInfo.studentSpecializationName ? 'Your Specialization' : studentInfo.studentSpecializationName}</p>
            </div>
          </div>

          <div className={styles.university  + ' ' + color}>
            <h2>University of Babeș Bolyai</h2>
          </div>  
        </div>

        <div className={styles.address + ' ' + color}>
          <p>{!studentInfo.address ? '0x0000000000000000000000000000000000000000' : studentInfo.address}</p>
        </div>
      </div>
  )
}

export default Card