import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';

import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import Ethers from '../lib/ethers';
import { ethers } from 'ethers';
import Link from 'next/link';

const Card = ({ wateringHoleID, postID }) => {

    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const [postGals, setPostGals] = useState(0);
    const [postContent, setPostContent] = useState('');
    const [userLink, setUserLink] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(async function () {
        const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers );
        
        //setPost(await WateringHoles.getPost(wateringHoleID, postID));
        setPost(await WateringHoles.getPost(1, 1));
        //setUser(await WateringHoles.getUser(post._poster));
        setUser(await WateringHoles.getUser('0x7289be8f6e14af0385e1ce5db9fcb0d096514f7a'));

        setUserLink(`/user/${user._user}`);
        setPostGals(parseInt(post._numberOfGallonsSupported));

        let temp = post._content + '';
        temp.length > 144 ? setPostContent(temp.slice(0, 141)+ '...') : setPostContent(post._content);
        
        setLoading(false);
    }, [user, post, postID, setUser, setUserLink, setLoading, setPostGals, setPostContent])

    return(
        !loading ?
        <div className='flex relative min-w-24 max-w-lg z-20 bg-blue-600 rounded-lg px-2 shadow-2xl border-yellow-400 border-2 pt-2' >
            <div className='flex flex-col z-20'>
                <div className='flex flex-row justify-between' >
                    <div className='pr-4 px-2' >
                        <div className="rounded-full bg-blue-400 my-1 p-0.5">
                            <img height={24} width={24} src={user._profilePhotoURL} className="rounded-full"/>
                        </div>
                    </div>
                    <Link href={userLink}>
                        <div className='rounded py-2 w-48 h-6 truncate text-yellow-400 mt-1 bg-blue-400 px-2 font-holocene'>
                                <p className='-mt-2 truncate'>{user._name} {user._user}</p>
                        </div>
                    </Link>
                </div>

                <div className='bg-blue-400 rounded w-64 h-24'>
                   <p className='-mt-2 w-64 h-24 break-words overflow-ellipsis text-yellow-400 font-holocene p-2'>{postContent}</p>
                </div>

                <div className='flex flex-row justify-between'>
                    <div className='rounded mr-2 my-2'>
                        <p className='-mt-2 text-blue-50'>{post._date}</p>
                    </div>
                    
                    <div className='ml-2 my-2'>
                        <p className='-mt-2 text-blue-50'>{postGals} gals</p>
                    </div>
                </div>
            </div>
        </div>
        :
        <div className='flex relative min-w-24 max-w-lg z-20 bg-blue-600 rounded-lg px-2 shadow-2xl border-yellow-400 border-2 pt-2' >
            <div className='flex flex-col z-20'>
                <div className='flex flex-row justify-between' >
                    <div className='pr-4 px-2' >   
                        <Skeleton circle={true} height={25} width={25}  />
                    </div>

                    <div className='rounded mb-2'>
                        <Skeleton width={192} height={22} />
                    </div>
                </div>

                <Skeleton width={256} height={94} />

                <div className='flex flex-row justify-between'>
                    <div className='rounded mr-2 my-2'>
                        <Skeleton width={116} height={22} />
                    </div>
                    
                    <div className='ml-2 my-2'>
                        <Skeleton width={116} height={22} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;