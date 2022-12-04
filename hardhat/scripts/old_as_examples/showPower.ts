import { ethers } from "hardhat";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";

let ballotContract: TokenizedBallot;
let proposals: string[] = [];
dotenv.config()

async function main() {
    const args = process.argv.slice(2);
    if (args.length != 1) {
        throw new Error("Usage: yarn run ts-node --files scripts/vote.ts <address>");
    }
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    
    // Use custom provider like Infura or Alchemy
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
    const signer = wallet.connect(infuraProvider);

    const ballotFactory = new TokenizedBallot__factory(signer);
    //Import existing contract already deployed previously
    ballotContract = ballotFactory.attach(process.env.BALLOT_CONTRACT_ADDRESS ?? "");
    console.log(`TokenizedBallot contract address ${ballotContract.address}`)

    const powerAvailable = await ballotContract.votePower(args[0]);
    console.log(`address ${args[0]} has ${powerAvailable} voting power left`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
