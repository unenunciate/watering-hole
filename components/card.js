import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';

import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import Ethers from '../lib/ethers';
import { ethers } from 'ethers';

const Card = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(async function () {
        const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers );
        
        setUser(await WateringHoles.getUser('0x7289be8f6e14af0385e1ce5db9fcb0d096514f7a'));
        console.log(user._profilePhotoURL);
        setLoading(false);
    }, [user, setUser, setLoading])

    return(
        !loading ?
        <div className='flex relative min-w-24 max-w-lg z-20 bg-blue-600 rounded-lg px-2 shadow-2xl border-yellow-400 border-2 pt-2' >
            <div className='flex flex-col z-20'>
                <div className='flex flex-row' >
                    <div className='pr-4 px-2' >
                        <div className="rounded-full bg-blue-400 my-1 p-0.5">
                            <img height={24} width={24} src={user._profilePhotoURL} className="rounded-full"/>
                        </div>
                    </div>

                    <div className='rounded py-2'>
                        <Skeleton width={208} height={12} />
                    </div>
                </div>

                <Skeleton width={256} height={64} />

                <div className='flex flex-row justify-between'>
                    <div className='rounded mr-2 my-2'>
                        <Skeleton width={116} height={12} />
                    </div>
                    
                    <div className='ml-2 my-2'>
                        <Skeleton width={116} height={12} />
                    </div>
                </div>
            </div>
        </div>
        :
        <div className='flex relative min-w-24 max-w-lg z-20 bg-blue-600 rounded-lg px-2 shadow-2xl border-yellow-400 border-2 pt-2' >
            <div className='flex flex-col z-20'>
                <div className='flex flex-row' >
                    <div className='pr-4 px-2' >
                        <div className="rounded-full bg-blue-400 my-1 p-0.5">
                            <Skeleton circle={true} height={24} width={24}  />
                        </div>
                    </div>

                    <div className='rounded py-2'>
                        <Skeleton width={208} height={12} />
                    </div>
                </div>

                <Skeleton width={256} height={64} />

                <div className='flex flex-row justify-between'>
                    <div className='rounded mr-2 my-2'>
                        <Skeleton width={116} height={12} />
                    </div>
                    
                    <div className='ml-2 my-2'>
                        <Skeleton width={116} height={12} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;