require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache UI default RPC
      accounts: [
        // Add private keys from Ganache UI (click key icon next to accounts)
        "0x22d846d6baa23b8f7acc9d1fbc04ff8bcf8b9c9eb22a676dbbb516c970dde7c5"
      ],
      chainId: 1337 // Ganache default chain ID
    }
  }
};