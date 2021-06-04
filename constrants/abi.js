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
			}
		],
		"name": "payComment",
		"outputs": [],
		"stateMutability": "payable",
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
		"name": "payPost",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

export const WATERING_HOLES_BOND_ABI = [];