module.exports = {
  networks: {
    development: {
      host: "192.168.0.151",
      port: 9545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: ">=0.4.25"
    }
  }
};