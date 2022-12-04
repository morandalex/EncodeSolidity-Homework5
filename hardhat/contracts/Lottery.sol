// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {LotteryToken} from  "./Token.sol";

contract Lottery is Ownable {
    
    LotteryToken public paymentToken;

    /// @notice Flag indicating if lottery is open for bets
    bool public betsOpen;


    /// @notice Timestamp of the lottery next closing date
    uint256 public betsClosingTime;

    /// @notice Amount of Tokens given per ETH paid
    uint256 public purchaseRatio;

    /// @notice 
    uint256 public betPrice;

    /// @notice 
    uint256 public betFee;

    uint256 public prizePool;
    uint256 public ownerPool;
    
    address [] _slots;

    /// @notice constructor
    // @param tokenName Name of the token
    // @param tokenSymbol Symbol of tetoken
    // @param _purchaseratio AMount of the token given per ETH paid
    constructor(uint256 _purchaseRatio) {
        purchaseRatio = _purchaseRatio;
        paymentToken = new LotteryToken(tokenName,tokenSymbol,);
    }

    /// @notice open the lottery for receiving betx
    function openBets(uint256 closingTime) external onlyOwner {
        require(
            closingTime > block.timestamp,
            "Lottery: Closing time must be in the future"
        );
        require(!betsOpen, "Lottery: bets are already open");
        betsClosingTime = closingTime;
        betsOpen = true;
    }

    function purchaseToken() external payable {
        paymentToken.mint(msg.sender,msg.value * purchaseratio);
    }




    function bet()public  whenBetsOpen {
        ownerPool += betFee;
        prizePool += betprice;
        // register the player 
        paymentToken.transferFrom(msg.sender,address(this),betPrice+betFee);
    }

    function betMany(uint256 times) public{
    require ( times >0); 
    while (times>0){
        bet();
        times--;
    }
    }


    funcion closeLottery() public {
        require(block.timestamp>=betsClosingTime,"To soon to close");
        require(betsOpen,"already closed")
        if(slots.lenght >0 ){
            uint256 winnerIndex = ?;
            address winner = _slots[winnerIndex];
            prize [winner] += prizepool;
        }
    }
    function getRandomNumber() {
        return     randomNumber = block.difficulty;
    }

    function prizeWithdraw(uint256 amount)public {
        require(amount <= ownerPool,"not enough fee)
    }

    func


}