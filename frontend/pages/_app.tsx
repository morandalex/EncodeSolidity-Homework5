
// _app.tsx is a default file in nextjs and it is the entry points for index.tsx file 
// from _app.tsx we install the libraries. Here we are using wagmi connectkit and chakraui

//for references:
// connectkit : https://docs.family.co/connectkit/getting-started
// wagmi      : https://wagmi.sh/react/getting-started
// chakraui   : https://chakra-ui.com/getting-started



// this is the default  type that nextjs use to start the app 
import type { AppProps } from 'next/app'

//this is chakra provider taht has to be installed, if not chakraui does not work
import { ChakraProvider } from '@chakra-ui/react'

//here we are importing a provider and utilities from wagmi library that are necessary for connectkit  
import {
  chain,
  createClient,
  WagmiConfig,
} from 'wagmi';

//here we import a provider and a function from connectkit library. We use them for the  installation  
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const infuraId = process.env.ALCHEMY_ID;

// in order to start wagmi library we have to tell wagmi who is the provider and to what chain connect
const client = createClient(
  getDefaultClient({
    appName: "EncodeSolidity App",
    infuraId,
    chains: [chain.goerli, chain.hardhat],
  }),
);

//here you can see how we installed the libraries. check the reference if something is not clear.
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
