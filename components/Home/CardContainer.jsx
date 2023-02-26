import Card from './Card';

import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

const styles = {
  conteiner: 'z-0 h-[100%] w-[50%] py-[8%] pl-[5%] ',
  status: 'h-[15%] w-[100%] flex flex-row items-center justify-center',
  element: 'flex flex-row items-center pr-[5%] font-semibold gap-2',
}

const CardContainer = () => {
  return (
    <div className={styles.conteiner}>
      <Card/>
      <div className={styles.status}>
        <div className={styles.element + ' text-green-700'}>
          <RiCheckboxBlankCircleFill />
          Ongoing
        </div>
        <div className={styles.element + ' text-red-700'}>
          <RiCheckboxBlankCircleFill />
          Suspended
        </div>
        <div className={styles.element + ' text-blue-700'}>
          <RiCheckboxBlankCircleFill />
          Finished
        </div>
      </div>
    </div>
  )
}

export default CardContainer