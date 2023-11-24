// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol";

/// @custom:security-contact security@ctison.dev
contract Vault is Initializable, ERC4626Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(IERC20 _erc20) public initializer {
        __ERC20_init_unchained("StakedUselessToken", "sUTKN");
        __ERC4626_init_unchained(_erc20);
        __Ownable_init(tx.origin);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
