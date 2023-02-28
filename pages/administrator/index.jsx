import { useState } from 'react'

import { Specialization, Student} from '../../components'

const styles = {
  adminpanel: 'h-screen w-screen px-[5%] py-[10%] flex flex-row bg-[#21242c]',
  adminpanel__sidebar: 'h-[100%] w-[20%] flex flex-col justify-center gap-[1%] border-r-[1px] border-solid border-gray-400 z-10',
  sidebar__element: 'font-bold text-[200%] text-white cursor-pointer',
  adminpanel__content: 'h-[100%] w-[100%]'
}

const Administrator = () => {
  const [currentMenu, setCurrentMenu] = useState('Specialization')

  function handleClick(show) {
    setCurrentMenu(show);
    console.log(currentMenu);
  }

  return (
    <div className={styles.adminpanel}>
      <div className='app__effect z-0'/>
      <div className={styles.adminpanel__sidebar}>
        <h1 className={styles.sidebar__element} onClick={() => handleClick('Specialization')}>Specialization</h1>
        <h1 className={styles.sidebar__element} onClick={() => handleClick('Student')}>Student</h1>
      </div>
      <div className={styles.adminpanel__content}>
        {
          currentMenu=='Specialization' ? (<Specialization/>) :
          (<Student />)
        }
      </div>
    </div>
  )
}

export default Administrator