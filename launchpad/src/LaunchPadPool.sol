// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/interfaces/IERC20.sol";
import "@openzeppelin-contracts-5.0.2/utils/Context.sol";
import "@openzeppelin-contracts-5.0.2/access/Ownable.sol";

contract LaunchPadPool is Context, Ownable {
    bool public isStarted;
    address public dexAddress;
    address public launchPadContractAddress;
    address immutable launchTokenAddress;
    uint256 launchTokenAmount;
    address immutable poolTokenAddress;
    uint256 public poolTokenAmount;
    uint256 public totalAvgLock;
    mapping(address => uint256) avgUserLock;
    mapping(address => uint256) userBalance;
    uint256 public launchPadEndDate;

    constructor(address poolTokenAddress_, address launchTokenAddress_) Ownable(address(_msgSender())) {
        launchPadContractAddress = _msgSender();
        poolTokenAddress = poolTokenAddress_;
        launchTokenAddress = launchTokenAddress_;
    }

    function startPool(uint256 launchPadTime_) public onlyOwner {
        require(!isStarted, "LaunchPad is Already Started");
        isStarted = true;
        launchTokenAmount = IERC20(launchTokenAddress).balanceOf(address(this));
        launchPadEndDate = block.timestamp + launchPadTime_;
    }

    function getLockedAmount(address addr) public view returns (uint256) {
        return userBalance[addr];
    }

    function lockToken(uint256 amount) public {
        require(isStarted, "LaunchPad is not Started");
        if (launchPadEndDate < block.timestamp) {
            revert("launchPad is over you can not lock token");
        }

        address sender = _msgSender();
        if (userBalance[sender] != 0) {
            revert("tokens already unlocked");
        }
        userBalance[sender] = amount;
        IERC20(poolTokenAddress).transferFrom(sender, address(this), amount);
    }

    function unlockToken() public {
        require(isStarted, "LaunchPad is not Started");
        if (launchPadEndDate < block.timestamp) {
            revert("launchPad is over you can claim");
        }

        address sender = _msgSender();
        uint256 amount = userBalance[sender];
        if (amount == 0) {
            revert("tokens already unlocked");
        }
        userBalance[sender] = 0;
        IERC20 poolTokenContract = IERC20(poolTokenAddress);

        poolTokenContract.approve(sender, amount);
        poolTokenContract.transfer(sender, amount);
    }

    function claimToken() public {
        require(isStarted, "LaunchPad is not Started");
        if (launchPadEndDate > block.timestamp) {
            revert("launchPad is not over yet");
        }

        address sender = _msgSender();

        uint256 sendPoolTokenAmount = userBalance[sender];

        uint256 sendLaunchPadTokenAmount = userBalance[sender];

        IERC20 poolTokenContract = IERC20(poolTokenAddress);

        IERC20 launchTokenContract = IERC20(launchTokenAddress);

        poolTokenContract.approve(sender, sendPoolTokenAmount);

        launchTokenContract.approve(sender, sendLaunchPadTokenAmount);

        poolTokenContract.transfer(sender, sendPoolTokenAmount);

        launchTokenContract.transfer(sender, sendLaunchPadTokenAmount);

        createDex();
    }

    function createDex() private {
        if (dexAddress != address(0)) return;
        dexAddress = _msgSender();
    }
}
