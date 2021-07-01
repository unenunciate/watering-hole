import { WATERING_HOLES_ABI } from '../constrants/abi';
import { WATERING_HOLES_ADDRESS } from '../constrants/index';

import { WATERING_HOLES_BOND_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_BOND_ABI } from '../constrants/abi';

import { GALLONS_ERC20_ADDRESS } from '../constrants/index';
import { GALLONS_ERC20_ABI } from '../constrants/abi';

import { ethers } from 'ethers';

import { useState, useEffect } from 'react';


const AddForm = ({ setVisible, wID, pID, type, alertsDispatch }) => {
    
    const [WateringHole, setWateringHole] = useState({});

    const [photoURL, setPhotoURL] = useState('');

    const [post, setPost] = useState('');

    const [localGroup, setLocalGroup] = useState('');
    const [majorGroup, setMajorGroup] = useState('Science');

    useEffect(async () => {
        if(window.ethereum) {
            await window.ethereum.send('eth_requestAccounts');
            setWateringHole(new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , (new ethers.providers.Web3Provider(window.ethereum)).getSigner()));
        }
    }, [])

    return (
        (type === 1)?
            <div className='fixed flex flex-col right-1 bottom-32 z-50 bg-blue-400 from-yellow-600 border-blue-600 border rounded text-yellow-400 mb-2'>
                <form className='p-2 flex flex-col '>
                    <input dir='ltr' type='text' min='0' placeholder='Watering Hole Name' className='my-2 rounded border-yellow-600 border mb-1 font-holocene bg-yellow-400 mr-4 text-yellow-600 outline-none' value={localGroup} onChange={(e) => {setLocalGroup(e.target.value);}}></input>
                    <input dir='ltr' type='text' min='0' placeholder='Watering Hole Photo URL' className='my-2 rounded border-yellow-600 border mb-1 font-holocene bg-yellow-400 mr-4 text-yellow-600 outline-none' value={photoURL} onChange={(e) => {setPhotoURL(e.target.value);}}></input>
                    <select name='topic' id='topic-select' value={majorGroup} className='my-2 rounded border-yellow-600 border mb-1 font-holocene bg-yellow-400 mr-4 text-yellow-600 outline-none' onChange={(e) => {setMajorGroup(e.target.value);}}>
                        <option value='Science'>Science</option>
                        <option value='Technology'>Technology</option>
                        <option value='Culture'>Culture</option>
                        <option value='Music'>Music</option>
                        <option value='Film'>Film</option>
                        <option value='Television'>Television</option>
                        <option value='Art'>Art</option>
                        <option value='Books'>Books</option>
                    </select>
                    <button type='reset' onClick={async () => {
                        setVisible(false);
                        await window.ethereum.send('eth_requestAccounts');
                        await WateringHole.addWateringHole(localGroup, '', majorGroup, photoURL);

                        setPhotoURL('');
                        setMajorGroup('');
                        setLocalGroup('');

                        alertsDispatch({type:'addAlert'});
                    }} className='bg-blue-600 border-blue-400 border rounded p-1'>
                       Submit
                    </button>
                </form>
            </div>
            :
            (type === 2)?
                <div className='fixed flex flex-col right-1 bottom-32 z-50 bg-blue-400 from-yellow-600 border-blue-600 border rounded text-yellow-400 mb-2'>
                    <form className='p-2 flex flex-col '>
                        <textarea dir='ltr' type='textarea' placeholder='Post' className='my-2 rounded h-32 border-yellow-600 border mb-1 font-holocene bg-yellow-400 mx-4 text-yellow-600 outline-none' value={post} onChange={(e) => {setPost(e.target.value);}}></textarea>
                        
                        <button type='reset' onClick={async () => {
                            setVisible(false);
                            await window.ethereum.send('eth_requestAccounts');
                            const date = new Date();
                            const dateString = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

                            await WateringHole.addPost(wID, post, dateString);

                            setPost('');

                            alertsDispatch({type:'addAlert'});
                        }} className='bg-yellow-400 border-yellow-600 text-yellow-600 border rounded p-1 mx-4'>
                            Submit
                        </button>
                    </form>
                </div>
            :
            (type === 3)?
                <div className='fixed flex flex-col right-1 bottom-32 z-50 bg-blue-400 from-yellow-600 border-blue-600 border rounded text-yellow-400 mb-2'>
                    <form className='p-2 flex flex-col '>
                        <textarea dir='ltr' type='textarea' placeholder='Post' className='my-2 rounded h-32 border-yellow-600 border mb-1 font-holocene bg-yellow-400 mx-4 text-yellow-600 outline-none' value={post} onChange={(e) => {setPost(e.target.value);}}></textarea>
                        
                        <button type='reset' onClick={async () => {
                            setVisible(false);
                            await window.ethereum.send('eth_requestAccounts');
                            const date = new Date();
                            const dateString = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

                            await WateringHole.addComment(wID, pID, post, dateString);

                            setPost('');

                            alertsDispatch({type:'addAlert'});
                        }} className='bg-yellow-400 border-yellow-600 text-yellow-600 border rounded p-1 mx-4'>
                            Submit
                        </button>
                    </form>
                </div>
            :
            <div></div>
    );
}

export default AddForm;