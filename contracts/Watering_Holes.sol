//SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import { Gallons_ERC20 } from "./Gallons_ERC20.sol";

import "./Ownable.sol";

contract Watering_Holes is Ownable {
    /*
        Data types:
        WateringHole - forum level data structure;
        Post - content and comment data structure;
        User - user profile data structure;
    **/
    struct WateringHole {
        uint _id;
        string _localGroup;
        string _majorGroup;
        string _superiorGroup;
    
        uint256 _lastPostBlockTimestamp;
        
        uint256 _numberOfPostsInHole;
    }
    
    struct Post {
        uint _id;

        address payable _poster;
    
        string _content;
        string _date;
        uint256 _timestamp;
        
        uint256 _numberOfCommentsInPost;
        uint256 _numberOfGallonsSupported;
    }
    
    struct User {
        uint _id;
        address payable _user;
        string _name;
        string _profilePhotoURL;
        uint256 _numberOfGallonsSupported;
    }
    
    struct Creditor {
        uint _id;
        address payable _creditor;
        bool _payableInGallons;
        uint256 _creditExtended;
        uint256 _lifetimeCreditExtended;
        uint8 _paybackPeroids;
    }
    
    /*
        Website content data stroage and tracking.
    **/
    mapping(uint256 => WateringHole) public _wateringHoles;
    uint private _numberOfWateringHoles;
    mapping(uint256 => mapping(uint => Post)) public _posts;
    uint256 private _numberOfPosts;
    mapping(uint256 => mapping(uint => Post)) public _comments;
    uint256 private _numberOfComments;
    
    mapping(address => User) public _users;
    uint256 private _numberOfUsers;
    
    /*
        Total amount of users active in the current bonding peroid plus sequencal rollover bonding peroids.
    **/
    User[] public _activeUsers; 
    
    /*
        Total amount of funds each user has owed to them currently.
        Total amount owed := The current bonding peroid plus rollover from past insufficant payments of pervious bonding peroids.
    **/
    Gallons_ERC20 public _reservoir;
    mapping(address => uint256) public _owedGallonsInReservoir;
    
    uint256 private _bondEpochTimestamp;
    uint256 private _bondPeriodTimestamp;
    uint256 private _bondPeriodNouce;
    uint256 private _bondPeriodDuration;
    uint256 private _bondPeriodRandomizedEnd;
    
    uint256 public _totalBondCreditPool;
    
    bool public _isRolloverPeriod;
    
    Creditor[] public _creditors;

    address payable _zeroAddress;
    
    constructor(address payable Gallons_ERC20_) {
        _bondEpochTimestamp = block.timestamp;
        _bondPeriodTimestamp = _bondEpochTimestamp;
        _bondPeriodDuration = 2629746;
    
        _zeroAddress = payable(address(0x0000000000000000000000000000000000000000));
        
        _reservoir = Gallons_ERC20(Gallons_ERC20_);
    }

    modifier timerTracker {
        reinitializeBondingPeriod();
        _;
    }
    
    function addWateringHole(string memory localGroup_, string memory majorGroup_, string memory superiorGroup_) public returns (bool) {
        for(uint i = 0; i < _numberOfWateringHoles; i++) {
            require(!compare2x3(localGroup_, _wateringHoles[i]._localGroup, majorGroup_, _wateringHoles[i]._majorGroup, superiorGroup_, _wateringHoles[i]._superiorGroup));
        }

        _numberOfWateringHoles++;
        _wateringHoles[_numberOfWateringHoles] = WateringHole(
            _numberOfWateringHoles,
            localGroup_,
            majorGroup_,
            superiorGroup_,
            block.timestamp,
            0
        );
        return true;
    }
    
    function addPost(uint wateringHoleID_, string memory content_, string memory date_) public timerTracker returns (bool) {
        require(_wateringHoles[wateringHoleID_]._lastPostBlockTimestamp != 0, "");
        _numberOfPosts++;
        uint numberOfPosts_ = _wateringHoles[wateringHoleID_]._numberOfPostsInHole++;
        _posts[wateringHoleID_][numberOfPosts_] = Post(
            numberOfPosts_,
            payable(address(msg.sender)),
            content_,
            date_,
            block.timestamp,
            0,
            0
        );
        
        addActiveUser(payable(address(msg.sender)));
        
        return true;
    }
    
    function addComment(uint wateringHoleID_, uint postID_, string memory content_, string memory date_) public timerTracker returns (bool) {
        require(_posts[wateringHoleID_][postID_]._poster != _zeroAddress, "Post can not be found.");

        _numberOfComments++;
        uint numberOfComments_ = _posts[wateringHoleID_][postID_]._numberOfCommentsInPost++;

        _posts[wateringHoleID_][numberOfComments_] = Post(
            _numberOfComments,
            payable(address(msg.sender)),
            content_,
            date_,
            block.timestamp,
            0,
            0
        );
        
        addActiveUser(payable(address(msg.sender)));
        
        return true;
    }
    
    function addUser(
        string memory name_,
        string memory profilePhotoURL_
        ) 
        public 
        returns (bool)
    {
        require(_users[msg.sender]._user == _zeroAddress);
        _numberOfUsers++;
        _users[msg.sender] = User(
            _numberOfUsers,
            payable(address(msg.sender)),
            name_,
            profilePhotoURL_,
            0
        );

        _reservoir.transferFrom(payable((address(this))), payable(address(msg.sender)), uint(1000));
        
        addActiveUser(payable(address(msg.sender)));
        
        return true;
    }
    
    function addActiveUser(address payable activeUser_) internal returns(bool result) {
        bool userActive_ = false;
        result = true;
        for(uint i = 0; i < _activeUsers.length; i++) {
            if(activeUser_ == _activeUsers[i]._user) {
                userActive_ = true;
                result = false;
                break;
            }
        }
        
        if(!userActive_) { _activeUsers.push(_users[activeUser_]); }
    }

    function addCreditor(address payable creditor_, bool payableInGallons_, uint creditExtended_, uint8 paybackPeriods_) internal returns(bool result) {
        _creditors.push(Creditor(
            _creditors.length,
            creditor_,
            payableInGallons_,
            creditExtended_,
            creditExtended_,
            paybackPeriods_)
        );
        
        result = true;
    }
    
    function getWateringHole(uint256 wateringHoleID_) public timerTracker returns (WateringHole memory wateringHole_) {
        wateringHole_ = _wateringHoles[wateringHoleID_];
    }
    
    function getPost(uint256 wateringHoleID_, uint256 postID_) public view returns (Post memory post_) {
        post_ = _posts[wateringHoleID_][postID_];
    }
    
    function getComment(uint256 postID_, uint256 commentID_) public view returns (Post memory comment_) {
        comment_ = _comments[postID_][commentID_];
    }
    
    function payPost(uint256 wateringHoleID_, uint256 postID_) payable public {
        _posts[wateringHoleID_][postID_]._numberOfGallonsSupported += msg.value;
        Post memory post_ = _posts[wateringHoleID_][postID_];
        
        taxedTransfer((payable(address(msg.sender))), (payable(address(this))), msg.value);
        _owedGallonsInReservoir[post_._poster] += msg.value / 2;
        _users[post_._poster]._numberOfGallonsSupported += msg.value;
    }
    
    function payComment(uint256 postID_, uint256 commentID_) payable public {
        _comments[postID_][commentID_]._numberOfGallonsSupported += msg.value;
        Post memory comment_ = _comments[postID_][commentID_];
        
        taxedTransfer((payable(address(msg.sender))), (payable(address(this))), msg.value);
        _owedGallonsInReservoir[comment_._poster] += msg.value / uint(2);
        _users[comment_._poster]._numberOfGallonsSupported += msg.value;
    }
    
    event noPaymentBondingPeroid(uint256 bondingPeriod_);
    event dispersementToActiveUsers(uint16 percentageDispersed_);
    event airdropToActiveUsers(uint16 amountDispersed_, string message_);
    event dispersementToAllUsers(uint256 gallonsEach_);
    event newUnencumberedBondingPeroid(uint256 bondingPeriod_);
    event newEncumberedBondingPeroid(uint256 bondingPeriod_);

    function disperse(uint16 _percentageToDisperse) internal {
        require(_percentageToDisperse <= 1000, "Can not disperse more than 100% owed.");
        
        if(_percentageToDisperse == 0) {
            emit noPaymentBondingPeroid(_bondPeriodTimestamp);
        } else if(_percentageToDisperse < 1000) {
            
            for(uint i = 0; i < _activeUsers.length - 1; i++) {
                uint amountOwed = _owedGallonsInReservoir[_activeUsers[i]._user];
                
                uint amountToPay = (amountOwed * 1000) / _percentageToDisperse;
                
                _reservoir.transferFrom(payable(address(this)), address(_activeUsers[i]._user), uint(amountToPay));
                
                _owedGallonsInReservoir[_activeUsers[i]._user] = amountOwed - amountToPay;
            }
            
            emit dispersementToActiveUsers(_percentageToDisperse);
        } else {
            for(uint i = 0; i < _activeUsers.length - 1; i++) {
                
                uint amountToPay = _owedGallonsInReservoir[_activeUsers[i]._user];
                
                _reservoir.transferFrom(payable(address(this)), address(_activeUsers[i]._user), uint(amountToPay));
                
                _owedGallonsInReservoir[_activeUsers[i]._user] = 0;
            }
            
            emit dispersementToActiveUsers(1000);
        }
    }

    /**
    function airdrop(uint16 amountToDisperse_, string memory message_) public onlyOwner {
        require(amountToDisperse_ > 0, "Can not disperse 0 gallons.");
       
        for(uint i = 0; i < _activeUsers.length - 1; i++) {
            _reservoir.transferFrom(payable(address(this)), address(_activeUsers[i]._user), uint(amountToDisperse_));
        }
            
        emit airdropToActiveUsers(amountToDisperse_, message_);
    }
    */
    
    function reinitializeBondingPeriod() internal {
        if(_bondPeriodRandomizedEnd < block.timestamp) {
            reinitializeRandomizedEnd();
            payBondPeriodDebtPayments();

            uint gallonsOwed_;
            for(uint i = 0; i < _activeUsers.length - 1; i++) {
                gallonsOwed_ += _owedGallonsInReservoir[_activeUsers[i]._user];
            }

            if(address(this).balance < gallonsOwed_) {
                _isRolloverPeriod = true;
                disperse(calculateDisperalPercentage(gallonsOwed_));
            } else {
                _isRolloverPeriod = false;
                disperse(1000);
            }

            if(!_isRolloverPeriod) {
                for(uint i = 0; i < _activeUsers.length - 1; i++) {
                    _owedGallonsInReservoir[_activeUsers[i]._user] = 0;
                    delete _owedGallonsInReservoir[_activeUsers[i]._user];
                }

                delete _activeUsers;
            }
        }
    }

    function reinitializeRandomizedEnd() internal {
        _bondPeriodTimestamp = block.timestamp;
        _bondPeriodNouce = (_bondPeriodTimestamp + uint(12304949) / uint(1000000)) / uint(13);
        _bondPeriodRandomizedEnd = _bondPeriodDuration + _bondPeriodNouce + _bondPeriodTimestamp;
    }
    
    function expandBondCreditPool(uint256 expandBy_, address payable creditor_, bool payableInGallons_, uint8 paybackPeroids_) payable public {
        _totalBondCreditPool += expandBy_;
        
        uint count;
        for(uint i = 0; i < _creditors.length - 1; i++ ) {
            if(_creditors[i]._creditor == creditor_) {
                count = i;
                break;
            }
        }

        if(count == 0) {
            addCreditor(creditor_, payableInGallons_, expandBy_, paybackPeroids_);
        } else {
            _creditors[count]._paybackPeroids += paybackPeroids_;
            _creditors[count]._payableInGallons = payableInGallons_;
            _creditors[count]._creditExtended += expandBy_;
            _creditors[count]._lifetimeCreditExtended += expandBy_;
        }
    }
    
    function payBondPeriodDebtPayments() internal {
        uint totalDebtPayment_;
        for(uint i = 0; i < _creditors.length - 1; i++) {
            totalDebtPayment_ += _creditors[i]._creditExtended / _creditors[i]._paybackPeroids;
        }

        uint gallonsDispersmentRequested_;
        uint weiDispersmentRequested_;

        Creditor[] memory creditorsPaidInGallons_;
        Creditor[] memory creditorsPaidInWei_;

        for(uint i = 0; i < _creditors.length - 1; i++) {
            if(_creditors[i]._payableInGallons) {
                creditorsPaidInGallons_[creditorsPaidInGallons_.length-1] =  _creditors[i];
                gallonsDispersmentRequested_ += (_creditors[i]._creditExtended / _creditors[i]._paybackPeroids);
            } else {
                creditorsPaidInWei_[creditorsPaidInGallons_.length-1] = _creditors[i];
                weiDispersmentRequested_ += (_creditors[i]._creditExtended / _creditors[i]._paybackPeroids);
            }
        }
        
        if(weiDispersmentRequested_ > address(this).balance) {
            liquidateResevoir(weiDispersmentRequested_);
        }

        if(address(this).balance < gallonsDispersmentRequested_) {
            uint count;
            for(uint i = 0; i < creditorsPaidInGallons_.length - 1; i++) {
                uint debtPaymentInWei_ = creditorsPaidInGallons_[i]._creditExtended / creditorsPaidInGallons_[i]._paybackPeroids;
                uint debtPayment_ = convertToGallonsFromWei(debtPaymentInWei_);

                if(_reservoir.balanceOf((payable(address(this)))) < debtPayment_) {
                    count = i;
                    break;
                }

                _reservoir.transferFrom(payable(address(this)), creditorsPaidInGallons_[i]._creditor, debtPayment_);
            }

            for(uint i = count; i < creditorsPaidInGallons_.length - 1; i++) {
                uint debtPayment_ = creditorsPaidInGallons_[i]._creditExtended / creditorsPaidInGallons_[i]._paybackPeroids;
                creditorsPaidInGallons_[i]._creditor.transfer(debtPayment_);
                creditorsPaidInGallons_[i]._creditExtended -= debtPayment_;
                creditorsPaidInGallons_[i]._paybackPeroids--;
            }
        } else {
            for(uint i = 0; i < creditorsPaidInGallons_.length - 1; i++) {
                uint debtPaymentInWei_ = creditorsPaidInGallons_[i]._creditExtended / creditorsPaidInGallons_[i]._paybackPeroids;
                uint debtPayment_ = convertToGallonsFromWei(debtPaymentInWei_);

                _reservoir.transferFrom(payable(address(this)), creditorsPaidInGallons_[i]._creditor, debtPayment_);

                creditorsPaidInGallons_[i]._creditExtended -= debtPaymentInWei_;
                creditorsPaidInGallons_[i]._paybackPeroids--;
            }
        }

        
        for(uint i = 0; i < creditorsPaidInWei_.length - 1; i++) {
            uint debtPayment_ = creditorsPaidInWei_[i]._creditExtended / creditorsPaidInWei_[i]._paybackPeroids;
            creditorsPaidInWei_[i]._creditor.transfer(debtPayment_);
            creditorsPaidInWei_[i]._creditExtended -= debtPayment_;
            creditorsPaidInWei_[i]._paybackPeroids--;
        }
        
        /*
        delete creditorsPaidInWei_;
        delete creditorsPaidInGallons_;
        **/
    }
    
    function withdrawFromCreditPool(address payable depositAddress_, uint amountRequested_) public onlyOwner {
        require(amountRequested_ <= _totalBondCreditPool);
        depositAddress_.transfer(amountRequested_);
        _totalBondCreditPool -= amountRequested_;
    }

    /**
        figureout fair dispersal percentages
     */
    function calculateDisperalPercentage(uint gallonsOwed_) internal pure returns (uint16 result) {
        result = 1000;
    }
    
    function convertToGallonsFromWei(uint convertToGallons_) internal pure returns (uint results) {
        
    }
    
    function liquidateResevoir(uint256 amount) internal returns (bool result) {
        
    }
    
    function taxedTransfer(address payable sender, address payable recipient, uint amount) internal {
        uint tax = amount/2;
        tax == 0 ? tax = 1 : tax = tax;
        uint amountAfterTax = amount - tax;
        
        _reservoir.transferFrom(sender, recipient, amountAfterTax);
        _reservoir.transferFrom(sender, payable(address(this)), tax);
    }

    function compare2x3(string memory aa, string memory ab, string memory ba, string memory bb, string memory ca, string memory cb) internal pure returns(bool result) {
        result = (
            (keccak256(abi.encodePacked((aa))) == keccak256(abi.encodePacked((ab)))) && 
            (keccak256(abi.encodePacked((ba))) == keccak256(abi.encodePacked((bb)))) && 
            (keccak256(abi.encodePacked((ca))) == keccak256(abi.encodePacked((cb))))
        );
    }
}