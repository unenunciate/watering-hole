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

contract Watering_Holes {

    struct WateringHole {
        uint _id;
        string _localGroup;
        string _majorGroup;
        string _superiorGroup;

        uint256 _lastPostBlockTimestamp;
        
        uint256 _numberOfPostsInHole;

        string _pictureURL;

        address _founder;
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
        string _topic;
        uint256 _numberOfPosts;
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
    
    Watering_Holes_Bond public _Watering_Holes_Bond;

    address payable _zeroAddress = payable(address(0x0000000000000000000000000000000000000000));

    constructor(address Watering_Holes_Bond_) {
        _Watering_Holes_Bond = Watering_Holes_Bond(Watering_Holes_Bond_);
        _numberOfUsers  = 0;
    }

    event NewWateringHole(address indexed _by, uint _wID);
    event NewPost(address indexed _by, uint _wID, uint _pID);
    event NewComment(address indexed _by, uint _pID, uint _cID);
    event NewUser(address indexed _by);
    
    function addWateringHole(string memory localGroup_, string memory majorGroup_, string memory superiorGroup_, string memory pictureURL_) public {
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
            0,
            pictureURL_,
            msg.sender
        );

        emit NewWateringHole(msg.sender, (_numberOfWateringHoles));
    }
    
    function addPost(uint wateringHoleID_, string memory content_, string memory date_) public {
        require(_wateringHoles[wateringHoleID_]._lastPostBlockTimestamp != 0, "Watering Hole does not exist.");

        _numberOfPosts++;
        _wateringHoles[wateringHoleID_]._numberOfPostsInHole++;

        uint numberOfPosts_ = _wateringHoles[wateringHoleID_]._numberOfPostsInHole;
        _posts[wateringHoleID_][numberOfPosts_] = Post(
            _numberOfPosts,
            payable(address(msg.sender)),
            content_,
            date_,
            block.timestamp,
            0,
            0
        );

        _Watering_Holes_Bond.updateBond(payable(address(msg.sender)), 0);

        _users[msg.sender]._numberOfPosts++;

        emit NewPost(msg.sender, wateringHoleID_, numberOfPosts_);
    }
    
    function addComment(uint wateringHoleID_, uint postID_, string memory content_, string memory date_) public {
        require(_posts[wateringHoleID_][postID_]._poster != _zeroAddress, "Post can not be found.");

        _numberOfComments++;
        _posts[wateringHoleID_][postID_]._numberOfCommentsInPost++;
        
        uint numberOfComments_ = _posts[wateringHoleID_][postID_]._numberOfCommentsInPost;

        _comments[postID_][numberOfComments_] = Post(
            numberOfComments_,
            payable(address(msg.sender)),
            content_,
            date_,
            block.timestamp,
            0,
            0
        );
        
        _Watering_Holes_Bond.updateBond(payable(address(msg.sender)), 0);

        emit NewComment(msg.sender, (postID_), (numberOfComments_));
    }
    
    function addUser(
        string memory name_,
        string memory profilePhotoURL_,
        string memory topic_
        ) 
        public 
    {
        require(_users[msg.sender]._user == _zeroAddress);
        _numberOfUsers++;
        _users[payable(address(msg.sender))] = User(
            _numberOfUsers,
            payable(address(msg.sender)),
            name_,
            profilePhotoURL_,
            0,
            topic_,
            0
            );

        _Watering_Holes_Bond.updateBond(payable(msg.sender), 0);

        emit NewUser(msg.sender);
    }
    
    function getWateringHole(uint256 wateringHoleID_) public view returns (WateringHole memory wateringHole_) {
        wateringHole_ = _wateringHoles[wateringHoleID_];
    }

    function getNumberOfWateringHoles() public view returns (uint) { return _numberOfWateringHoles; }
    
    function getPost(uint256 wateringHoleID_, uint256 postID_) public view returns (Post memory post_) {
        post_ = _posts[wateringHoleID_][postID_];
    }
    
    function getComment(uint256 postID_, uint256 commentID_) public view returns (Post memory comment_) {
        comment_ = _comments[postID_][commentID_];
    }

    function getUser(address userAddress_) public view returns (User memory){
        return _users[userAddress_];
    }

    function updateName(string calldata name_) public {
        require(_users[address(msg.sender)]._user != _zeroAddress, 'The zero address is not a vaild input.');
        require(_users[address(msg.sender)]._user == address(msg.sender), 'User not found, can not update.');

        _users[address(msg.sender)]._name = name_;
    }

    function updateProfilePhoto(string calldata profilePhotoURL_) public {
        require(_users[address(msg.sender)]._user != _zeroAddress, 'The zero address is not a vaild input.');
        require(_users[address(msg.sender)]._user == address(msg.sender), 'User not found, can not update.');

        _users[address(msg.sender)]._profilePhotoURL = profilePhotoURL_;
    }

    function updateFavoriteTopic(string calldata topic_) public {
        require(_users[address(msg.sender)]._user != _zeroAddress, 'The zero address is not a vaild input.');
        require(_users[address(msg.sender)]._user == address(msg.sender), 'User not found, can not update.');

        _users[address(msg.sender)]._topic = topic_;
    }
    
    function payPost(uint256 wateringHoleID_, uint256 postID_, uint256 amount_) public {
        require(_users[address(msg.sender)]._user == address(msg.sender), 'User not found, can not update.');
        
        _posts[wateringHoleID_][postID_]._numberOfGallonsSupported += amount_;
        Post memory post_ = _posts[wateringHoleID_][postID_];
        
        require(_Watering_Holes_Bond.taxedTransfer((payable(address(msg.sender))), post_._poster, amount_), 'Transfer Failed!');
        _users[post_._poster]._numberOfGallonsSupported += amount_;
    }
    
    function payComment( uint256 postID_, uint256 commentID_, uint256 amount_) public {
        require(_users[address(msg.sender)]._user == address(msg.sender), 'User not found, can not update.');

        _comments[postID_][commentID_]._numberOfGallonsSupported += amount_;
        Post memory comment_ = _comments[postID_][commentID_];
        
        require(_Watering_Holes_Bond.taxedTransfer((payable(address(msg.sender))), comment_._poster, amount_), 'Transfer Failed!');
        _users[comment_._poster]._numberOfGallonsSupported += amount_;
    }
}