import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';

import { WATERING_HOLES_ADDRESS } from '../../constrants/index';
import { WATERING_HOLES_ABI } from '../../constrants/abi';

import Ethers from '../../lib/ethers';
import { ethers } from 'ethers';

import Comment from '../../components/comment';
import VoteDisplayPost from '../../components/vote-display-post';

import Link from 'next/link';

export default function Post( { wateringHoleID, post, user, comments, alerts, alertsDispatch } )  {
    const parsedPost = JSON.parse(post);
    const parsedUser = JSON.parse(user);
    const parsedGals = parseInt(parsedPost[6]._hex, 16);
    const userLink = `/user/${parsedUser[1]}`;

    console.log("Number of gals supported", parsedPost[6])

    const [voteVisible, setVoteVisible] = useState(false);

    const parsedComments = JSON.parse(comments);

    return (
        <div className='py-24 flex flex-col'>
            <div className='flex relative justify-center'>
                <div className='w-2/3 bg-blue-600 rounded-lg shadow-2xl border-yellow-400 border-2 flex flex-col items-center mb-8'>
                    <div className='flex flex-row justify-between' >
                        <Link href={userLink}>
                            <div className='pr-4 px-2 cursor-pointer' >
                                <div className="rounded-full bg-blue-400 my-1 p-0.5 ">
                                    <img height={24} width={24} src={parsedUser[3]} className="rounded-full"/>
                                </div>
                            </div>
                        </Link>
                        <Link href={userLink}>
                            <div className='rounded py-2 w-48 h-6 truncate text-yellow-400 mt-1 bg-blue-400 px-2 font-holocene cursor-pointer'>
                                    <p className='-mt-2 truncate'>{parsedUser[2]}    {parsedUser[1]}</p>
                            </div>
                        </Link>
                    </div>
                    <div className='bg-blue-400 font-holocene text-yellow-400 w-5/6 break-words rounded mb-2 p-1'>
                        {parsedPost[2]}
                    </div>
                    <div className='flex flex-row font-holocene text-yellow-400 justify-between'>
                        <button onClick={() => setVoteVisible(!voteVisible)} className='mr-4 mb-2 cursor-pointer border border-yellow-400 rounded'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                        <div className='font-holocene'>
                            {parsedGals}<span> </span>Gals
                        </div>
                    </div>
                    <VoteDisplayPost isVisible={voteVisible} setIsVisible={setVoteVisible} data={{post: parsedPost, user: parsedUser}} wateringHoleID={wateringHoleID} alerts={alerts} alertsDispatch={alertsDispatch} />
                </div>
            </div>
            <div className='flex flex-col justify-around'>
            {
                parsedComments.map(function( comment ) {
                    return (
                        <Comment data={comment} postID={parseInt(parsedPost[0]._hex, 16)} alerts={alerts} alertsDispatch={alertsDispatch} />
                    )
                })
            }
            </div>
        </div>
    )
}


export async function getServerSideProps ( { query } ) {
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers );
    const { slug } = query;

    const post = await WateringHoles.getPost(parseInt(slug[0], 10), parseInt(slug[1], 10)); 
    const user = await WateringHoles.getUser(post._poster);

    const numberOfCommentsInPost = parseInt(post._numberOfCommentsInPost); 
    let comments = [];

    for(let i = 1; i <= numberOfCommentsInPost; i++ ) {
        const commentPost = await WateringHoles.getComment(parseInt(slug[1], 10), i);
        const commentUser = await WateringHoles.getUser(commentPost._poster)
        comments.push({ post: commentPost, user: commentUser });
    }

    return {
      props: { wateringHoleID: parseInt(slug[0], 10), post: JSON.stringify(post), user: JSON.stringify(user), comments: JSON.stringify(comments) },
    } 
}
