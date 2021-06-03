//SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import { Gallons_ERC20 } from "./Gallons_ERC20.sol";

import { Watering_Holes_Bond } from "./Watering_Holes_Bond.sol";

import "./Ownable.sol";

library compare {
    function compare2x3(string memory aa, string memory ab, string memory ba, string memory bb, string memory ca, string memory cb) internal pure returns(bool result) {
        result = (
            (keccak256(abi.encodePacked((aa))) == keccak256(abi.encodePacked((ab)))) && 
            (keccak256(abi.encodePacked((ba))) == keccak256(abi.encodePacked((bb)))) && 
            (keccak256(abi.encodePacked((ca))) == keccak256(abi.encodePacked((cb))))
        );
    }
}

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

contract Watering_Holes is Ownable {

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
    
    Watering_Holes_Bond public _Watering_Holes_Bond;
    
    uint256 private _bondEpochTimestamp;
    uint256 private _bondPeriodTimestamp;
    uint256 private _bondPeriodNouce;
    uint256 private _bondPeriodDuration;
    uint256 private _bondPeriodRandomizedEnd;
    
    uint256 public _totalBondCreditPool;
    
    bool public _isRolloverPeriod;

    address payable _zeroAddress;
    
    constructor(address payable Gallons_ERC20_) {
        _bondEpochTimestamp = block.timestamp;
        _bondPeriodTimestamp = _bondEpochTimestamp;
        _bondPeriodDuration = 2629746;
    
        _zeroAddress = payable(address(0x0000000000000000000000000000000000000000));
    }
    
    function addWateringHole(string memory localGroup_, string memory majorGroup_, string memory superiorGroup_) public returns (bool) {
        for(uint i = 0; i < _numberOfWateringHoles; i++) {
            require(!compare.compare2x3(localGroup_, _wateringHoles[i]._localGroup, majorGroup_, _wateringHoles[i]._majorGroup, superiorGroup_, _wateringHoles[i]._superiorGroup));
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
    
    function addPost(uint wateringHoleID_, string memory content_, string memory date_) public returns (bool) {
        require(_wateringHoles[wateringHoleID_]._lastPostBlockTimestamp != 0, "Watering Hole does not exist.");
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

        _Watering_Holes_Bond.updateBond(payable(address(msg.sender)));
        
        return true;
    }
    
    function addComment(uint wateringHoleID_, uint postID_, string memory content_, string memory date_) public returns (bool) {
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
        
        _Watering_Holes_Bond.updateBond(payable(address(msg.sender)));

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

        /**
            Testnet Only
         */
        _Watering_Holes_Bond.requestPayment(payable(address(msg.sender)), 10000);

        _Watering_Holes_Bond.updateBond(payable(address(msg.sender)));
        
        return true;
    }
    
    function getWateringHole(uint256 wateringHoleID_) public returns (WateringHole memory wateringHole_) {
        wateringHole_ = _wateringHoles[wateringHoleID_];
    }
    
    function getPost(uint256 wateringHoleID_, uint256 postID_) public view returns (Post memory post_) {
        post_ = _posts[wateringHoleID_][postID_];
    }
    
    function getComment(uint256 postID_, uint256 commentID_) public view returns (Post memory comment_) {
        comment_ = _comments[postID_][commentID_];
    }

    function getUser(address userAddress_) public view returns (User memory){
        return _users[userAddress_];
    }
    
    function payPost(uint256 wateringHoleID_, uint256 postID_) payable public {
        _posts[wateringHoleID_][postID_]._numberOfGallonsSupported += msg.value;
        Post memory post_ = _posts[wateringHoleID_][postID_];
        
        _Watering_Holes_Bond.taxedTransfer((payable(address(msg.sender))), (payable(address(this))), msg.value);
        _users[post_._poster]._numberOfGallonsSupported += msg.value;
    }
    
    function payComment(uint256 postID_, uint256 commentID_) payable public {
        _comments[postID_][commentID_]._numberOfGallonsSupported += msg.value;
        Post memory comment_ = _comments[postID_][commentID_];
        
        _Watering_Holes_Bond.taxedTransfer((payable(address(msg.sender))), (payable(address(this))), msg.value);
        _users[comment_._poster]._numberOfGallonsSupported += msg.value;
    }

    function updateBond(address payable user_, uint amount_) internal {
        _Watering_Holes_Bond.updateBond(user_, amount_);
    }
}