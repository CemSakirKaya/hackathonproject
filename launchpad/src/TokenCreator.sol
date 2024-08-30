// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin-contracts-5.0.2/token/ERC20/ERC20.sol";

contract TokenCreator is ERC20 {
    constructor(address minter, uint256 initialSupply, string memory name) ERC20(name, name) {
        _mint(minter, initialSupply);
    }
}
