var Gallons_ERC20 = artifacts.require("Gallons_ERC20");
var Watering_Holes = artifacts.require("Watering_Holes");
var Watering_Holes_Bond = artifacts.require("Watering_Holes_Bond");

module.exports = function (deployer) {

  deployer.deploy(Gallons_ERC20, "Gallons", "gal").then(function() {
    return deployer.deploy(Watering_Holes_Bond, Gallons_ERC20.address);
  }).then(function() {
    return deployer.deploy(Watering_Holes, Watering_Holes_Bond.address);
  });
};

//let Gal = await Gallons_ERC20.deployed()
//let accounts = await web3.eth.getAccounts()
//Gal.increaseAllowance(accounts[0], 100000, {from: accounts[0]})
//Gal.transferFrom(accounts[0], "0x2b69ad29563Ab89e040C6187ab48d5aC16582196", 10000, {from: accounts[0]})     //Watering_Holes_Bond contract address
//let Bond = await Watering_Holes_Bond.deployed()
//Bond.setWateringHoles("0x8FD3aB2Ecf0Ba20297916152aAE293f7003a42f6", {from: accounts[0]})                 //Watering_Holes contract address
//let Holes = await Watering_Holes.deployed()
//Holes.addUser("sss", "sss", {from: accounts[0]})                          //string name and string photoURL
//Holes.addWateringHole("Brockton", "Massachusetts", "United States") 
//Holes.addPost(1, "This is a sample post", "12/25/2021")
/*

0) 0x7289be8f6e14af0385e1ce5db9fcb0d096514f7a
(1) 0x29d90a33bdb8c212b8b37bab41ba3fa0ca3893f5
(2) 0xd8bb9eefd3edcf355e8941d89c3f28dc8170d061
(3) 0xef1adaff4fb637ee3045118d895710faac7d9f2c
(4) 0xc40ebc9b74fcff8239008ff6f4abbdaadfb96110
(5) 0x8302379de6a22bfb4c8b4c34d748187b52a831ae
(6) 0x7bbfb7b87a29d7361dc116a1c924d0ff4326156e
(7) 0x4c2a0ccd74e6f6c05e6a604837d82a2d430d77d1
(8) 0x32edfd44baa624967e100ab46b0e784ef1d8d373
(9) 0xe6697de758bdc8fc0b1fbe855eb29bfed989c317

Private Keys:
(0) 3aa6e42218e0ff70161a6a465f105d1941b3684c5241ccf25342a7bee43c02b6
(1) 6ed26a16638670710548ecd17aef52c078b65f599a8ae21ddda2b7d289974059
(2) 34eedd687e8e0739f9c5b4a1043164595896aa69ef35389f75b52aa6099f7e16
(3) b6ab30ee1c8fbd2058ad368d4826c7c74114a8ca2826b43d8e7165387fc2ddba
(4) 61bd385fbdea320e9854bf1fada58ed86dd1689f06f10d8ea7545d6e0e986d3c
(5) 9ebed816e0d7951cccf1ac9405a7853df00183793f05cd7c297d657307fb7b5e
(6) 1305278984c476a3fc07ca9d6a702496aa94014bb37ae84edcccb95d77e4fb6f
(7) 886ea57f4467858cd842c75b10982c08a20b6dc405cca8b5f1721f256ef1a7a8
(8) 8b0de102894a0645b82382332d58988809085db1f9e1c7710f34fa8e721222e0
(9) e5e31b1baafc6e61e544f48331d046bc1a027b25b1c191038e4c8287b929577f

*/