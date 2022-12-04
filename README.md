# EncodeSolidity-Homework5

# encode bootcamp - Group 4


| USER                    | ADDRESS                                       |
|-------------------------|-----------------------------------------------|
| Alessandro Morandi      | 0xb91bc2a105c03667930b5ebe639e7914c5763bdb    |
| José Henrique K. Ambiel | 0x6dE6EAfDD0120279957fB3019b0eec1828D73cDa    |
| Marcello Rigotti        | 0x80d0430c7d1ed613ea30c02663cc9ce5bbc389a8    |
| Sobhan BAhrami          | 0x4d7c99e0d0672abc0e9bbd4f5f82a87f2b6956da    |
| Jeremy Bernard          | 0xc87a65ce2f3bb07c7a59ac0643a56e34a9d531a7    |


# Starting the local environment

## Blockchain node

In a new terminal:

    cd hardhat
    cp .env.sample .env
    yarn install
    yarn hardhat compile
    yarn hardhat node
    yarn hardhat run scripts/deployLocal.ts

Console output:
> The lottery contract has been deployed at address 0x5FbDB2315678afecb367f032d93F642f64180aa3.
> <br>
> The payment token contract has been deployed at address 0xa16E02E87b7454126E5E10d957A927A7F5B5d2be.


## React frontend

In a new terminal:

    cd frontend
    cp .env.local.sample .env.local
    cp -r ../hardhat/typechain-types .
    yarn install
    yarn dev
