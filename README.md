# next-connectkit-starter

step to create form zero a next app connected to web3 

## step1 install a nextjs typescript app

    yarn create next-app

then: 
* write the name of the app, in example "frontend"
* select yes typescript
* select yes eslint

## step2 install the dependencies

    cd frontend

    yarn add @rainbow-me/rainbowkit wagmi ethers

for reference:

[ethers docs](https://docs.ethers.io/v5/)
[wagmi docs](https://wagmi.sh/)
[rainbowkit docs](https://www.rainbowkit.com/docs)



## step3 : setup


go to _app.tsx

copy as follow

```typescript

import type { AppProps } from 'next/app'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
//import { alchemyProvider } from 'wagmi/providers/alchemy';
//import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';



const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.goerli, chain.polygonMumbai],
  [
    //   alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    //   infuraProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      return <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>

}

```

for reference check the installation  guide [here](https://www.rainbowkit.com/docs/installation) 




## step4 : put connect wallet

```typescript

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useProvider } from 'wagmi'
import { useSigner } from 'wagmi'

export default function Home() {
  return (<>
 <ConnectButton></ConnectButton>
  </>
  
  )
}

```
for reference [connect button install guide](https://www.rainbowkit.com/docs/connect-button)

## step5  get provider and signer with wagmi

[how to get to provider](https://wagmi.sh/react/hooks/useProvider)

[ho to get signer](https://wagmi.sh/react/hooks/useSigner)


## step 6 add a ui library 

for example chakra ui 
    
    cd frontend 
    yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion


add chakra as provider in _app.tsx

```typescript

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <TheRestOfYourApplication />
    </ChakraProvider>
  )
}

```

then check componets [here](https://chakra-ui.com/docs/components) and add it to forntend as components