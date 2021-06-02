import Web3 from 'web3';

const Ethereum = new Web3(Web3.givenProvider || "ws://localhost:8545");

console.log("lib", Ethereum);

export default Ethereum;