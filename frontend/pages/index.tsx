import { Box, Heading, Button } from "@chakra-ui/react";

import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";
import { useProvider, useSigner } from "wagmi";

import { Example, Example__factory } from "../../hardhat/typechain-types";

import { useState } from "react";

import ethers from "ethers";

export default function Home() {
  const provider = useProvider();
  const signer = useSigner();
  const [number, setNumber] = useState(1);

  async function test() {
    alert("hello world");
    console.log("hello world");
    setNumber(number + 1);
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
        <Heading>
          Encode solidity frontend for lottery - project week 5 - group 4
        </Heading>
      </Box>
      <Box p="2">
        <ConnectKitButton></ConnectKitButton>
      </Box>
      <Box p="2">
        <Button onClick={test}></Button> {number}
      </Box>
    </Box>
  );
}
function useState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}
