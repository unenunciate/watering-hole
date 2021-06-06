import { ethers } from 'ethers';

const Ethers = new ethers.providers.JsonRpcProvider('http://192.168.0.151:9545');

console.log("lib", Ethers);

export default Ethers;