// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RedAccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract RedTokenGenDeployer is RedAccessControl {
    event Deployed(address target, address owner);
    ERC20 _usdt = ERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    AggregatorV3Interface internal priceFeed;

    // On rinkeby, the ETH/USD oracle is 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
    // On mainnet, the ETH/USD oracle is 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
    constructor(address priceFeedOracle) {
      priceFeed = AggregatorV3Interface(priceFeedOracle);
    }

    function __withdrawETH(address payable to, uint256 amount)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function __withdrawUSDT(address to, uint256 amount)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _usdt.transfer(to, amount);
    }

    modifier __withEthPayment(uint256 amount) {
        require(
            __checkEthPayment(amount) || __checkUSDTPayment(amount),
            string(
                abi.encodePacked(
                    "Deploy: Fee is ",
                    Strings.toHexString(amount),
                    "ETH (or BNB on Binance Smart Chain) or the equivalent amount of USDT"
                )
            )
        );
        _;
    }

    function __checkEthPayment(uint256 amount) internal returns(bool) {
      if (msg.value >= amount) return true;
      return false;
    }

    function __checkUSDTPayment(uint256 amount) internal returns(bool) {

    }
}
