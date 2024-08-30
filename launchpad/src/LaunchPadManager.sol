// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin-contracts-5.0.2/utils/Context.sol";
import "./LaunchPad.sol";

contract LaunchPadManager is Context {
    mapping(uint256 => LaunchPad) public launchPads;
    uint256 public LaunchPadsLenght = 0;

    function listLaunchPads() public view returns (LaunchPad[] memory) {
        LaunchPad[] memory returnLaunchPads = new LaunchPad[](LaunchPadsLenght);
        for (uint256 i = 0; i < LaunchPadsLenght; i++) {
            returnLaunchPads[i] = launchPads[i];
        }
        return returnLaunchPads;
    }

    function createLaunchPadFromExist(address token_, CreatePool[] memory launchpad_pools_, uint256 launchPadTime_)
        public
        returns (LaunchPad)
    {
        LaunchPad launchpad = new LaunchPad(token_, launchpad_pools_, launchPadTime_, _msgSender());
        launchPads[LaunchPadsLenght] = launchpad;
        LaunchPadsLenght++;
        return launchpad;
    }

    // function createLaunchPadAndToken() public {}
}
