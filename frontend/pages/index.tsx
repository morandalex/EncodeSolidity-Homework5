
import {
  Box,
  Heading
} from '@chakra-ui/react'


import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import { useProvider,useSigner } from 'wagmi'


import { Example, Example__factory } from '../../hardhat/typechain-types'

export default function Home() {

  const provider = useProvider()
  const signer = useSigner()

  return (
    <Box 
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      p='5'
    >
      <Box  p='2'>
       <Heading>Encode solidity frontend for lottery - project week 5 - group 4</Heading> 
      </Box>
      <Box  p='2'>
         <ConnectKitButton></ConnectKitButton>
      </Box>
      <Box  p='2'>

      </Box>
    

     

    </Box>


  )
}
