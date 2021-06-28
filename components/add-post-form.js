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
    const [majorGroup, setMajorGroup] = useState('');

    useEffect(() => {
        if(window.ethereum) {
            window.ethereum.enable();
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
                        window.ethereum.enable();
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
                        <textarea dir='ltr' type='textarea' placeholder='Post' className='my-2 rounded h-32 border-yellow-600 border mb-1 font-holocene bg-yellow-400 mr-4 text-yellow-600 outline-none' value={post} onChange={(e) => {setPost(e.target.value);}}></textarea>
                        
                        <button type='reset' onClick={async () => {
                            setVisible(false);
                            window.ethereum.enable();
                            const date = new Date();
                            const dateString = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

                            await WateringHole.addPost(wID, post, dateString);

                            setPost('');

                            alertsDispatch({type:'addAlert'});
                        }} className='bg-yellow-400 border-yellow-600 text-yellow-600 border rounded p-1'>
                            Submit
                        </button>
                    </form>
                </div>
            :
            (type === 3)?
                <div className='fixed flex flex-col right-1 bottom-32 z-50 bg-blue-400 from-yellow-600 border-blue-600 border rounded text-yellow-400 mb-2'>
                    <form className='p-2 flex flex-col '>
                        <textarea dir='ltr' type='textarea' placeholder='Post' className='my-2 rounded h-32 border-yellow-600 border mb-1 font-holocene bg-yellow-400 mr-4 text-yellow-600 outline-none' value={post} onChange={(e) => {setPost(e.target.value);}}></textarea>
                        
                        <button type='reset' onClick={async () => {
                            setVisible(false);
                            window.ethereum.enable();
                            const date = new Date();
                            const dateString = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

                            await WateringHole.addComment(wID, pID, post, dateString);

                            setPost('');

                            alertsDispatch({type:'addAlert'});
                        }} className='bg-blue-600 border-blue-400 border rounded p-1'>
                            <svg xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink' viewBox='0 0 550.9 550.9' className='h-4 w-4 text-yellow-400 fill-current' space='preserve'>
                                <path d='M275.15,133.5L275.15,133.5c-102.2,0-185.4,28.8-185.4,63.6l43.5,304.8c0,26.899,63.6,49,142,49c78.4,0,142-22,142-49
                                    l42.8-304.8C460.55,161.7,377.351,133.5,275.15,133.5z M275.15,241.8c-53.9,0-102.2-8-136.5-20.8l42.2,299.9
                                    c-6.7-1.801-12.9-4.301-18.4-6.7l-42.8-301.7c-6.1-3.1-11.6-6.7-15.9-10.4c28.2-22.6,94.2-39.2,170.7-39.2l0,0
                                    c76.5,0,142.6,15.9,170.7,39.2C417.75,225.3,352.25,241.8,275.15,241.8z M469.15,169c-3.101-4.3-6.7-8.6-11-11.6
                                    c-8-6.7-17.7-12.2-28.2-16.5c-19.6-63.1-77.7-108.4-147.5-108.4h-14c-69.8,0-127.9,45.3-147.5,108.3l0,0
                                    c-11,4.9-20.2,9.8-28.2,16.5c-4.3,3.7-8,7.3-11,11.6C90.35,74,169.85,0,267.15,0h16.5C380.45,0.1,459.95,74.2,469.15,169z' />
                            </svg>
                        </button>
                    </form>
                </div>
            :
            <div></div>
    );
}

export default AddForm;