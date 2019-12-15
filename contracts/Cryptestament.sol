pragma solidity >=0.4.22 <0.6.0;

import {DateTimeLibrary} from "././DateTimeLibrary.sol";

contract CryptestamentMainContract {
    
    /* Variables */
    address _arbitrator;
    address _owner;
    uint256 _fixedCommission;
    
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
        address[] nominees;
        uint256 balanceToSend;
        bool canClaim;
        uint256 timeRemaining;
        uint256 daysToExtend;
    }
    
    
    /* Mappings */
    mapping(address=>User) _userDetails;
    mapping(address => TestamentDetails) _userTestament;
    
    
    constructor(address arbitrator, uint256 fixedCommission) public{
        _arbitrator = arbitrator;
        _owner = msg.sender;
        _fixedCommission = fixedCommission;
    }
    
    
    function AddTestament(address[] calldata nominees, uint256 balanceToSend) external {
        TestamentDetails memory testamentDetails;
        testamentDetails.nominees = nominees;
        testamentDetails.balanceToSend = balanceToSend;
        _userTestament[msg.sender] = testamentDetails;
    }
    
    function ShowTestament() external returns (address[] memory,uint256,bool){
        return (_userTestament[msg.sender].nominees,_userTestament[msg.sender].balanceToSend,_userTestament[msg.sender].canClaim);
    }
    
    //TODO
    function UpdateUserDetails() external {}
    
    //TODO
    //Extend testament by daysToExtend
    function RefreshTestament() external returns (bool){
        TestamentDetails memory testamentDetails = _userTestament[msg.sender]; 
        
         if(CheckIfTimeRemains(testamentDetails.timeRemaining)){
            return true;
        }
        return false;
    }
    
    //TODO
    //First check if testament exists, then check if the user who is claming the testament exists in the nominees   
    function ClaimTestament(address testamentOwner) external returns (bool){
        TestamentDetails memory testamentDetails = _userTestament[testamentOwner];
        
        if(CheckIfTimeRemains(testamentDetails.timeRemaining)){
            return true;
        }
        return false;
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
    

}