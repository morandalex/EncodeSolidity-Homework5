import { ethers } from "hardhat";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";

let ballotContract: TokenizedBallot;
let proposals: string[] = [];
dotenv.config()

async function main() {
    //pass as an argument the amount you want to use to vote
    const args = process.argv.slice(2);
    if (args.length != 2) {
        throw new Error("Usage: yarn run ts-node --files scripts/vote.ts <indexOfProposal> <AmountToUse>");
    }

    //const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    // const provider = ethers.getDefaultProvider("goerli");
    
    // Use custom provider like Infura or Alchemy
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
    const signer = wallet.connect(infuraProvider);

    const ballotFactory = new TokenizedBallot__factory(signer);
    //Import existing contract already deployed previously
    ballotContract = ballotFactory.attach(process.env.BALLOT_CONTRACT_ADDRESS ?? "");
    console.log(`Contract address ${ballotContract.address}`)

    //casting a vot to proposal number 4 (index 3) = Chocolate
    const indexOfProposal = args[0];
    const amount = ethers.utils.parseEther(args[1]);
    const voteTx = await ballotContract.vote(indexOfProposal, amount, { gasLimit: 100000 })
    await voteTx.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});