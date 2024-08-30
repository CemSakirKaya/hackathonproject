// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin-contracts-5.0.2/utils/Context.sol";
import "@openzeppelin-contracts-5.0.2/access/Ownable.sol";

import "./LaunchPadPool.sol";

struct CreatePool {
    address poolTokenAddress;
    uint256 launchTokenAmount;
}

struct PoolData {
    address poolTokenAddress;
    uint256 launchTokenAmount;
    address poolAddress;
}

struct LaunchPadDataView {
    bool isStarted;
    PoolData[] pools;
    address launchTokenAddress;
    uint256 totalLaunchTokenAmount;
    address launchToken;
    uint256 launchpadTime;
}

contract LaunchPad is Context, Ownable {
    bool private isStarted;
    address launchToken;
    uint256 launchPadTime;
    address immutable launchTokenAddress;
    uint256 immutable totalLaunchTokenAmount;
    PoolData[] public pools;

    function getLaunchPadData() public view returns (LaunchPadDataView memory) {
        return
            LaunchPadDataView(isStarted, pools, launchTokenAddress, totalLaunchTokenAmount, launchToken, launchPadTime);
    }

    constructor(address token_, CreatePool[] memory pools_, uint256 launchPadTime_, address owner)
        Ownable(address(owner))
    {
        launchToken = token_;
        launchPadTime = launchPadTime_;
        for (uint256 i = 0; i < pools_.length; i++) {
            LaunchPadPool launchPadPool = new LaunchPadPool(pools_[i].poolTokenAddress, token_);
            pools.push((PoolData(address(launchPadPool), pools_[i].launchTokenAmount, address(launchPadPool))));
        }
    }

    function startPools() public onlyOwner {
        require(!isStarted, "LaunchPad is Already Started");
        isStarted = true;
        uint256 amountNeed;
        IERC20 launchTokenContract = IERC20(launchToken);
        for (uint256 i = 0; i < pools.length; i++) {
            amountNeed += pools[i].launchTokenAmount;
        }

        if (amountNeed > launchTokenContract.balanceOf(address(this))) {
            revert("the token balance is not enough to start all pools");
        }

        for (uint256 i = 0; i < pools.length; i++) {
            address poolTokenAddress = pools[i].poolTokenAddress;
            address poolAddress = pools[i].poolAddress;
            uint256 amount = pools[i].launchTokenAmount;
            uint256 launchPadEndDate = block.timestamp + launchPadTime;

            launchTokenContract.approve(poolTokenAddress, amount);
            launchTokenContract.transfer(poolTokenAddress, amount);
            LaunchPadPool(poolAddress).startPool(launchPadEndDate);
        }
    }
}
