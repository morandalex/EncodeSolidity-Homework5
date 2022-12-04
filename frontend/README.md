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

    yarn add connectkit wagmi@0.7.15 ethers

for reference:

[ethers docs](https://docs.ethers.io/v5/)
[wagmi docs](https://wagmi.sh/)
[connectkit](https://docs.family.co/connectkit)



## step3 : setup


see pages/_app.tsx

for setup with  wagmi : [here](https://wagmi.sh/react/getting-started)

for setup with  connectkit : [here](https://docs.family.co/connectkit/getting-started#getting-started-2-implementation)


## step4 : put connect wallet

see pages/index.tsx

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

then check components [here](https://chakra-ui.com/docs/components) and add it to forntend as components


[here](https://openchakra.app/) you can build chakra components with drag and drop