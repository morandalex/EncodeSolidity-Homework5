//library import
import React, { useState } from 'react';
//ui import
import {  Button, Text } from "@chakra-ui/react";

//import hooks from wagmi to connect with functions
import { useAccount, useProvider, useSigner } from "wagmi";

//here we have types from hardhat compiles
import { Lottery__factory, LotteryToken__factory } from "../../hardhat/typechain-types";

export default function ListFunctions() {
    const { address, isConnecting, isDisconnected } = useAccount()
    const provider = useProvider();
    const signer = useSigner();
    const [str, setStr] = useState(' hello world');

    async function fun() {
        console.log('TO DO'+str)
    }
  
    if (!isDisconnected){
        return (
            <>
                <Button onClick={fun}>fun()</Button>
            </>
        );
    }
    else {
        return (<></>)
    }
}