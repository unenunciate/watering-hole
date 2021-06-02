var Gallons_ERC20 = artifacts.require("Gallons_ERC20");
var Watering_Holes = artifacts.require("Watering_Holes");

module.exports = function (deployer) {
  //deployer.deploy(Gallons_ERC20, "Gallons", "gal");
  deployer.deploy(Watering_Holes, 0x8C035FC9916826FFA5fF382d8828408870D56E0c);
};