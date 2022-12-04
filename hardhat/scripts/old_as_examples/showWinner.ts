import { ethers } from "ethers";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";

dotenv.config();
let ballotContract: TokenizedBallot;

async function main() {
  // Using wallet specified in .env
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  // Etherscan provider specified in .env
  const provider = new ethers.providers.EtherscanProvider(
    "goerli",
    process.env.ETHERSCAN_API_KEY
  );
  const signer = wallet.connect(provider);
  const ballotFactory = new TokenizedBallot__factory(signer);
  // Connecting to an existing contract specified in .env
  ballotContract = ballotFactory.attach(process.env.BALLOT_CONTRACT_ADDRESS ?? "");
  // Gets the winner proposal name
  const winnerName = await ballotContract.winnerName();
  // Gets the winner proposal number
  const proposalNumberBN = await ballotContract.winningProposal();
  const proposalNumber = proposalNumberBN.toNumber();
  console.log(
    `The winner proposal is: ${ethers.utils.toUtf8String(
      winnerName
    )} (Proposal ${proposalNumber})`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
