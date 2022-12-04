import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
import { Console } from "console";
dotenv.config();

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    //const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
    const signer = wallet.connect(infuraProvider);

    const tokenContractFactory = new MyToken__factory(signer);
    const tokenContract = tokenContractFactory.attach(process.env.TOKEN_CONTRACT_ADDRESS ?? "");
    console.log(`Attached to contract deployed at address ${tokenContract.address} \n`);

    let voterAddress;
    let balance;
    let votePower;
    //Alessandro Morandi
    voterAddress = "0xb91bc2a105c03667930b5ebe639e7914c5763bdb";
    balance = await tokenContract.balanceOf(voterAddress);
    console.log(`Balance of ${voterAddress} is ${balance}.`);
    votePower = await tokenContract.getVotes(voterAddress);
    console.log(`The account ${voterAddress} has ${votePower} voting power units.\n`)
    //José Henrique K. Ambiel
    voterAddress ="0x6dE6EAfDD0120279957fB3019b0eec1828D73cDa";
    balance = await tokenContract.balanceOf(voterAddress);
    console.log(`Balance of ${voterAddress} is ${balance}.`);
    votePower = await tokenContract.getVotes(voterAddress);
    console.log(`The account ${voterAddress} has ${votePower} voting power units.\n`)
    // Marcello Rigotti
    voterAddress = "0x80d0430c7d1ed613ea30c02663cc9ce5bbc389a8";
    balance = await tokenContract.balanceOf(voterAddress);
    console.log(`Balance of ${voterAddress} is ${balance}.`);
    votePower = await tokenContract.getVotes(voterAddress);
    console.log(`The account ${voterAddress} has ${votePower} voting power units.\n`)
    //Sobhan Bahrami
    voterAddress = "0x4d7c99e0d0672abc0e9bbd4f5f82a87f2b6956da";
    balance = await tokenContract.balanceOf(voterAddress);
    console.log(`Balance of ${voterAddress} is ${balance}.`);
    votePower = await tokenContract.getVotes(voterAddress);
    console.log(`The account ${voterAddress} has ${votePower} voting power units.\n`)
    //Jeremy Bernard
    voterAddress = "0xc87a65ce2f3bb07c7a59ac0643a56e34a9d531a7";
    balance = await tokenContract.balanceOf(voterAddress);
    console.log(`Balance of ${voterAddress} is ${balance}.`);
    votePower = await tokenContract.getVotes(voterAddress);
    console.log(`The account ${voterAddress} has ${votePower} voting power units.\n`)
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})
