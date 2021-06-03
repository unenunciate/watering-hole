//SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import { Gallons_ERC20 } from "./Gallons_ERC20.sol";
import { Watering_Holes } from "./Watering_Holes.sol";

import "./Ownable.sol";

struct User {
    address payable _user;
}

struct Creditor {
    uint _id;
    address payable _creditor;
    bool _payableInGallons;
    uint256 _creditExtended;
    uint256 _lifetimeCreditExtended;
    uint8 _paybackPeroids;
}

contract Watering_Holes_Bond is Ownable {

    Gallons_ERC20 public _reservoir;
    Watering_Holes public _Watering_Holes;

    Creditor[] public _creditors;
    User[] public _activeUsers;

    mapping(address => uint256) public _owedGallonsInReservoir;

    uint256 private _bondEpochTimestamp;
    uint256 private _bondPeriodTimestamp;
    uint256 private _bondPeriodNouce;
    uint256 private _bondPeriodDuration;
    uint256 private _bondPeriodRandomizedEnd;
    
    uint256 public _totalBondCreditPool;
    
    bool public _isRolloverPeriod;

    address payable _zeroAddress;
    
    constructor(address payable Gallons_ERC20_, address payable Watering_Holes_) {
        _Watering_Holes = Watering_Holes(Watering_Holes_);
        _reservoir = Gallons_ERC20(Gallons_ERC20_);

        _bondEpochTimestamp = block.timestamp;
        _bondPeriodTimestamp = _bondEpochTimestamp;
        _bondPeriodDuration = 2629746;
    }

    modifier watched {
        if(_bondPeriodRandomizedEnd < block.timestamp) {
            reinitializeBondingPeriod();
        }
        _;
    }

    event noPaymentBondingPeroid(uint256 bondingPeriod_);
    event dispersementToActiveUsers(uint16 percentageDispersed_);
    event airdropToActiveUsers(uint16 amountDispersed_, string message_);
    event dispersementToAllUsers(uint256 gallonsEach_);
    event newUnencumberedBondingPeroid(uint256 bondingPeriod_);
    event newEncumberedBondingPeroid(uint256 bondingPeriod_);

    function addCreditor(address payable creditor_, bool payableInGallons_, uint creditExtended_, uint8 paybackPeriods_) public watched returns(bool result) {
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

    function updateBond(address payable user_, uint amount_) public watched {
        require(msg.sender == address(_Watering_Holes), "Required to be the owning Watering_Holes contract to update bond.");
        
        _owedGallonsInReservoir[user_] += amount_;

        bool found = false;
        for(uint i = 0; i < _activeUsers.length - 1; i++) {
            if(_activeUsers[i]._user == user_) {
                found = true;
            }
        }

        if(!found) {
            _activeUsers.push(User(user_));
        }
    }

    function updateBond(address payable user_) public watched {
        require(msg.sender == address(_Watering_Holes), "Required to be the owning Watering_Holes contract to update bond.");

        bool found = false;
        for(uint i = 0; i < _activeUsers.length - 1; i++) {
            if(_activeUsers[i]._user == user_) {
                found = true;
            }
        }

        if(!found) {
            _activeUsers.push(User(user_));
        }
    }

    function disperse(uint16 _percentageToDisperse) internal {
        require(_percentageToDisperse <= 1000, "Can not disperse more than 100% owed.");
        
        if(_percentageToDisperse == 0) {
            emit noPaymentBondingPeroid(_bondPeriodTimestamp);
        } else if(_percentageToDisperse < 1000) {
            
            for(uint i = 0; i < _activeUsers.length - 1; i++) {
                uint amountOwed = _owedGallonsInReservoir[_activeUsers[i]._user];
                
                uint amountToPay = (amountOwed * 1000) / _percentageToDisperse;
                
                _reservoir.transferFrom(payable(address(_Watering_Holes)), address(_activeUsers[i]._user), uint(amountToPay));
                
                _owedGallonsInReservoir[_activeUsers[i]._user] = amountOwed - amountToPay;
            }
            
            emit dispersementToActiveUsers(_percentageToDisperse);
        } else {
            for(uint i = 0; i < _activeUsers.length - 1; i++) {
                
                uint amountToPay = _owedGallonsInReservoir[_activeUsers[i]._user];
                
                _reservoir.transferFrom(payable(address(_Watering_Holes)), address(_activeUsers[i]._user), uint(amountToPay));
                
                _owedGallonsInReservoir[_activeUsers[i]._user] = 0;
            }
            
            emit dispersementToActiveUsers(1000);
        }
    }

    function reinitializeBondingPeriod() internal {
        reinitializeRandomizedEnd();
        payBondPeriodDebtPayments();

        uint gallonsOwed_;
        for(uint i = 0; i < _activeUsers.length - 1; i++) {
            gallonsOwed_ += _owedGallonsInReservoir[_activeUsers[i]._user];
        }

        if(_reservoir.balanceOf(address(this)) < gallonsOwed_) {
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

    function reinitializeRandomizedEnd() internal {
        _bondPeriodTimestamp = block.timestamp;
        _bondPeriodNouce = (_bondPeriodTimestamp + uint(12304949) / uint(1000000)) / uint(13);
        _bondPeriodRandomizedEnd = _bondPeriodDuration + _bondPeriodNouce + _bondPeriodTimestamp;
    }
    
    function expandBondCreditPool(address payable creditor_, bool payableInGallons_, uint8 paybackPeroids_) payable public {
        _totalBondCreditPool += msg.value;

        payable(address(_Watering_Holes)).transfer(msg.value);
        
        uint count;
        for(uint i = 0; i < _creditors.length - 1; i++ ) {
            if(_creditors[i]._creditor == creditor_) {
                count = i;
                break;
            }
        }

        if(count == 0) {
            addCreditor(creditor_, payableInGallons_, msg.value, paybackPeroids_);
        } else {
            _creditors[count]._paybackPeroids += paybackPeroids_;
            _creditors[count]._payableInGallons = payableInGallons_;
            _creditors[count]._creditExtended += msg.value;
            _creditors[count]._lifetimeCreditExtended += msg.value;
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
            liquidateResevoir(weiDispersmentRequested_ - address(this).balance);
        }

        if(address(this).balance < gallonsDispersmentRequested_) {
            uint count;
            for(uint i = 0; i < creditorsPaidInGallons_.length - 1; i++) {
                uint debtPaymentInWei_ = creditorsPaidInGallons_[i]._creditExtended / creditorsPaidInGallons_[i]._paybackPeroids;
                uint debtPayment_ = convertToGallonsFromWei(debtPaymentInWei_);

                if(_reservoir.balanceOf((payable(address(_Watering_Holes)))) < debtPayment_) {
                    count = i;
                    break;
                }

                _reservoir.transferFrom(payable(address(_Watering_Holes)), creditorsPaidInGallons_[i]._creditor, debtPayment_);
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

                _reservoir.transferFrom(payable(address(_Watering_Holes)), creditorsPaidInGallons_[i]._creditor, debtPayment_);

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
    }
    
    function withdrawFromCreditPool(address payable depositAddress_, uint amountRequested_) public onlyOwner {
        require(amountRequested_ <= _totalBondCreditPool);
        depositAddress_.transfer(amountRequested_);
        _totalBondCreditPool -= amountRequested_;
    }

    function airdrop(uint16 amountToDisperse_, string memory message_) public onlyOwner {
        require(amountToDisperse_ > 0, "Can not disperse 0 gallons.");
       
        for(uint i = 0; i < _activeUsers.length - 1; i++) {
            _reservoir.transferFrom(payable(address(_Watering_Holes)), address(_activeUsers[i]._user), uint(amountToDisperse_));
        }
            
        emit airdropToActiveUsers(amountToDisperse_, message_);
    }

    function calculateDisperalPercentage(uint gallonsOwed_) internal view returns (uint16 result) {
        result = uint16((_reservoir.balanceOf(address(this)) * uint(1000)) / gallonsOwed_);
    }
    
    function liquidateResevoir(uint256 amount) internal returns (bool result) {
        
    }


    function convertToGallonsFromWei(uint convertToGallons_) internal pure returns (uint results) {
        return convertToGallons_;
    }
    
    function taxedTransfer(address payable sender, address payable recipient, uint amount) public {
        uint tax = amount / uint(2);
        tax == 0 ? tax = 1 : tax = tax;
        uint amountAfterTax = amount - tax;
        
        _reservoir.transferFrom(sender, recipient, amountAfterTax);
        _reservoir.transferFrom(sender, payable(address(_Watering_Holes)), tax);
    }

    /**
        Testnet Only
    */
    function requestPayment(address payable recipent, uint amount) public {
        require(address(_Watering_Holes) == msg.sender, "Must be Watering Holes contract to request payment.");
        _reservoir.transferFrom(address(this), recipent, amount);
    }
}