var Gallons_ERC20 = artifacts.require("Gallons_ERC20");
var Watering_Holes = artifacts.require("Watering_Holes");
var Watering_Holes_Bond = artifacts.require("Watering_Holes_Bond");

module.exports = function (deployer) {
  deployer.link(Gallons_ERC20, Watering_Holes_Bond);
  deployer.link(Watering_Holes_Bond, Watering_Holes);

  deployer.deploy(Gallons_ERC20, "Gallons", "gal").then(function() {
    return deployer.deploy(Watering_Holes_Bond, Gallons_ERC20.address);
  }).then(function() {
    return deployer.deploy(Watering_Holes, Watering_Holes_Bond.address);
  });

};

//let Gal = await Gallons_ERC20.deployed()
//let accounts = await web3.eth.getAccounts()
//Gal.increaseAllowance(accounts[0], 100000)
//Gal.transferFrom(accounts[0], "", 10000)        //Watering_Holes_Bond contract address
//let Bond = await Watering_Holes_Bond.deployed()
//Bond.setWateringHoles("")                       //Watering_Holes contract address
//let Holes = await Watering_Holes.deployed()
//Holes.addUser("", "")                           //string name and string photoURL