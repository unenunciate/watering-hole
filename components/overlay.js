import Link from 'next/link';

import { WATERING_HOLES_ABI } from '../constrants/abi';
import { WATERING_HOLES_ADDRESS } from '../constrants/index';

import { DAPP_ADDRESS } from '../constrants/index';

import { useState, useEffect } from 'react';

import { ethers } from 'ethers';    

const Overlay = ({ overlayVisible, setOverlayVisible }) => {

    const [WateringHole, setWateringHole] = useState({});

    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [majorGroup, setMajorGroup] = useState('');

    useEffect(() => {
        if(window.ethereum) {
            window.ethereum.enable();
            setWateringHole(new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , (new ethers.providers.Web3Provider(window.ethereum)).getSigner()));
        }
    }, []);

    return (
        overlayVisible ?
            <div className='min-w-full z-50 fixed mt-20 '>
                <div className='flex flex-row text-yellow-400 shadow-2xl rounded-xl min-w-full border-yellow-400 border-b-2 bg-blue-600'>
                    <div className='flex flex-col w-full border-r-2 border-yellow-400'>
                        <form className='pt-6 flex flex-col mx-24'>
                            <input type='text' placeholder='Name' className='my-2 font-holocene bg-blue-600 placeholder-yellow-400 border-b-2 border-yellow-400 outline-none' value={name} onChange={(e) => {setName(e.target.value);}}></input>
                            <input type='text' placeholder='Photo URL' className='my-2 font-holocene bg-blue-600 placeholder-yellow-400 border-b-2 border-yellow-400  outline-none' value={photoURL} onChange={(e) => {setPhotoURL(e.target.value);}}></input>
                            <select name='topic' id='topic-select' className='my-2 font-holocene bg-blue-600 placeholder-yellow-400 border-b-2 border-yellow-400  outline-none' onChange={(e) => {setMajorGroup(e.target.value);}}>
                                <option value='Science'>Science</option>
                                <option value='Technology'>Technology</option>
                                <option value='Culture'>Culture</option>
                                <option value='Music'>Music</option>
                                <option value='Film'>Film</option>
                                <option value='Television'>Television</option>
                                <option value='Art'>Art</option>
                                <option value='Books'>Books</option>
                            </select>
                            <button type='reset' className='bg-yellow-400 rounded border-yellow-600 border my-2 text-yellow-600'
                                onClick={async () => {
                                    await WateringHole.addUser(name, photoURL, majorGroup);
                                    setOverlayVisible(!overlayVisible);
                                }}> Submit </button>
                        </form>
                    </div>
                </div>
            </div> 
        :
            null
    );

}

export default Overlay;
