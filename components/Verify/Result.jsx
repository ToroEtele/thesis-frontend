import { useEffect, useState } from 'react';

import { GoPerson } from 'react-icons/go'
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';


const styles = {
    result: 'w-full h-full py-[4%] flex flex-row rounded-xl bg-white/20 backdrop-blur	',
    image: 'w-[30%] h-full text-[1400%] flex items-center justify-center image text-white',
    data: 'px-[10%] py-[1%] text-white',
    label: 'font-semibold text-[80%] text-white/60',
    info: 'font-bold text-[80%] mb-2',
}

const Result = ({user}) => {
  const [color, setColor] = useState('text-white/100');

  useEffect(() => {
    if(user.suspended == true) {
      setColor('text-red-700/100');
    } else if(user.finished == true) {
      setColor('text-blue-700/100');
    } else if(user.finished == false){
      setColor('text-green-700/100');
    }
  }, [user])

  return (
    <div className={styles.result}>
        <div className={styles.image}>
            <GoPerson />
        </div>
        <div className={styles.data}>
              <h2 className={styles.label}>Name:</h2>
              <p className={styles.info + ' ' + color}>{!user.studentName ? 'Firstname Lastname' : user.studentName}</p>
              <h2 className={styles.label}>CNP:</h2>
              <p className={styles.info + ' ' + color}>{!user.studentCNP ? 'Student CNP' : user.studentCNP}</p>
              <h2 className={styles.label}>Address:</h2>
              <p className={styles.info + ' ' + color}>{!user.address ? '0x0000000000000000000000000000000000000000' : user.address}</p>
              <h2 className={styles.label}>Faculty:</h2>
              <p className={styles.info + ' ' + color}>{!user.faculty ? 'Faculty from University of Babes Bolyai' : user.faculty}</p>
              <h2 className={styles.label}>Specialization:</h2>
              <p className={styles.info + ' ' + color}>{!user.studentSpecializationName ? 'Student Specialization' : user.studentSpecializationName}</p>
              <h2 className={styles.label}>Status:</h2>
              <p className={styles.info + ' flex flex-row items-center gap-2 ' + color}> <RiCheckboxBlankCircleFill/> On going</p>
              <h2 className={styles.label}>Starting date:</h2>
              <p className={styles.info + ' ' + color}>YYYY / MM / DD</p>
              

            </div>
    </div>
  )
}

export default Result