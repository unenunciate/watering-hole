import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';

import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import Ethers from '../lib/ethers';
import { ethers } from 'ethers';
import Link from 'next/link';

const WateringHoleCard = ({ hole }) => {

    const holeLink = `/watering-holes/${parseInt(hole[0]._hex, 16)}/`;

    return(
        <div className='flex relative min-w-24 max-w-lg z-20 bg-blue-600 rounded-lg px-2 shadow-2xl border-yellow-400 border-2 pt-2' >
            <div className='flex flex-col z-20'>
                <div className='flex flex-row justify-between' >
                    <Link href={holeLink}>
                        <div className='pr-4 px-2 cursor-pointer' >
                            <div className="rounded-full bg-blue-400 my-1 p-0.5 ">
                                <img height={24} width={24} src={hole[6]} className="rounded-full"/>
                            </div>
                        </div>
                    </Link>
                    
                    <div className='rounded py-2 w-48 h-6 truncate text-yellow-400 mt-1 bg-blue-400 px-2 font-holocene cursor-pointer'>
                            <p className='-mt-2'> </p>
                    </div>
                </div>
                <Link href={holeLink}>
                    <div className='bg-blue-400 rounded w-64 h-24 cursor-pointer'>
                        <p className='-mt-2 w-64 h-24 break-words overflow-ellipsis text-yellow-400 font-holocene p-2'>{hole[1]}</p>
                    </div>
                </Link>
                <div className='flex flex-row justify-between mt-2'>
                    <div className='rounded mr-2 my-2'>
                        <p className='-mt-2 text-blue-50'>{parseInt(hole[4]._hex, 16)}</p>
                    </div>
                    
                    <div className='ml-2 my-2'>
                        <p className='-mt-2 text-blue-50'>{parseInt(hole[5]._hex, 16)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WateringHoleCard;