import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    //const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
    const signer = wallet.connect(infuraProvider);

    const tokenContractFactory = new MyToken__factory(signer);
    const tokenContract = tokenContractFactory.attach(process.env.TOKEN_CONTRACT_ADDRESS ?? "");
    console.log(`Attached to contract deployed at address ${tokenContract.address}`);

    const delegateTx = await tokenContract.delegate(wallet.address);
    await delegateTx.wait();

    const votePower = await tokenContract.getVotes(wallet.address);
    console.log(`The account ${wallet.address} has ${votePower} voting power units.`)
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})
