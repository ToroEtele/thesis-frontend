import ETHIcon from './ETHIcon';
import { connectWallet } from '../../utils/public_methods';
import { useWeb3Provider } from '../../context/Web3Context';

import { IoIosArrowForward, IoMdHelp } from 'react-icons/io';

const styles = {
  account: 'flex mr-[7%]',
  account__connect: 'flex items-center mr-14 py-[2%] px-[8%] border border-white rounded-3xl border-2 font-semibold',
  account__help: 'flex items-center py-[2%] px-[8%] border border-white rounded-3xl border-2 font-semibold',
  account__disconnect: 'flex items-center mr-14 py-[2%] px-[4%] border border-white rounded-3xl border-2 font-semibold',
  account__address: 'flex items-center py-[2%] px-[4%] border border-white rounded-3xl border-2 font-semibold',
  icon: 'pt-1 pl-2 text-[150%]',
}

const Connect = () => {
  const { isUserLoggedIn, setCorrectNetwork, setIsUserLoggedIn, currentAccount, setCurrentAccount } = useWeb3Provider();


  return (
    <div className={styles.account}>
      {!isUserLoggedIn ? (
        <>
          <button 
            className={styles.account__connect}
            onClick={() => connectWallet(setCorrectNetwork, setIsUserLoggedIn,setCurrentAccount)}
          >
            Connect 
            <IoIosArrowForward className={styles.icon}/>
          </button>
          <button className={styles.account__help}>Help <IoMdHelp className={styles.icon}/></button>
        </>
      ) : (
        <>
          <button className={styles.account__disconnect}>Disconnect</button>
          <button className={styles.account__address}>
            {currentAccount}
            <ETHIcon />
          </button>
        </>
      )}
    </div>
  )
}

export default Connect