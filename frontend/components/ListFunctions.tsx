//library import
import React, { useEffect, useState } from 'react';
//ui import
import { Box, Button, Text, Link } from "@chakra-ui/react";

//import hooks from wagmi to connect with functions
import { useAccount, useNetwork, useProvider, useSigner } from "wagmi";

//import custom utils
import appSdk from '../src/utils'

//import ethers
import ethers, { BigNumber, utils } from 'ethers'

//here we have types from hardhat compiles
import { Lottery__factory, LotteryToken__factory } from "../typechain-types";


export default function ListFunctions() {

    //contract config 
    const PURCHASE_RATIO = 1;
    const BET_PRICE = 1;
    const BET_FEE = 0.1;
    const DURATION = 60 * 60 * 24;






    const { address: userAddress, isConnecting, isDisconnected } = useAccount()
    const { chain, chains } = useNetwork()
    const provider = useProvider();
    const { data: signer, isSuccess: signerLoaded } = useSigner();
    const [str, setStr] = useState(' hello world');
    const [lotteryContractAddress, setLotteryContractAddress] = useState('')
    const [lotteryTokenContractAddress, setLotteryTokenContractAddress] = useState('')
    const [txList, setTxList] = useState([{ chainId: 0, tx: '', funName: '' }])
    const [balance, setbalance] = useState<string>('')
    const [contractStatus, setContractStatus] = useState(false)
    const [contractCloseLottery, setContractCloseLottery] = useState(false)

    useEffect(()=>{

        console.log(txList)

    },[txList])
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

    useEffect(() => {
        checkStatus()

    }, [signer])
    function addToTxList(txhash: string, funName: string) {

        if (txhash && txhash != '') {
            setTxList(
                oldTxList => [
                    ...oldTxList,
                    {
                        chainId: chain?.id ?? 0,
                        tx: txhash,
                        funName: funName
                    }
                ]);
        }
    }
    async function openBets() {
        if (signerLoaded && signer && lotteryContractAddress != '' && lotteryTokenContractAddress != '') {

            const lotteryContractFactory = new Lottery__factory(signer);

            const lotteryContract = lotteryContractFactory.attach(lotteryContractAddress ?? "");

            const currentBlock = await provider.getBlock('latest');

            try {
                const openBetsTx = await lotteryContract.openBets(currentBlock.timestamp + Number(DURATION));
                const receipt = await openBetsTx.wait();
                console.log(`Bets opened (${receipt.transactionHash})`);

                addToTxList(receipt.transactionHash, 'openBets')



            } catch (e: any) {
                alert(e?.reason)
            }

        } else {
            alert('error')
        }
    }
    async function myBalance() {
        if (
            signerLoaded &&
            signer &&
            lotteryContractAddress != "" &&
            lotteryTokenContractAddress != ""
        ) {
            const tokenContractFactory = new LotteryToken__factory(signer);

            const tokenContract = tokenContractFactory.attach(
                lotteryTokenContractAddress ?? ""
            );
            const currentBlock = await provider.getBlock("latest");

            const addr = await signer.getAddress();
            const b = await tokenContract.balanceOf(addr);
            setbalance(b.toString())



            try {
                console.log(`Balance of ${b} tokens`);
            } catch (e: any) {
                alert(e?.reason);
            }
        } else {
            alert("error");
        }
    }
    async function buyTokens() {
        if (
            signerLoaded &&
            signer &&
            lotteryContractAddress != "" &&
            lotteryTokenContractAddress != ""
        ) {
            const lotteryContractFactory = new Lottery__factory(signer);
            const tokenContractFactory = new LotteryToken__factory(signer);

            const lotteryContract = lotteryContractFactory.attach(
                lotteryContractAddress ?? ""
            );
            const tokenContract = tokenContractFactory.attach(
                lotteryTokenContractAddress ?? ""
            );

            try {
                const purchaseTx = await lotteryContract.purchaseTokens({
                    value: utils.parseEther('0.01'),
                });
                let receipt = await purchaseTx.wait()
                addToTxList(receipt.transactionHash, 'purchaseTokens')


            } catch (e: any) {
                alert(e);
            }
        } else {
            alert("error");
        }
    }

    async function bet() {
        if (
            signerLoaded &&
            signer &&
            lotteryContractAddress != "" &&
            lotteryTokenContractAddress != ""
        ) {
            const lotteryContractFactory = new Lottery__factory(signer);
            const tokenContractFactory = new LotteryToken__factory(signer);

            const lotteryContract = lotteryContractFactory.attach(
                lotteryContractAddress ?? ""
            );
            const tokenContract = tokenContractFactory.attach(
                lotteryTokenContractAddress ?? ""
            );



            try {
                const amount = 10000000000

                const value = BigNumber.from(amount).mul(utils.parseEther((BET_FEE + BET_PRICE).toString()));
                const allowTx = await tokenContract.connect(signer).approve(lotteryContract.address, value);
                let receipt1 = await allowTx.wait();


                addToTxList(receipt1.transactionHash, 'approve')

                const tx = await lotteryContract.bet();
                const receipt2 = await tx.wait();
                const gasCost = receipt2.gasUsed.mul(receipt2.effectiveGasPrice);
                console.log(`${receipt2.gasUsed} units of gas were consumed at ${receipt2.effectiveGasPrice} gas price fro ${utils.formatEther(gasCost)}`);
                addToTxList(receipt2.transactionHash, 'bet')
            } catch (e: any) {
                alert(e);
            }
        } else {
            alert("error");
        }
    }

    async function checkStatus() {
        if (
            signerLoaded &&
            signer &&
            lotteryContractAddress != "" &&
            lotteryTokenContractAddress != ""
        ) {
            const lotteryContractFactory = new Lottery__factory(signer);
            const tokenContractFactory = new LotteryToken__factory(signer);

            const lotteryContract = lotteryContractFactory.attach(
                lotteryContractAddress ?? ""
            );
            const tokenContract = tokenContractFactory.attach(
                lotteryTokenContractAddress ?? ""
            );



            try {
                const state = await lotteryContract.betsOpen();
                setContractStatus(state)


            } catch (e: any) {
                alert(e);
            }
        } else {
            console.log("not yet connected to load the checkStatus function");
        }



    }

    async function closeLottery() {
        if (
            signerLoaded &&
            signer &&
            lotteryContractAddress != "" &&
            lotteryTokenContractAddress != ""
        ) {
            const lotteryContractFactory = new Lottery__factory(signer);
            const tokenContractFactory = new LotteryToken__factory(signer);

            const lotteryContract = lotteryContractFactory.attach(
                lotteryContractAddress ?? ""
            );
            const tokenContract = tokenContractFactory.attach(
                lotteryTokenContractAddress ?? ""
            );



            try {
                const tx = await lotteryContract.closeLottery();
                const receipt = await tx.wait()
                addToTxList(receipt.transactionHash, 'closeLottery')


            } catch (e: any) {
                alert(e);
            }
        } else {
            console.log("error");
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
                    <Text> Lottery Contract : {appSdk.cutAddress(lotteryContractAddress)}</Text>
                    <Text>Lottery token Contract : {appSdk.cutAddress(lotteryTokenContractAddress)}</Text>
                    <Text>Bets are open? : {contractStatus ? 'yes' : 'nope'}</Text>

                    {balance && balance != '' && <Text>This is my balance : {balance}</Text>}

                    <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                        p="5">
                        <Text>Owner functions</Text>
                        <Button m='2' onClick={openBets}>openBets()</Button>
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                        p="5"
                    >

                        <Text>Users functions</Text>
                        <Button m='2' onClick={buyTokens}>buyTokens()</Button>
                        <Button m='2' onClick={myBalance}>mybalance()</Button>
                        <Button m='2' onClick={bet}>bet()</Button>
                        <Button m='2' onClick={closeLottery}>closeLottery()</Button>
                    </Box>

                    <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    p="5"
                >
                    <Text>Transactions list</Text>
                    {
                        txList.map((item, i) => {
                            if (chain?.id == 31337 && item.tx != '' && item.chainId == 31337)
                                return (
                                  

                                        <Text key = {i}>{appSdk.cutAddress(item.tx)}</Text>
                                   
                                )
                            else if (chain?.id == 5 && item.tx != '')
                                return (
                                   

                                        <Link key={i} href={"https://goerli.etherscan.io/tx/" + item.tx} isExternal ><Text>  {item.funName} : {appSdk.cutAddress(item.tx)}</Text> </Link>
                                   
                                )

                        })
                    }
                </Box>
                </Box>
               
            </>
        );
    }
    else {
        return (<></>)
    }
}