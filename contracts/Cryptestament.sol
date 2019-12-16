pragma solidity >=0.4.22 <0.6.0;

import {DateTimeLibrary} from "./DateTimeLibrary.sol";

contract Cryptestament {
    
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
    
    /* Events */
    event ClaimTaken(address payable[] nominees, uint256 amount);
    
    
    constructor(address payable arbitrator, uint256 fixedCommission) public{
        _arbitrator = arbitrator;
        _owner = msg.sender;
        _fixedCommission = fixedCommission;
    }
    
    function CheckUserDetails(address userAddress) external view returns (string memory, string memory, bool){
        User memory user = _userDetails[userAddress];
        return (user.firstName, user.lastName, user.isPersonAlive);
    }
    
        //TODO: move all data to IPFS rather than store on eth blockchain
        // Have a signing mechanism that verifies the call to this function comes from our dedicated server
    function UpdateUserDetails(string calldata firstName, string calldata lastName) external {
        User memory user;
        user.firstName = firstName;
        user.lastName = lastName;
        user.isPersonAlive = true;
        
        _userDetails[msg.sender] = user;
    }
    
    function AddTestament(address payable[] calldata nominees, uint256 timeRemaining, uint256 daysToExtend) external payable {
        TestamentDetails memory testamentDetails;
        testamentDetails.nominees = nominees;
        testamentDetails.balanceToSend = msg.value;
        testamentDetails.timeRemaining = timeRemaining;
        testamentDetails.daysToExtend = daysToExtend;
        _userTestament[msg.sender] = testamentDetails;
    }
    
    function ShowTestament() external view returns (address payable[] memory,uint256,bool, uint256,uint256){
        return (_userTestament[msg.sender].nominees,
        _userTestament[msg.sender].balanceToSend,
        _userTestament[msg.sender].canClaim,
        _userTestament[msg.sender].daysToExtend,
        _userTestament[msg.sender].timeRemaining);
    }
    
    
    //Extend testament by daysToExtend
    function RefreshTestament() external{
        require(_userDetails[msg.sender].isPersonAlive,"Person does not exist or is not alive");
        
        TestamentDetails storage testamentDetails = _userTestament[msg.sender]; 
        
        require(CheckIfTimeRemains(testamentDetails.timeRemaining),"time has elapsed, or the claim has already been taken");
            
        testamentDetails.timeRemaining += testamentDetails.daysToExtend * 1 days;
        
    }
    
    
    //First check if testament exists, then check if the user who is claming the testament exists in the nominees   
    function ClaimTestament(address testamentOwner) external payable {
        TestamentDetails memory testamentDetails = _userTestament[testamentOwner];
        
        require(CheckIfTimeRemains(testamentDetails.timeRemaining),"Claim time has not yet occured");
        require(DoesNomineeExistInTestament(testamentDetails.nominees,msg.sender),"Unauthorized");
        
        uint amount = testamentDetails.balanceToSend - _fixedCommission; //Commission

        for(uint256 i=0; i < testamentDetails.nominees.length;i++){
            lock();
            uint sendAmount = amount / testamentDetails.nominees.length;
            testamentDetails.nominees[i].transfer(sendAmount);
            unlock();
        }
        
        lock();
        _owner.transfer(_fixedCommission);
        unlock();
        
        emit ClaimTaken(testamentDetails.nominees,amount);
       
    }
    
    function CheckClaimDate(address testamentOwner) external view returns (uint year, uint month, uint day){
        TestamentDetails memory testamentDetails = _userTestament[testamentOwner];
        (year, month, day) = DateTimeLibrary.timestampToDate(testamentDetails.timeRemaining);
        return (year, month, day);
    }
    
    
    /* Internal Functions */
    function CheckIfTimeRemains(uint256 timeRemaining) internal view returns (bool){
        if(now > timeRemaining)
            return true;
        return false;
    }
    
    //TODO: Work on a complex version of lock function
    function lock() internal {
        if(!_locked){
            _locked = true;
        }else{
            revert("Transaction is locked, reenterency not possible");
        }
    }
    
    //TODO: Work on a complex version of unlock function
    function unlock() internal  {
        _locked = true;
    }
        
    //TODO: Need to find a better way, probably through multisign (ecrecover)
    function DoesNomineeExistInTestament (address payable[] memory nominees, address payable nominee) internal pure returns (bool){
      for (uint i; i< nominees.length;i++){
          if (nominees[i]==nominee)
          return true;
      }
      return false;
    }
    
    /* Public Functions */
    function TimeChecker(uint256 timeRemaining) public view returns (bool,uint){
        if(now > timeRemaining)
            return (true, now);
        return (false, now);
    }

    

}