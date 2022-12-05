const fs = require('fs');
import { ethers } from "hardhat";
import { Lottery__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const PURCHASE_RATIO = 1;
const BET_PRICE = 1;
const BET_FEE = 0.1;

async function main() {
  const infuraProvider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
  );
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY ?? "").connect(
    infuraProvider
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
  fs.writeFileSync('deploy_GOERLI.txt', `NEXT_PUBLIC_GOERLI_LOTTERY_CONTRACT="${lotteryContract.address}"`  + '\n' + `NEXT_PUBLIC_GOERLI_PAYMENT_TOKEN_CONTRACT="${paymentToken.address}"`  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
