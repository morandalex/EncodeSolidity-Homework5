//before starting this script you have to start hardhat node with `yarn hardhat node`

const fs = require('fs');
import { ethers } from "hardhat";
import { Lottery__factory, Lottery  } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const PURCHASE_RATIO = 1;
const BET_PRICE = 1;
const BET_FEE = 0.1;

async function main() {
    // To connect to a custom URL:
    let url = "http://127.0.0.1:8545/";
    let customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    const signer = new ethers.Wallet(process.env.HARDHAT_ACCOUNT_0 ?? "").connect(
        customHttpProvider
    );

    const lotteryContractFactory = new Lottery__factory(signer);
    const lotteryContract = await lotteryContractFactory.deploy(
    PURCHASE_RATIO,
    ethers.utils.parseEther(BET_PRICE.toFixed(18)),
    ethers.utils.parseEther(BET_FEE.toFixed(18))
    );
    await lotteryContract.deployed();

    const paymentTokenAddress = await lotteryContract.paymentToken();
    const paymentTokenFactory = await ethers.getContractFactory("LotteryToken");
    const paymentToken = paymentTokenFactory.attach(paymentTokenAddress);

    console.log(
    `The lottery contract has been deployed at address ${lotteryContract.address}`
    );
    console.log(
    `The payment token contract has been deployed at address ${paymentToken.address}`
    );

    fs.writeFileSync('deploy_LOCAL.txt', `NEXT_PUBLIC_HARDHAT_LOTTERY_CONTRACT="${lotteryContract.address}"`  + '\n' + `NEXT_PUBLIC_HARDHAT_PAYMENT_TOKEN_CONTRACT="${paymentToken.address}"`  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
