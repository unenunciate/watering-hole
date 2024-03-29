import { useState } from 'react';

import { WATERING_HOLES_ADDRESS } from '../../../constrants/index';
import { WATERING_HOLES_ABI } from '../../../constrants/abi';

import { ethers } from 'ethers';

import AddButton from '../../../components/add-button';
import Comment from '../../../components/comment';
import VoteDisplayPost from '../../../components/vote-display-post';

import Link from 'next/link';

export default function Post( { post, user, comments, alerts, alertsDispatch, whData } )  {
    const parsedPost = JSON.parse(post);
    const parsedUser = JSON.parse(user);
    const parsedWhData = JSON.parse(whData);
    const parsedComments = JSON.parse(comments);

    const parsedGals = parseInt(parsedPost[6].hex, 16)/100;

    const userLink = `/profiles/${parsedUser[1]}`;
    const holeLink = `/watering-holes/${parseInt(parsedWhData[0].hex, 16)}`;

    const [voteVisible, setVoteVisible] = useState(false);

    return (
        <>
            <div className='py-24 flex flex-col'>
                <div className='flex relative justify-center'>
                    <Link href={holeLink}>
                        <div className='cursor-pointer fixed z-30 top-24 w-2/3 px-6 py-4 flex justify-center bg-yellow-400 opacity-75 border-2 rounded-xl border-yellow-600 text-yellow-600'>
                            <h1 className='flex'>{parsedWhData[3]} : {parsedWhData[1]}</h1>
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
                        <VoteDisplayPost isVisible={voteVisible} setIsVisible={setVoteVisible} data={{post: parsedPost, user: parsedUser}} wID={parseInt(parsedWhData[0].hex, 16)} alerts={alerts} alertsDispatch={alertsDispatch} />
                    </div>
                </div>
                <div className='flex flex-col justify-around'>
                {
                    parsedComments.map(function( comment ) {
                        return (
                            <Comment key={Math.random()} data={comment} postID={parseInt(parsedPost[0].hex, 16)} alerts={alerts} alertsDispatch={alertsDispatch} />
                        )
                    })
                }
                </div>
            </div>

            <div className='fixed z-40 right-1 bottom-20'>
                <div className='text-yellow-400'>
                    <AddButton type={3} wID={parseInt(parsedWhData[0].hex, 16)} pID={parseInt(parsedPost[0].hex, 16)} alertsDispatch={alertsDispatch} />
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps ( { query } ) {
    const serverProvider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/bb89bda1e77844a0bc414756b92a6496');
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , serverProvider);
    const { hole, post } = query;

    const postData = await WateringHoles.getPost(parseInt(hole, 10), parseInt(post[0], 10)); 
    const user = await WateringHoles.getUser(postData._poster);
    const whData = await WateringHoles.getWateringHole(parseInt(hole, 10));

    const numberOfCommentsInPost = parseInt(postData._numberOfCommentsInPost); 
    let comments = [];

    for(let i = 1; i <= numberOfCommentsInPost; i++ ) {
        const commentPost = await WateringHoles.getComment(post[0], i);
        const commentUser = await WateringHoles.getUser(commentPost._poster);
        comments.push({ post: commentPost, user: commentUser });
    }

    return {
      props: { wID: parseInt(hole, 10), post: JSON.stringify(postData), user: JSON.stringify(user), comments: JSON.stringify(comments), whData: JSON.stringify(whData) },
    } 
}
