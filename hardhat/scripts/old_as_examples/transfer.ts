import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const args = process.argv.slice(2);
    if (args.length != 2) {
        throw new Error("Usage: yarn run ts-node --files scripts/transfer.ts <adress> <amount>");
    }

    const address = args[0];
    if (!ethers.utils.isAddress(address)) {
        throw new Error(`First argument ${address} is not a valid Ethereum address`);
    }

    const amount = ethers.utils.parseEther(args[1]);

    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
    const signer = wallet.connect(infuraProvider);

    const tokenContractFactory = new MyToken__factory(signer);
    const tokenContract = tokenContractFactory.attach(process.env.TOKEN_CONTRACT_ADDRESS ?? "");
    console.log(`Attached to contract deployed at address ${tokenContract.address}`);

    const transferTx = await tokenContract.transfer(address, amount);
    await transferTx.wait();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})
