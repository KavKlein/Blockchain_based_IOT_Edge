require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache UI default RPC
      accounts: [
        // Add private keys from Ganache UI (click key icon next to accounts)
        "0xd0db1718a2092021387df82fc5e9342c096387b3e11c0181aa1a96d5755fc3d6"
      ],
      chainId: 1337 // Ganache default chain ID
    }
  }
};