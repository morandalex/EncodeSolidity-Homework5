import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {
  chain,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
const infuraId = process.env.ALCHEMY_ID;
const client = createClient(
  getDefaultClient({
    appName: "EncodeSolidity App",
    infuraId,
    chains: [chain.goerli, chain.hardhat],
  }),
);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <ConnectKitProvider theme="auto" mode="dark" /*options={{ initialChainId: chain.hardhat.id }}*/>
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}
