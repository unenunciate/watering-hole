import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';

import {EtherProvider, useEtherProvider, useAccount} from 'use-ether-provider';

import { GALLONS_ERC20_ADDRESS } from '../../../constrants/index';
import { GALLONS_ERC20_ABI } from '../../../constrants/abi';

import { WATERING_HOLES_BOND_ADDRESS } from '../../../constrants/index';
import { WATERING_HOLES_BOND_ABI } from '../../../constrants/abi';

import { WATERING_HOLES_ADDRESS } from '../../../constrants/index';
import { WATERING_HOLES_ABI } from '../../../constrants/abi';

import { ethers } from 'ethers';

import AddButton from '../../../components/add-button';
import Comment from '../../../components/comment';
import VoteDisplayPost from '../../../components/vote-display-post';

import Link from 'next/link';

export default function Post( { wID, post, user, comments, alerts, alertsDispatch } )  {
    const parsedPost = JSON.parse(post);
    const parsedUser = JSON.parse(user);

    const [whData, setWhData] = useState({});

    const parsedGals = parseInt(parsedPost[6].hex, 16);

    const userLink = `/user/${parsedUser[0]}`;
    const holeLink = `/watering-holes/${wID}`;

    const [WateringHole, setWateringHole] = useState(null);
    const [WateringHoleBond, setWateringHoleBond] = useState(null);
    const [GallonsERC20, setGallonsERC20] = useState(null);

    const etherProvider = useEtherProvider();
    const myAddress = useAccount(etherProvider);

    useEffect(async () => { 
        console.log(ethers.getDefaultProvider());
        if (EtherProvider) {
            setWateringHole(new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI, ethers.getDefaultProvider()));
            setWateringHoleBond(new ethers.Contract( WATERING_HOLES_BOND_ADDRESS , WATERING_HOLES_BOND_ABI, ethers.getDefaultProvider()));
            setGallonsERC20(new ethers.Contract( GALLONS_ERC20_ADDRESS , GALLONS_ERC20_ABI, ethers.getDefaultProvider()));
        }
    }, [])

    useEffect(async () => { 
        console.log("effect 2", wID)
        if (WateringHole) {
            setWhData(await WateringHole.getWateringHole(1));
        }
    }, [WateringHole])

    console.log("top level", WateringHole)

    const [voteVisible, setVoteVisible] = useState(false);

    const parsedComments = JSON.parse(comments);

    return (
        <>
            <div className='py-24 flex flex-col'>
                <div className='flex relative justify-center'>
                    <Link href={holeLink}>
                        <div className='cursor-pointer fixed z-30 top-24 w-2/3 px-6 py-4 flex justify-center bg-yellow-400 opacity-75 border-2 rounded-xl border-yellow-50 text-yellow-50'>
                            <h1 className='flex'>{whData[3]}: {whData[1]}</h1>
                        </div>
                    </Link>
                    <div className='w-2/3 bg-yellow-400 rounded-lg shadow-2xl border-blue-600 border-2 flex flex-col items-center mt-20'>
                        <div className='flex flex-row justify-between' >
                            <Link href={userLink}>
                                <div className='pr-4 px-2 cursor-pointer' >
                                    <div className="rounded-full bg-blue-600 my-1 p-0.5 ">
                                        <img height={24} width={24} src={parsedUser[3]} className="rounded-full"/>
                                    </div>
                                </div>
                            </Link>
                            <Link href={userLink}>
                                <div className='rounded py-2 w-48 h-6 truncate text-yellow-600 mt-1 border border-yellow-600 bg-yellow-400 px-2 font-holocene cursor-pointer'>
                                        <p className='-mt-2 truncate'>{parsedUser[2]}    {parsedUser[1]}</p>
                                </div>
                            </Link>
                        </div>
                        
                        <div className='bg-blue-400 font-holocene text-blue-600 border-blue-600 border w-5/6 break-words rounded mb-2 p-1'>
                            {parsedPost[2]}
                        </div>

                        <div className='flex flex-row font-holocene text-blue-600 justify-between'>
                            <button onClick={() => setVoteVisible(!voteVisible)} className='mr-4 mb-2 cursor-pointer border border-blue-600 rounded'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </button>
                            <div className='font-holocene'>
                                {parsedGals}<span> </span>Gals
                            </div>
                        </div>
                        <VoteDisplayPost isVisible={voteVisible} setIsVisible={setVoteVisible} data={{post: parsedPost, user: parsedUser}} wID={wID} alerts={alerts} alertsDispatch={alertsDispatch} />
                    </div>
                </div>
                <div className='flex flex-col justify-around'>
                {
                    parsedComments.map(function( comment ) {
                        return (
                            <Comment key={comment} data={comment} postID={parseInt(parsedPost[0].hex, 16)} alerts={alerts} alertsDispatch={alertsDispatch} />
                        )
                    })
                }
                </div>
            </div>

            <div className='fixed z-40 right-1 bottom-20'>
                <div className='text-yellow-400'>
                    <AddButton type={0} wID={wID} pID={parseInt(parsedPost[0].hex, 16)} />
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps ( { query } ) {
    const serverProvider = new ethers.providers.JsonRpcProvider('HTTP://192.168.0.151:9545');
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , serverProvider);
    const { hole, slug } = query;
    
    const post = await WateringHoles.getPost(parseInt(hole, 10), parseInt(slug[0], 10)); 
    const user = await WateringHoles.getUser(post._poster);

    const numberOfCommentsInPost = parseInt(post._numberOfCommentsInPost); 
    let comments = [];

    for(let i = 1; i <= numberOfCommentsInPost; i++ ) {
        const commentPost = await WateringHoles.getComment(parseInt(hole, 10), i);
        const commentUser = await WateringHoles.getUser(commentPost._poster);
        comments.push({ post: commentPost, user: commentUser });
    }

    return {
      props: { wID: parseInt(hole, 10), post: JSON.stringify(post), user: JSON.stringify(user), comments: JSON.stringify(comments) },
    } 
}
