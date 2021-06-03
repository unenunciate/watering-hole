var Gallons_ERC20 = artifacts.require("Gallons_ERC20");
var Watering_Holes = artifacts.require("Watering_Holes");
var Watering_Holes_Bond = artifacts.require("Watering_Holes_Bond");

module.exports = function (deployer) {
  deployer.deploy(Watering_Holes);
  deployer.deploy(Gallons_ERC20, "Gallons", "gal").then(function() {
    return deployer.deploy(Watering_Holes_Bond, Gallons_ERC20.address, Watering_Holes.address);
  });

};
//let Watering_Holes = await Watering_Holes.deployed()
//Watering_Holes.addUser("Patrick", "https://twitter.com/Unenunciate/photo")