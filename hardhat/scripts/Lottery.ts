import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Lottery, LotteryToken, LotteryToken__factory, Lottery__factory } from "../typechain-types";
import * as readline from "readline";
import { BigNumber } from "ethers";

let contract: Lottery;
let token: LotteryToken;
let accounts: SignerWithAddress[];

const TOKEN_RATIO = 1;
const BET_PRICE = 1;
const BET_FEE = 0.2;

async function main() {
  await initAccounts();
  await initContracts();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  mainMenu(rl);
}

async function initAccounts() {
  accounts = await ethers.getSigners();
}
  
async function initContracts() {
  const lotteryContractFactory = new Lottery__factory(accounts[0]);
  contract = await lotteryContractFactory.deploy(
    "LotteryToken",
    "LT0",
    TOKEN_RATIO,
    ethers.utils.parseEther(BET_PRICE.toString()),
    ethers.utils.parseEther(BET_FEE.toString())
    // ethers.utils.parseEther(BET_PRICE.toFixed(18)),
    // ethers.utils.parseEther(BET_FEE.toFixed(18))
  );
  await contract.deployed();
  const lotteryTokenContractFactory = new LotteryToken__factory();
  const paymentTokenAddress = await contract.paymentToken();
  token = lotteryTokenContractFactory
    .attach(paymentTokenAddress)
    .connect(accounts[0]);
}

async function mainMenu(rl: readline.Interface) {
  menuOptions(rl);
}

function menuOptions(rl: readline.Interface) {
  rl.question(
    "\nSelect operation: \n Options: \n [0]: Exit \n [1]: Check state \n [2]: Open bets \n [3]: Top up account tokens \n [4]: Bet with account \n [5]: Close bets \n [6]: Check player prize \n [7]: Withdraw \n [8]: Burn tokens \n",
    async (answer: string) => {
      console.log(`Selected: ${answer}\n`);
      const option = Number(answer);
      switch (option) {
        case 0:
          rl.close();
          return;
        case 1:
          await checkState();
          mainMenu(rl);
          break;
        case 2:
          rl.question("Input duration (in seconds)\n", async (duration) => {
            try {
              await openBets(duration);
            } catch (error) {
              console.log("error\n");
              console.log({ error });
            }
            mainMenu(rl);
          });
          break;
        case 3:
          rl.question("What account (index) to use?\n", async (index) => {
            await displayBalance(index);
            rl.question("Buy how many tokens?\n", async (amount) => {
              try {
                await buyTokens(index, amount);
                await displayBalance(index);
                await displayTokenBalance(index);
              } catch (error) {
                console.log("error\n");
                console.log({ error });
              }
              mainMenu(rl);
            });
          });
          break;
        case 4:
          rl.question("What account (index) to use?\n", async (index) => {
            await displayTokenBalance(index);
            rl.question("Bet how many times?\n", async (amount) => {
              try {
                await bet(index, amount);
                await displayTokenBalance(index);
              } catch (error) {
                console.log("error\n");
                console.log({ error });
              }
              mainMenu(rl);
            });
          });
          break;
        case 5:
          try {
            await closeLottery();
          } catch (error) {
            console.log("error\n");
            console.log({ error });
          }
          mainMenu(rl);
          break;
        case 6:
          rl.question("What account (index) to use?\n", async (index) => {
            const prize = await displayPrize(index);
            if (Number(prize) > 0) {
              rl.question(
                "Do you want to claim your prize? [Y/N]\n",
                async (answer) => {
                  if (answer.toLowerCase() === "y") {
                    try {
                      await claimPrize(index, prize);
                    } catch (error) {
                      console.log("error\n");
                      console.log({ error });
                    }
                  }
                  mainMenu(rl);
                }
              );
            } else {
              mainMenu(rl);
            }
          });
          break;
        case 7:
          await displayTokenBalance("0");
          await displayOwnerPool();
          rl.question("Withdraw how many tokens?\n", async (amount) => {
            try {
              await withdrawTokens(amount);
            } catch (error) {
              console.log("error\n");
              console.log({ error });
            }
            mainMenu(rl);
          });
          break;
        case 8:
          rl.question("What account (index) to use?\n", async (index) => {
            await displayTokenBalance(index);
            rl.question("Burn how many tokens?\n", async (amount) => {
              try {
                await burnTokens(index, amount);
              } catch (error) {
                console.log("error\n");
                console.log({ error });
              }
              mainMenu(rl);
            });
          });
          break;
        default:
          throw new Error("Invalid option");
      }
    }
  );
}

