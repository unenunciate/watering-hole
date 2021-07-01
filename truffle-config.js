var HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC = 'globe nuclear quit corn live gadget wait pigeon cancel river color village';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider({
          mnemonic: MNEMONIC,
          providerOrUrl: "wss://ropsten.infura.io/ws/v3/bb89bda1e77844a0bc414756b92a6496",
          addressIndex: 1
        });
      },
      network_id: 3,
      gas: 4000000      
    }
  },
  compilers: {
    solc: {
      version: ">=0.4.25"
    }
  }
};