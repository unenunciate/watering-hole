import { WATERING_HOLES_ABI } from '../constrants/abi';
import { WATERING_HOLES_ADDRESS } from '../constrants/index';

import { WATERING_HOLES_BOND_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_BOND_ABI } from '../constrants/abi';

import { GALLONS_ERC20_ADDRESS } from '../constrants/index';
import { GALLONS_ERC20_ABI } from '../constrants/abi';

import { ethers } from 'ethers';

import { useState, useEffect } from 'react';

const Support = () => {
    const [WateringHoleBond, setWateringHoleBond] = useState(false);
    
    const [account, setAccount] = useState(false);

    useEffect(() => {
        if(window.ethereum) {
            const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
            setAccount(signer.getAddress());
            setWateringHoleBond(new ethers.Contract( WATERING_HOLES_BOND_ADDRESS , WATERING_HOLES_BOND_ABI , signer));
        }
    }, [])

    const [amount, setAmount] = useState('0');
    const [payableInGallons, setPayableInGallons] = useState(false);
    const [paybackPeriods, setPaybackPeriods] = useState(6);

    const [customPaybackPeriodsVisible, setCustomPaybackPeriodsVisible] = useState(false);

    const processChanges = async () => {
        const overrides = {
            value: ethers.utils.parseEther(amount)
        };
        await WateringHoleBond.expandBondCreditPool(account, payableInGallons, paybackPeriods, overrides);

        setCustomPaybackPeriodsVisible(false);
        setAmount('0');
        setPayableInGallons(false);
        setPaybackPeriods(6);
    }

    return (
        <div className='py-24 flex flex-col items-center'>
            <div className='my-12 text-2xl border-blue-600 text-blue-600 bg-blue-400 border-4 px-8 rounded mb-4'>Support Watering Hole</div>
            <div>
                <form className='flex-col flex bg-blue-600 p-12 border-yellow-400 border-4 rounded'>
                    <div className='mb-4'>   
                        <div>
                            <label htmlFor='payback' className='font-holocene text-yellow-400'>Would you like to set a custom payback periods?  </label>
                            <input type='checkbox' checked={customPaybackPeriodsVisible} className='-mb-0.5' onChange={() => setCustomPaybackPeriodsVisible(!customPaybackPeriodsVisible)}/>
                        </div>
                        <input id='payback' type='number' className={`mb-4 text-yellow-400 font-holocene bg-blue-400 border-yellow-400 border-b-2 ${customPaybackPeriodsVisible? "visible": "hidden"}`} onChange={(e) => {setPaybackPeriods(e.target.value);}}/>
                    </div>
                    <div className='mb-4' >
                        <label htmlFor='payableInGallons' className='font-holocene text-yellow-400'>Would you like to be paid back in Gallons?  </label>
                        <input id='payableInGallons' type='checkbox' checked={payableInGallons} className='-mb-0.5' onChange={() => setPayableInGallons(!payableInGallons)}/>
                    </div>
                    
                    <label htmlFor='amount' className='font-holocene text-yellow-400'>How much ether would you like to send?  </label>
                    <input id='amount' type='text' className={`mb-4 text-yellow-400 font-holocene bg-blue-400 border-yellow-400 border-b-2`} onChange={(e) => {setAmount(e.target.value);}}/>
                    
                    <button type='reset' className='text-yellow-400 font-holocene text-xl bg-blue-400 rounded border-yellow-400 border-2' onClick={() => processChanges()} >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Support;