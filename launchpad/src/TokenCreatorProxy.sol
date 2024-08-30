// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./TokenCreator.sol";
import "@openzeppelin-contracts-5.0.2/token/ERC20/ERC20.sol";

contract TokenCreatorProxy {
    function createToken(uint256 initialSupply, string memory name) public returns (address) {
        ERC20 token = new TokenCreator(msg.sender, initialSupply, name);
        return address(token);
    }
}
