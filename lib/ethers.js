import { ethers } from 'ethers';

const Ethers = new ethers.providers.JsonRpcProvider('http://127.0.0.1:9545');

console.log("lib", Ethers);

export default Ethers;