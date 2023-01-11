var ClothesFactory = artifacts.require("ClothesFactory");

module.exports = function(deployer) {
    deployer.deploy(ClothesFactory);
}