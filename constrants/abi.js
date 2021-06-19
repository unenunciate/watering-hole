export const WATERING_HOLES_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "Watering_Holes_Bond_",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "_Watering_Holes_Bond",
		"outputs": [
			{
				"internalType": "contract Watering_Holes_Bond",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_comments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_poster",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numberOfCommentsInPost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numberOfGallonsSupported",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_posts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_poster",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numberOfCommentsInPost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numberOfGallonsSupported",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "_users",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_profilePhotoURL",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_numberOfGallonsSupported",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_wateringHoles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_localGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_majorGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_superiorGroup",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_lastPostBlockTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numberOfPostsInHole",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_pictureURL",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "wateringHoleID_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "postID_",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "content_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date_",
				"type": "string"
			}
		],
		"name": "addComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "wateringHoleID_",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "content_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date_",
				"type": "string"
			}
		],
		"name": "addPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "profilePhotoURL_",
				"type": "string"
			}
		],
		"name": "addUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "localGroup_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "majorGroup_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "superiorGroup_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pictureURL_",
				"type": "string"
			}
		],
		"name": "addWateringHole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "postID_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "commentID_",
				"type": "uint256"
			}
		],
		"name": "getComment",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "_poster",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_content",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_date",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_numberOfCommentsInPost",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_numberOfGallonsSupported",
						"type": "uint256"
					}
				],
				"internalType": "struct Watering_Holes.Post",
				"name": "comment_",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfWateringHoles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "wateringHoleID_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "postID_",
				"type": "uint256"
			}
		],
		"name": "getPost",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "_poster",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_content",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_date",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_numberOfCommentsInPost",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_numberOfGallonsSupported",
						"type": "uint256"
					}
				],
				"internalType": "struct Watering_Holes.Post",
				"name": "post_",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress_",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "_user",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_profilePhotoURL",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_numberOfGallonsSupported",
						"type": "uint256"
					}
				],
				"internalType": "struct Watering_Holes.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "wateringHoleID_",
				"type": "uint256"
			}
		],
		"name": "getWateringHole",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "_localGroup",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_majorGroup",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_superiorGroup",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_lastPostBlockTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_numberOfPostsInHole",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "_pictureURL",
						"type": "string"
					}
				],
				"internalType": "struct Watering_Holes.WateringHole",
				"name": "wateringHole_",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "postID_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "commentID_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			}
		],
		"name": "payComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "wateringHoleID_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "postID_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			}
		],
		"name": "payPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			}
		],
		"name": "updateName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "profilePhotoURL_",
				"type": "string"
			}
		],
		"name": "updateProfilePhoto",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
/**************************************************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 ***************************************************************************************/

export const GALLONS_ERC20_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

/**************************************************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 ***************************************************************************************/

 export const WATERING_HOLES_BOND_ABI = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "Gallons_ERC20_",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "amountDispersed_",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message_",
				"type": "string"
			}
		],
		"name": "airdropToActiveUsers",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "percentageDispersed_",
				"type": "uint16"
			}
		],
		"name": "dispersementToActiveUsers",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gallonsEach_",
				"type": "uint256"
			}
		],
		"name": "dispersementToAllUsers",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondingPeriod_",
				"type": "uint256"
			}
		],
		"name": "newEncumberedBondingPeroid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondingPeriod_",
				"type": "uint256"
			}
		],
		"name": "newUnencumberedBondingPeroid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bondingPeriod_",
				"type": "uint256"
			}
		],
		"name": "noPaymentBondingPeroid",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_Watering_Holes",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_activeUsers",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "_user",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_creditors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_creditor",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_payableInGallons",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "_creditExtended",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_lifetimeCreditExtended",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_paybackPeroids",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_isRolloverPeriod",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "_owedGallonsInReservoir",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_reservoir",
		"outputs": [
			{
				"internalType": "contract Gallons_ERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_totalBondCreditPool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "creditor_",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "payableInGallons_",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "creditExtended_",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "paybackPeriods_",
				"type": "uint8"
			}
		],
		"name": "addCreditor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "amountToDisperse_",
				"type": "uint16"
			},
			{
				"internalType": "string",
				"name": "message_",
				"type": "string"
			}
		],
		"name": "airdrop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "creditor_",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "payableInGallons_",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "paybackPeroids_",
				"type": "uint8"
			}
		],
		"name": "expandBondCreditPool",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "recipent",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "requestPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "Watering_Holes_",
				"type": "address"
			}
		],
		"name": "setWateringHoles",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "sender_",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "recipient_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			}
		],
		"name": "taxedTransfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "user_",
				"type": "address"
			}
		],
		"name": "updateBond",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "user_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			}
		],
		"name": "updateBond",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "depositAddress_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountRequested_",
				"type": "uint256"
			}
		],
		"name": "withdrawFromCreditPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]