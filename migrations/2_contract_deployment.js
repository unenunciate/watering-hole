var Gallons_ERC20 = artifacts.require("Gallons_ERC20");
var Watering_Holes = artifacts.require("Watering_Holes");

module.exports = function (deployer) {
  deployer.deploy(Gallons_ERC20, "Gallons", "gal").then(function() {
    return deployer.deploy(Watering_Holes, Gallons_ERC20.address);
  });

  
};