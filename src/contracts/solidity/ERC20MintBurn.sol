// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "RedAccessControl.sol";

/**
 * @dev {ERC20} token, including:
 *
 *  - Preminted initial supply
 *  - Ability for owner to mint new tokens
 *  - Access control mechanism (for minting/pausing) and hence some governance features
 *
 * _Available since v3.4._
 */
contract ERC20PresetFixedSupply is ERC20Pausable, RedAccessControl {
    uint8 _decimals;
    bytes32 MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 BURNER_ROLE = keccak256("BURNER_ROLE");

    /**
     * @dev Mints `initialSupply` amount of token and transfers them to `owner`.
     *
     * See {ERC20-constructor}.
     */
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 initialSupply,
        address owner
    ) ERC20(name, symbol) {
        _decimals = decimals_;
        _mint(owner, initialSupply);
        _setupRole(DEFAULT_ADMIN_ROLE, owner);
        _setRoleAdmin(MINTER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(BURNER_ROLE, DEFAULT_ADMIN_ROLE);
        _setupRole(MINTER_ROLE, owner);
        _setupRole(BURNER_ROLE, owner);
    }

    function mint(address account, uint256 amount)
        external
        onlyRoleOrAll(DEFAULT_ADMIN_ROLE)
    {
        _mint(account, amount);
    }

    function pause() external onlyRoleOrAll(DEFAULT_ADMIN_ROLE) whenNotPaused {
        _pause();
    }

    function unpause() external onlyRoleOrAll(DEFAULT_ADMIN_ROLE) whenPaused {
        _unpause();
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function burn(address account, uint256 amount)
        external
        onlyRoleOrAll(DEFAULT_ADMIN_ROLE)
    {
        _burn(account, amount);
    }
}
