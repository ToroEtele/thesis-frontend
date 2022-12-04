import {Faculty} from '../components'

const styles = {
  adminpanel: 'h-screen w-screen px-[5%] py-[10%] flex flex-row',
  adminpanel__sidebar: 'h-[100%] w-[20%] flex flex-col justify-center gap-[1%] border-r-[1px] border-solid border-gray-400',
  sidebar__element: 'font-bold text-[200%]',
  adminpanel__content: 'h-[100%] w-[100%]'
}

const Administrator = () => {
  return (
    <div className={styles.adminpanel}>
      <div className={styles.adminpanel__sidebar}>
        <h1 className={styles.sidebar__element}>Faculty</h1>
        <h1 className={styles.sidebar__element}>Specialization</h1>
        <h1 className={styles.sidebar__element}>Student</h1>
      </div>
      <div className={styles.adminpanel__content}>
        <Faculty />
      </div>
    </div>
  )
}

export default Administrator