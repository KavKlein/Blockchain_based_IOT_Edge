// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract IoTDataLogger {
    struct SensorData {
        address nodeAddress;
        string nodeId;
        uint256 timestamp;
        string dataType;
        int256 value;
        string protocol;
    }
    
    SensorData[] public dataLogs;
    mapping(address => bool) public authorizedNodes;
    address public owner;
    
    event DataLogged(
        address indexed node,
        string nodeId,
        uint256 timestamp,
        string dataType,
        int256 value,
        string protocol
    );
    
    event NodeAuthorized(address indexed node);
    
    constructor() {
        owner = msg.sender;
        authorizedNodes[msg.sender] = true;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    modifier onlyAuthorized() {
        require(authorizedNodes[msg.sender], "Node not authorized");
        _;
    }
    
    function addAuthorizedNode(address _node) public onlyOwner {
        authorizedNodes[_node] = true;
        emit NodeAuthorized(_node);
    }
    
    function logData(
        string memory _nodeId,
        string memory _dataType,
        int256 _value,
        string memory _protocol
    ) public onlyAuthorized {
        dataLogs.push(SensorData({
            nodeAddress: msg.sender,
            nodeId: _nodeId,
            timestamp: block.timestamp,
            dataType: _dataType,
            value: _value,
            protocol: _protocol
        }));
        
        emit DataLogged(msg.sender, _nodeId, block.timestamp, _dataType, _value, _protocol);
    }
    
    function getDataCount() public view returns (uint256) {
        return dataLogs.length;
    }
    
    function getLatestData(uint256 _count) public view returns (SensorData[] memory) {
        uint256 total = dataLogs.length;
        if (total == 0) {
            return new SensorData[](0);
        }
        
        uint256 count = _count > total ? total : _count;
        SensorData[] memory latest = new SensorData[](count);
        
        for (uint256 i = 0; i < count; i++) {
            latest[i] = dataLogs[total - count + i];
        }
        return latest;
    }
    
    function getAllData() public view returns (SensorData[] memory) {
        return dataLogs;
    }
}