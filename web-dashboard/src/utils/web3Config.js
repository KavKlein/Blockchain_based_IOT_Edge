import Web3 from 'web3';

// Update these from your .env file
export const GANACHE_URL = 'http://127.0.0.1:7545';
export const CONTRACT_ADDRESS = '0x7BaEe83551bA2465fe53aa4f7358c962909A0F77';

export const CONTRACT_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "node",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "nodeId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "dataType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "value",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "protocol",
          "type": "string"
        }
      ],
      "name": "DataLogged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "node",
          "type": "address"
        }
      ],
      "name": "NodeAuthorized",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_node",
          "type": "address"
        }
      ],
      "name": "addAuthorizedNode",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "authorizedNodes",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "dataLogs",
      "outputs": [
        {
          "internalType": "address",
          "name": "nodeAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "nodeId",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "dataType",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "value",
          "type": "int256"
        },
        {
          "internalType": "string",
          "name": "protocol",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nodeAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "nodeId",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "dataType",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "value",
              "type": "int256"
            },
            {
              "internalType": "string",
              "name": "protocol",
              "type": "string"
            }
          ],
          "internalType": "struct IoTDataLogger.SensorData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDataCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_count",
          "type": "uint256"
        }
      ],
      "name": "getLatestData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nodeAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "nodeId",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "dataType",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "value",
              "type": "int256"
            },
            {
              "internalType": "string",
              "name": "protocol",
              "type": "string"
            }
          ],
          "internalType": "struct IoTDataLogger.SensorData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_nodeId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_dataType",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "_value",
          "type": "int256"
        },
        {
          "internalType": "string",
          "name": "_protocol",
          "type": "string"
        }
      ],
      "name": "logData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

// Initialize Web3 Provider

export const web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL));



// Initialize Web3
//export const web3 = new Web3(GANACHE_URL);

// Initialize Contract
export const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Helper function to fetch all data
export async function fetchAllSensorData() {
  try {
    const data = await contract.methods.getAllData().call();
    return data.map(entry => ({
      nodeAddress: entry.nodeAddress,
      nodeId: entry.nodeId,
      timestamp: Number(entry.timestamp),
      dataType: entry.dataType,
      value: Number(entry.value) / 100, // Convert back from integer
      protocol: entry.protocol
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Helper function to get data count
export async function getDataCount() {
  try {
    const count = await contract.methods.getDataCount().call();
    return Number(count);
  } catch (error) {
    console.error('Error getting count:', error);
    return 0;
  }
}