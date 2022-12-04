//library import
import React, { useEffect, useState } from 'react';
//ui import
import { Box, Button, Text, Link } from "@chakra-ui/react";

//import hooks from wagmi to connect with functions
import { useAccount, useNetwork, useProvider, useSigner } from "wagmi";

//import custom utils
import utils from '../src/utils'

//import ethers
import ethers, { Signer } from 'ethers'

//here we have types from hardhat compiles
import { Lottery__factory, LotteryToken__factory } from "../typechain-types";


export default function ListFunctions() {

    //contract config 
    const PURCHASE_RATIO = 1;
    const BET_PRICE = 1;
    const BET_FEE = 0.1;
    const DURATION = 60 * 60 * 24;






    const { address, isConnecting, isDisconnected } = useAccount()
    const { chain, chains } = useNetwork()
    const provider = useProvider();
    const { data: signer, isSuccess: signerLoaded } = useSigner();
    const [str, setStr] = useState(' hello world');
    const [lotteryContractAddress, setLotteryContractAddress] = useState('')
    const [lotteryTokenContractAddress, setLotteryTokenContractAddress] = useState('')
    const [txList, setTxList] = useState([{ chainId: 0, tx: '' }])


    //useEffect is a react hook that normally is used to init tha app. Here we use useEffect to reinitialize the contract every time the chain changes
    useEffect(() => {
        if (chain) {
            if (chain.id == 31337) {
                setLotteryContractAddress(process.env.NEXT_PUBLIC_HARDHAT_LOTTERY_CONTRACT ?? '')
                setLotteryTokenContractAddress(process.env.NEXT_PUBLIC_HARDHAT_PAYMENT_TOKEN_CONTRACT ?? '')
            } else
                if (chain.id == 5) {
                    setLotteryContractAddress(process.env.NEXT_PUBLIC_GOERLI_LOTTERY_CONTRACT ?? '')
                    setLotteryTokenContractAddress(process.env.NEXT_PUBLIC_GOERLI_PAYMENT_TOKEN_CONTRACT ?? '')
                } else {
                    setLotteryContractAddress('')
                    setLotteryTokenContractAddress('')
                }
        }

    }, [chain])  //if we put a variable inside this array useEffect will recompute itself


    async function bet() {
        if (signerLoaded && signer && lotteryContractAddress != '' && lotteryTokenContractAddress != '') {

            const lotteryContractFactory = new Lottery__factory(signer);

            const lotteryContract = lotteryContractFactory.attach(lotteryContractAddress ?? "");

            const currentBlock = await provider.getBlock('latest');

            try {
                const openBetsTx = await lotteryContract.openBets(currentBlock.timestamp + Number(DURATION));
                const receipt = await openBetsTx.wait();
                console.log(`Bets opened (${receipt.transactionHash})`);

                setTxList(
                    oldTxList => [
                        ...oldTxList,
                        {
                            chainId: chain?.id ?? 0,
                            tx: receipt.transactionHash
                        }
                    ]);



            } catch (e: any) {
                alert(e?.reason)
            }

        } else {
            alert('error')
        }
    }

    if (!isDisconnected && !isConnecting) {
        return (
            <>
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    p="5"
                >
                    <Text>Chain  : {chain && chain.name}</Text>
                    <Text> Lottery Contract : {utils.cutAddress(lotteryContractAddress)}</Text>
                    <Text>Lottery token Contract : {utils.cutAddress(lotteryTokenContractAddress)}</Text>
                    <Button onClick={bet}>bet()</Button>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    p="5"
                >
                    {
                        txList.map((item, i) => {
                            if (chain?.id == 31337 && item.tx != '' && item.chainId == 31337)
                                return (
                                    <>

                                        <Text>{utils.cutAddress(item.tx)}</Text>
                                    </>
                                )
                            else if (chain?.id == 5 && item.tx != '' && item.chainId == 5)
                                return (
                                    <>

                                        <Link href={"https://goerli.etherscan.io/tx/" + item.tx} isExternal ><Text>{utils.cutAddress(item.tx)}</Text> </Link>
                                    </>
                                )

                        })
                    }
                </Box>
            </>
        );
    }
    else {
        return (<></>)
    }
}