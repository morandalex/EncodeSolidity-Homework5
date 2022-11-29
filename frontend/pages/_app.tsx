
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';

import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
//import {jsonRpcProvider} from 'wagmi/providers/jsonRpc'
//import { alchemyProvider } from 'wagmi/providers/alchemy';

import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { ConnectKitProvider} from 'connectkit'


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.goerli, chain.polygonMumbai],
  [
    //   alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY ?? '' }),
    publicProvider(),
  ]
);

const wagmiClient = createClient({
  autoConnect: false,
  provider,
  connectors: [
    new MetaMaskConnector(),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider theme="auto" mode="dark">
          <Component {...pageProps} />
          </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

