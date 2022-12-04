import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const TARGET_BLOCK_NUMBER = 7994331; 

async function main() {
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
    const signer = wallet.connect(infuraProvider);
    const proposals = ['Chocolate','Vanilla','Strawberry','Lime'];

    const ballotContractFactory = new TokenizedBallot__factory(signer);
    const ballotContract = await ballotContractFactory.deploy(proposals.map((prop) => ethers.utils.formatBytes32String(prop)),
        process.env.TOKEN_CONTRACT_ADDRESS ?? "",
        TARGET_BLOCK_NUMBER);
    await ballotContract.deployed();
    console.log(`The tokenizedBallot contract has been deployed at address ${ballotContract.address}`)
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})
