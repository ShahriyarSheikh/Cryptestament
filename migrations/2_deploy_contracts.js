


var DateTimeLibrary = artifacts.require("./DateTimeLibrary.sol");
var Cryptestament = artifacts.require("./Cryptestament.sol");

var constructor = {arbitrator:"0x4A36D6E7F179e6B3e21C12278857fa5b69Ce7210",fixedCommission:1000000}


module.exports = function(deployer) {
  deployer.deploy(DateTimeLibrary);
  deployer.link(DateTimeLibrary,Cryptestament);
  deployer.deploy(Cryptestament,constructor.arbitrator,constructor.fixedCommission);
};