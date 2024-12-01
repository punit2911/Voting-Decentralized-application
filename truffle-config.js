const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { projectId, mnemonic } = require('./secrets.json');

module.exports = {
  contracts_build_directory: path.join(__dirname, "frontend/voting-app/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Port where Ganache is running
      network_id: "5777",       // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Use a version compatible with your smart contract
    },
  },
};