async function checkState() {
  const state = await contract.betsOpen();
  console.log(`The lottery is ${state ? "opened" : "closed"}`);
  if (!state) return;
  const currentBlock = await ethers.provider.getBlock('latest');
  const currentBlockDate = new Date(currentBlock.timestamp * 1000);
  const closingTime = await contract.betsClosingTime();
  const closingTimeDate = new Date(closingTime.toNumber() * 1000);
  const currentDate = new Date();
  const remainingTime =  closingTimeDate.getTime() - currentDate.getTime();
  console.log(`The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}.`);
  console.log(`lottery should close at ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}.`);
  console.log(`Current Date ${currentDate.toLocaleDateString()} : ${currentDate.toLocaleTimeString()}`)
  if (remainingTime > 0) {
    console.log(`Lottery closes in ${remainingTime / 1000} seconds`);
  } else {
    console.log(`Current time is past the deadline, lottery can be closed to determine the winner`);
  }
}

async function openBets(duration: string) {
  const currentBlock = await ethers.provider.getBlock('latest');
  const tx = await contract.openBets(currentBlock.timestamp + Number(duration));
  const receipt = await tx.wait();
  console.log(`Bets opened (${receipt.transactionHash})`);
}

async function displayBalance(index: string) {
  const balance = await accounts[Number(index)].getBalance();
  console.log(`The account ${index} has ${ethers.utils.formatEther(balance)} ETH`);
}

async function buyTokens(index: string, amount: string) {
  const tx = await contract.connect(accounts[Number(index)]).purchaseTokens({
    value: ethers.utils.parseEther(amount).div(TOKEN_RATIO)
  });
}

async function displayTokenBalance(index: string) {
    const balance = await token.balanceOf(accounts[Number(index)].address);
    console.log(`The account ${index} has ${ethers.utils.formatEther(balance)} LT0`);
  }

async function bet(index: string, amount: string) {
  const value = BigNumber.from(amount).mul(ethers.utils.parseEther((BET_FEE + BET_PRICE).toString()));
  const allowTx = await token.connect(accounts[Number(index)]).approve(contract.address, value);
  await allowTx.wait();
  const allowance = await token.allowance(accounts[Number(index)].address, contract.address);
  console.log(`Account ${accounts[Number(index)].address} allowed contract ${contract.address} for allowance ${ethers.utils.formatEther(allowance)} LT0`);
  const tx = await contract.connect(accounts[Number(index)]).betMany(amount, {gasLimit: 500000});
  const receipt = await tx.wait();
  const gasCost = receipt.gasUsed.mul(receipt.effectiveGasPrice);
  console.log(`${receipt.gasUsed} units of gas were consumed at ${receipt.effectiveGasPrice} gas price fro ${ethers.utils.formatEther(gasCost)}`);
}

async function closeLottery() {
  const tx = await contract.closeLottery();
  await tx.wait();
}

async function displayPrize(index: string) {
  const prize = await contract.prize(accounts[Number(index)].address);
  console.log(`The account ${index} has ${ethers.utils.formatEther(prize)} prize\n`);
  return ethers.utils.formatEther(prize);
}

async function claimPrize(index: string, amount: string) {
  const tx = await contract.connect(accounts[Number(index)]).prizeWithdraw(ethers.utils.parseEther(amount));
  await tx.wait();
  await displayTokenBalance(index);
}

async function displayOwnerPool() {
  const ownerPool = await contract.ownerPool();
  console.log(`Owner pool holds ${ethers.utils.formatEther(ownerPool)}`);
}

async function withdrawTokens(amount: string) {
  const tx = await contract.ownerWithdraw(ethers.utils.parseEther(amount));
  await tx.wait();
  await displayTokenBalance("0");
}

async function burnTokens(index: string, amount: string) {
  const allowTx = await token.connect(accounts[Number(index)]).approve(contract.address, ethers.utils.parseEther(amount));
  await allowTx.wait();
  const burnTx = await contract.connect(accounts[Number(index)]).returnTokens(ethers.utils.parseEther(amount));
  await burnTx.wait();
  await displayTokenBalance(index);
  await displayBalance(index);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
