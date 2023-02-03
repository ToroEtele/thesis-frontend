import ETHIcon from './ETHIcon';
import { connectWallet } from '../../utils/public_methods';
import { useWeb3Provider } from '../../context/Web3Context';

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";

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

  // const { connectAsync } = useConnect();
  // const { disconnectAsync } = useDisconnect();
  // const { isConnected } = useAccount();
  // const { signMessageAsync } = useSignMessage();
  // const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  // const handleAuth = async () => {
  //   if (isConnected) {
  //     await disconnectAsync();
  //   }

  //   const { account, chain } = await connectAsync({
  //     connector: new MetaMaskConnector(),
  //   });

  //   const { message } = await requestChallengeAsync({
  //     address: account,
  //     chainId: chain.id,
  //   });

  //   const signature = await signMessageAsync({ message });

  //   console.log(signature);

  //   setIsUserLoggedIn(true);

  //   // const { url } = await signIn("moralis-auth", {
  //   //   message,
  //   //   signature,
  //   //   redirect: false,
  //   //   callbackUrl: "/",
  //   // });
  //   // push(url);
  // };

  return (
    <div className={styles.account}>
      {!isUserLoggedIn ? (
        <>
          <button
            className={styles.account__connect}
            onClick={() => connectWallet(setCorrectNetwork, setIsUserLoggedIn, setCurrentAccount)}
          //onClick={handleAuth}
          >
            Connect
            <IoIosArrowForward className={styles.icon} />
          </button>
          <button className={styles.account__help}>Help <IoMdHelp className={styles.icon} /></button>
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