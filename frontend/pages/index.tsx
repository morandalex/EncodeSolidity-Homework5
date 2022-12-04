//library import
import React, { useState } from 'react';
import {
  ConnectKitButton,
} from "connectkit";
import { useProvider, useSigner } from "wagmi";
import {  } from "../../hardhat/typechain-types";
//ui import
import { Box, Heading, Button, Text } from "@chakra-ui/react";
//custom components import
import Header from '../components/Header'
import ExampleComponent from '../components/ExampleComponent'
import ethers from "ethers";
export default function Home() {
  const provider = useProvider();
  const signer = useSigner();
  const [number, setNumber] = useState(1);
  async function add() {
    console.log("hello world");
    setNumber(number + 1);
  }
  async function subtract() {
    console.log("hello world");
    setNumber(number - 1);
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      p="5"
    >
      <Box p="2">
        <Header />
      </Box>
      <Box p="2">
        <ExampleComponent />
      </Box>
      <Box p="2">
        <ConnectKitButton />
      </Box>
    </Box>
  );
}