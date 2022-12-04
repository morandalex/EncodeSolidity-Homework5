import { ethers } from "hardhat";
import { Lottery__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const PURCHASE_RATIO = 1;
const BET_PRICE = 1;
const BET_FEE = 0.1;
const DURATION = 60 * 60 * 24;

async function main() {
  const infuraProvider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
  );
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY ?? "").connect(
    infuraProvider
  );

  const lotteryContractFactory = new Lottery__factory(signer);
  const lotteryContract = lotteryContractFactory.attach(process.env.LOTTERY_CONTRACT_ADDRESS ?? "");

  const currentBlock = await ethers.provider.getBlock('latest');
  //we can change this and get user input, for now it is set to 1 day in seconds
  const openBetsTx = await lotteryContract.openBets(currentBlock.timestamp + Number(DURATION));
  const receipt = await openBetsTx.wait();
  console.log(`Bets opened (${receipt.transactionHash})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
