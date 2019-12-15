pragma solidity >=0.4.22 <0.6.0;

import {DateTimeLibrary} from "./DateTimeLibrary.sol";

contract CryptestamentMainContract {
    
    /* Variables */
    address payable _arbitrator;
    address payable _owner;
    uint256 _fixedCommission;
    bool _locked;
    
    /* Modifiers */
    modifier isOwner(){
        require(msg.sender == _owner);
        _;
    }
    
    modifier onlyArbitrator(){
        require(msg.sender == _arbitrator);
        _;
    }
    
    /* Structs */
    // stored against the address of the user
    struct User {
        string firstName;
        string lastName;
        bool isPersonAlive;
    }
    
    //stored against adress will indicate the initiator
    struct TestamentDetails {
        address payable[] nominees;
        uint256 balanceToSend;
        bool canClaim;
        uint256 timeRemaining;
        uint256 daysToExtend;
    }
    
    
    /* Mappings */
    mapping(address=>User) _userDetails;
    mapping(address => TestamentDetails) _userTestament;
    
    
    constructor(address payable arbitrator, uint256 fixedCommission) public{
        _arbitrator = arbitrator;
        _owner = msg.sender;
        _fixedCommission = fixedCommission;
    }
    
    
    function AddTestament(address payable[] calldata nominees, uint256 timeRemaining, uint256 daysToExtend) external payable {
        TestamentDetails memory testamentDetails;
        testamentDetails.nominees = nominees;
        testamentDetails.balanceToSend = msg.value;
        testamentDetails.timeRemaining = timeRemaining;
        testamentDetails.daysToExtend = daysToExtend;
        _userTestament[msg.sender] = testamentDetails;
    }
    
    function ShowTestament() external returns (address payable[] memory,uint256,bool, uint256,uint256){
        return (_userTestament[msg.sender].nominees,
        _userTestament[msg.sender].balanceToSend,
        _userTestament[msg.sender].canClaim,
        _userTestament[msg.sender].daysToExtend,
        _userTestament[msg.sender].timeRemaining);
    }
    
    //TODO
    function UpdateUserDetails() external {}
    
    //TODO
    //Extend testament by daysToExtend
    function RefreshTestament() external returns (bool){
        TestamentDetails storage testamentDetails = _userTestament[msg.sender]; 
        
         if(CheckIfTimeRemains(testamentDetails.timeRemaining)){
            
            testamentDetails.timeRemaining += testamentDetails.daysToExtend * 1 days;
            
            return true;
        }
        return false;
    }
    
    //TODO
    //First check if testament exists, then check if the user who is claming the testament exists in the nominees   
    function ClaimTestament(address testamentOwner) external payable {
        TestamentDetails memory testamentDetails = _userTestament[testamentOwner];
        
        require(CheckIfTimeRemains(testamentDetails.timeRemaining),"Claim time has not yet occured");
        uint amount = testamentDetails.balanceToSend - 1000000; //Commission
        //TODO
       
        for(uint256 i=0; i < testamentDetails.nominees.length;i++){
            lock();
            uint sendAmount = amount / testamentDetails.nominees.length;
            testamentDetails.nominees[i].transfer(sendAmount);
            unlock();
        }
       
    }
    
    //TODO
    function CheckClaimDate(address testamentOwner) external returns (uint year, uint month, uint day){
        TestamentDetails memory testamentDetails = _userTestament[testamentOwner];
        (year, month, day) = DateTimeLibrary.timestampToDate(testamentDetails.timeRemaining);
        return (year, month, day);
    }
    
    
    /* Internal Functions */
    function CheckIfTimeRemains(uint256 timeRemaining) internal returns (bool){
        if(now > timeRemaining)
            return true;
        return false;
    }
    
    function lock() internal {
        if(!_locked){
            _locked = true;
        }else{
            revert("Transaction is locked, reenterency not possible");
        }
    }
    
    function unlock() internal  {
        _locked = true;
    }
    
    /* Public Functions */
    function TimeChecker(uint256 timeRemaining) public returns (bool,uint){
        if(now > timeRemaining)
            return (true, now);
        return (false, now);
    }
    

}