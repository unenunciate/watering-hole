import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';

import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import Ethers from '../lib/ethers';
import { ethers } from 'ethers';
import Link from 'next/link';

const Card = ({ wID, data }) => {
    const [user, setUser] = useState({});
    const [userLink, setUserLink] = useState('');

    const [postLink, setPostLink] = useState('');
    const [postGals, setPostGals] = useState(0);

    useEffect(async () => {
        const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers );

        setUser(await WateringHoles.getUser(data[1]));
        setPostGals(parseInt(data[6].hex, 16));

        setUserLink(`/profile/${data[1]}`);
        setPostLink(`/watering-holes/${wID}/${parseInt(data[0].hex)}`);
    }, [user, setUser, setPostGals, setUserLink, setPostLink]);

    return(
        <div className='flex relative min-w-24 max-w-lg z-20 bg-blue-600 rounded-lg px-2 shadow-2xl border-yellow-400 border-2 pt-2' >
            <div className='flex flex-col z-20'>
                <div className='flex flex-row justify-between' >
                    <Link href={userLink}>
                        <div className='pr-4 px-2 cursor-pointer' >
                            <div className="rounded-full bg-blue-400 my-1 p-0.5 ">
                                <img height={24} width={24} src={user[3]} className="rounded-full"/>
                            </div>
                        </div>
                    </Link>
                    <Link href={userLink}>
                        <div className='rounded py-2 w-48 h-6 truncate text-yellow-400 mt-1 bg-blue-400 px-2 font-holocene cursor-pointer'>
                                <p className='-mt-2 truncate'>{user[2]} {user[1]}</p>
                        </div>
                    </Link>
                </div>
                <Link href={postLink}>
                    <div className='bg-blue-400 rounded w-64 h-24 cursor-pointer'>
                        <p className='-mt-2 w-64 h-24 break-words overflow-ellipsis text-yellow-400 font-holocene p-2'>{data[2]}</p>
                    </div>
                </Link>
                <div className='flex flex-row justify-between mt-2'>
                    <div className='rounded mr-2 my-2'>
                        <p className='-mt-2 text-blue-50'>{parseInt(data[4].hex, 16)}</p>
                    </div>
                    
                    <div className='ml-2 my-2'>
                        <p className='-mt-2 text-blue-50'>{postGals} gals</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;