import { useEffect } from "react";

import { signIn, useSession, signOut } from "next-auth/react";
//import { useRouter } from "next/router";

import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { useAccount, useSignMessage, useNetwork } from "wagmi";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const styles = {
  connect__container: "flex flex-row",
  connect__signout: "ml-4 text-black bg-white px-4 rounded-xl font-bold",
};

const Connect = () => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  useEffect(() => {
    const handleAuth = async () => {
      const { message } = await requestChallengeAsync({
        address: address,
        chainId: chain.id,
      });

      const signature = await signMessageAsync({ message });

      await signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/",
      });
      console.log('Authentication finished.');
    };

    if (status === "unauthenticated" && isConnected) {
      console.log('Authentication called because: status='+status+', isConnected='+isConnected);
      handleAuth();
    }
  }, [status, isConnected]);

  return (
    <div className={styles.connect__container}>
      <ConnectButton />
    </div>
  );
};

export default Connect;
