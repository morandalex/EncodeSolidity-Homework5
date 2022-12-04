//this file is the entry component for nextjs app

// import connect kit ready button
import {
  ConnectKitButton,
} from "connectkit";

//import wagmi hook to know if user is connected or not
import { useAccount } from "wagmi";

//chakraui ui import
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";

//custom components import
import Header from '../components/Header'
import PeopleTable from '../components/PeopleTable';
import ListFunctions from '../components/ListFunctions';

//custom util functions
import utils from '../src/utils'

//this is the main component named Home
export default function Home() {

  const { address, isConnecting, isDisconnected } = useAccount()

  const Loading = () =>{
    if (isConnecting){
      return <>Loading ...</>
    } else {
    return <></>
    }
  }
  const IfConnected = () => {
   if (!isDisconnected && !isConnecting){
   return (
     <>
       <Box p='2'>
         <Text>Connected  {utils.cutAddress(address  ?? '')} address</Text>
       </Box>
       <Box>
         <ListFunctions />
       </Box>
     </>
   )
   }
   else {
    return <></>
   }
  }

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={'50px 1fr 30px'}
      gridTemplateColumns={'150px 1fr'}
      h='200px'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
      p='5'
    >
      <GridItem border='1px' pl='2' area={'header'}>
        <Header />
      </GridItem >
      <GridItem border='1px' pl='2' area={'nav'}>
        Nav
      </GridItem>
      <GridItem border='1px' pl='2' area={'main'}>
        <Grid templateColumns='repeat(2, 1fr)' gap={4}>
          <GridItem w='100%'>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              p="5"
            >
              <PeopleTable />
            </Box>
          </GridItem>
          <GridItem w='100%'  >
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              p="5"
            >

              <ConnectKitButton />   {/* ConnectKitButton was made by connect kit , check the import above*/}

              <IfConnected />        {/* IfConnected component show or not the function if the user is connected. Check above */}
              <Loading/>
            </Box>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem border='1px' pl='2' area={'footer'}>
        <Text fontSize='xs'> EncodeSolidity Bootcamp - Project week 5 - Group 4 </Text>
      </GridItem>
    </Grid>
  );
}