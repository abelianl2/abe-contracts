// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

interface ISimpleBridge {
    function deposit(
        bytes32 deposit_uuid,
        address to_address,
        uint256 amount
    ) external;

    function withdraw(
        bytes32 withdraw_uuid,
        string calldata btc_address
    ) external payable;

    event DepositEvent(
        address indexed caller,
        address indexed to_address,
        uint256 amount
    );

    event WithdrawEvent(
        address indexed from_address,
        string btc_address,
        uint256 amount
    );
}

contract SimpleBridge is
    ISimpleBridge,
    Initializable,
    AccessControlUpgradeable
{
    receive() external payable {}

    bytes32 public constant ADMIN_ROLE = keccak256("admin_role");

    mapping(bytes32 => bool) deposit_uuids;
    mapping(bytes32 => bool) withdraw_uuids;

    function initialize() public initializer {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function deposit(
        bytes32 deposit_uuid,
        address b2_to_address,
        uint256 btc_amount
    ) external onlyRole(ADMIN_ROLE) {
        require(!deposit_uuids[deposit_uuid], "non-repeatable processing");
        deposit_uuids[deposit_uuid] = true;
        uint256 b2_amount = btc_amount * 10000000000;
        payable(b2_to_address).transfer(b2_amount);
        emit DepositEvent(msg.sender, b2_to_address, b2_amount);
    }

    function withdraw(
        bytes32 withdraw_uuid,
        string calldata btc_address
    ) external payable {
        require(!withdraw_uuids[withdraw_uuid], "non-repeatable processing");
        withdraw_uuids[withdraw_uuid] = true;
        uint256 b2_amount = msg.value;
        uint256 btc_amount = b2_amount / 10000000000;
        emit WithdrawEvent(msg.sender, btc_address, btc_amount);
    }

    function isDepositUuidUsed(
        bytes32 deposit_uuid
    ) public view returns (bool) {
        return deposit_uuids[deposit_uuid];
    }

    function isWithdrawUuidUsed(
        bytes32 withdraw_uuid
    ) public view returns (bool) {
        return withdraw_uuids[withdraw_uuid];
    }
}
