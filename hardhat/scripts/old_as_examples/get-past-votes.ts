import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const args = process.argv.slice(2);
    if (args.length != 1) {
        throw new Error("Usage: yarn run ts-node --files scripts/get-past-votes.ts <block-number>");
    }

    const blockNumber = args[0];

    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
    const signer = wallet.connect(infuraProvider);

    const tokenContractFactory = new MyToken__factory(signer);
    const tokenContract = tokenContractFactory.attach(process.env.TOKEN_CONTRACT_ADDRESS ?? "");
    console.log(`Attached to contract deployed at address ${tokenContract.address}`);

    let voterAddress;
    let votePower;

    //Alessandro Morandi
    voterAddress = "0xb91bc2a105c03667930b5ebe639e7914c5763bdb";
    votePower = await tokenContract.getPastVotes(voterAddress, blockNumber);
    console.log(`Voting power of ${voterAddress} is ${votePower}`)
    //José Henrique K. Ambiel
    voterAddress ="0x6dE6EAfDD0120279957fB3019b0eec1828D73cDa";
    votePower = await tokenContract.getPastVotes(voterAddress, blockNumber);
    console.log(`Voting power of ${voterAddress} is ${votePower}`)
    // Marcello Rigotti
    voterAddress = "0x80d0430c7d1ed613ea30c02663cc9ce5bbc389a8";
    votePower = await tokenContract.getPastVotes(voterAddress, blockNumber);
    console.log(`Voting power of ${voterAddress} is ${votePower}`)
    //Sobhan Bahrami
    voterAddress = "0x4d7c99e0d0672abc0e9bbd4f5f82a87f2b6956da";
    votePower = await tokenContract.getPastVotes(voterAddress, blockNumber);
    console.log(`Voting power of ${voterAddress} is ${votePower}`)
    //Jeremy Bernard
    voterAddress = "0xc87a65ce2f3bb07c7a59ac0643a56e34a9d531a7";
    votePower = await tokenContract.getPastVotes(voterAddress, blockNumber);
    console.log(`Voting power of ${voterAddress} is ${votePower}`)
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})
