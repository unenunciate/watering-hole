import { WATERING_HOLES_ABI } from '../constrants/abi';
import { WATERING_HOLES_ADDRESS } from '../constrants/index';

import Ethers from '../lib/ethers';
import { ethers } from 'ethers';
import { useContext, useState } from 'react';


const VoteDisplayComment = ({ isVisible, setIsVisible, data, postID, alerts, alertsDispatch }) => {
    
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers.getSigner('0x7289Be8F6E14AF0385e1Ce5DB9fcb0d096514F7A'));

    const [galsToTransfer, setGalsToTransfer] = useState(100);

    return (
        isVisible?
            <div className='relative bg-blue-600 border-yellow-400 border rounded text-yellow-400 mb-2'>
                <form className='p-2'>
                    <input dir='rtl' type='number' min='0' placeholder=' Gals' className='mb-1 font-holocene bg-blue-400 mr-4 text-white' value={galsToTransfer} onChange={function(e) {setGalsToTransfer(e.target.value);}}></input>
                    <button type='reset' onClick={() => {
                        setIsVisible(!isVisible);
                        WateringHoles.payComment(postID, parseInt(data.post[0]._hex, 16), galsToTransfer);
                        setGalsToTransfer(100);
                        alertsDispatch({type:'addAlert'});

                    }} className='bg-blue-600 border-yellow-400 border rounded text-yellow-400 p-1'>
                        <svg xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink' viewBox='0 0 550.9 550.9' className='h-4 w-4 fill-current' space='preserve'>
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
            <div>
            </div>
    );
}

export default VoteDisplayComment;