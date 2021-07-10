// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @dev Adds modifier `onlyRoleOrAll`. This way, giving a role to the zero
 *      address makes it as though everyone had that role
 */
abstract contract RedAccessControl is AccessControl {
    modifier onlyRoleOrAll(bytes32 role) {
        require(
            hasRole(role, address(0)) || hasRole(role, _msgSender()),
            string(
                abi.encodePacked(
                    "AccessControl: account ",
                    Strings.toHexString(uint160(_msgSender()), 20),
                    " is missing role ",
                    Strings.toHexString(uint256(role), 32)
                )
            )
        );
        _;
    }
}
