import type { AppProps } from 'next/app'
import { Navbar } from '../components'
import '../styles/globals.css'

import {Web3Provider} from '../Web3Context/Web3Context'
import { SessionProvider } from "next-auth/react";

//* RainbowKit Connect Feature
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

//* Moralis Connect feature
import { createClient, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, goerli } from 'wagmi/chains';
import { Chain } from 'wagmi'

export const localhost = {
  id: 1337,
  name: 'Ganache',
  network: 'ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
} as const satisfies Chain

const { provider, webSocketProvider, chains } = configureChains(
  [mainnet, goerli, localhost],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Decentralised Identification",
  chains,
});

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors
});
//* Moralis Connect feature


export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}> 
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Web3Provider>
          <RainbowKitProvider chains={chains}>
            <Navbar />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </Web3Provider>
     </SessionProvider>
    </WagmiConfig>
    )
}
