var CryptestamentMain = artifacts.require("./Cryptestament.sol");
const web3 = require('web3');
let getDate = require("./helper")

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
            console.log(result)
            assert(ownerDetails.firstName == result[0],"Items not stored")
            assert(ownerDetails.lastName == result[1],"Item 2 not stored")
            assert(result[2],"Item 3 not stored")

        })

        it("Adds testament of owner and checks if it is successfully added", async()=>{
           var testamentDetails = {
               nominees :["0x1Ba2c4653eE4C6d1d3f1AC4F00310A31dcE358Ed","0xF45ED61919F0859D3FF5d8E2ECac7b59A94649e9"],
               timeRemaining : getDate("12-12-2020"),
               daysToExtend : 30,
               testamentAmount: "1"
           }

           await demoContract.AddTestament(testamentDetails.nominees,
            testamentDetails.timeRemaining,
            testamentDetails.daysToExtend,
            {value:web3.utils.toWei(testamentDetails.testamentAmount,"ether")})

            var testament = await demoContract.ShowTestament();
            assert(testamentDetails.nominees[0] == testament[0][0] 
                && testamentDetails.nominees[1] == testament[0][1]
                ,"Expected " + testamentDetails.nominees + " But got " + testament[0] )
            //assert(testamentDetails.testamentAmount == testament[1],"Amount incorrect")
           
        })
        

    })
});