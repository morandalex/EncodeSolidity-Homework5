import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
    const signer = wallet.connect(infuraProvider);

    const tokenContractFactory = new MyToken__factory(signer);
    const tokenContract = await tokenContractFactory.deploy()
    await tokenContract.deployed();

    console.log(`The token contract has been deployed at address ${tokenContract.address}.`)
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})
