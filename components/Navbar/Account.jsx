import { useState } from "react"
import { IoIosArrowForward, IoMdHelp } from 'react-icons/io'

const styles = {
  account: 'flex mr-[10%]',
  account__connect: 'flex items-center mr-14 py-[2%] px-[8%] border border-white rounded-3xl border-2 font-semibold',
  account__help: 'flex items-center py-[2%] px-[8%] border border-white rounded-3xl border-2 font-semibold',
  account__disconnect: '',
  account__address: '',
  icon: 'pt-1 pl-2 text-[150%]',
}

const Connect = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className={styles.account}>
      {!loggedIn ? (
        <>
          <button className={styles.account__connect}>Connect <IoIosArrowForward className={styles.icon}/></button>
          <button className={styles.account__help}>Help <IoMdHelp className={styles.icon}/></button>
        </>
      ) : (
        <>
          <button>Disconnect</button>
          <button>0xf12G..4h5K</button>
        </>
      )}
    </div>
  )
}

export default Connect