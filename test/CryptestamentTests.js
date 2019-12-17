var CryptestamentMain = artifacts.require("./Cryptestament.sol");
const web3 = require('web3');

var _accounts = [];
var demoContract = null;

contract('Cryptestament', function (accounts) {

    describe("DESCRIBE: Deploy the Testament Main Contract", function () {
  
      it("Catched an instance of the demo contract", async () => {
        demoContract = await CryptestamentMain.deployed();
        _accounts = accounts;
        assert(demoContract.address !== '',"Contract not properly deployed")
      })
    });

    describe("DESCRIBE: Enter User Details into contract and add testament", function(){

        it("Adds testament owner details into the contract", async()=>{
            var ownerDetails = {firstName:"John",lastName:"Doe"};
            await demoContract.UpdateUserDetails(ownerDetails.firstName,ownerDetails.lastName);
            var result = await demoContract.CheckUserDetails(_accounts[0])
            assert(result.firstName == ownerDetails[0],"Items not stored")
            assert(result.lastName == ownerDetails[1],"Item 2 not stored")
            assert(true == ownerDetails[2],"Item 3 not stored")

        })

        it("Adds testament of owner", async()=>{
            console.log();
        })

    })
});