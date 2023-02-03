import type { AppProps } from 'next/app'
import { Navbar } from '../components'
import '../styles/globals.css'
import {Web3Provider} from '../context/Web3Context'

import { createClient, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet } from "wagmi/chains";
import { SessionProvider } from "next-auth/react";

// const { provider, webSocketProvider } = configureChains(
//   [mainnet],
//   [publicProvider()]
// );

// const client = createClient({
//   provider,
//   webSocketProvider,
//   autoConnect: true,
// });


export default function App({ Component, pageProps }: AppProps) {
  return (
    // <WagmiConfig client={client}>
    //   <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Web3Provider>
          <Navbar />
          <Component {...pageProps} />
        </Web3Provider>
    //   </SessionProvider>
    // </WagmiConfig>
    )
}
