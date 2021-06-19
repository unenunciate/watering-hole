import { useState } from 'react';

import VoteDisplayComment from './vote-display-comment';

import Link from 'next/link';

const Comment = ({ data, postID, alerts, alertsDispatch }) => {
    const parsedGals = parseInt(data.post[6].hex, 16);
    const userLink = `/user/${data.user[1]}`;

    const [voteVisible, setVoteVisible] = useState(false);

    return (
        <div className='flex justify-center mt-6'>
            <div className='flex w-2/3 bg-blue-400 rounded-lg shadow-2xl border-yellow-400 border-2 flex-col items-center mb-4'>
                <div className='flex flex-row justify-between' >
                    <Link href={userLink}>
                        <div className='pr-4 px-2 cursor-pointer' >
                            <div className="rounded-full bg-yellow-400 my-1 p-0.5 ">
                                <img height={24} width={24} src={data.user[3]} className="rounded-full"/>
                            </div>
                        </div>
                    </Link>
                    <Link href={userLink}>
                        <div className='rounded py-2 w-48 h-6 truncate text-blue-600 border-blue-600 border mt-1 bg-blue-400 px-2 font-holocene cursor-pointer'>
                                <p className='-mt-2 truncate'>{data.user[2]}    {data.user[1]}</p>
                        </div>
                    </Link>
                </div>
                <div className='bg-yellow-400 font-holocene text-yellow-600 border border-yellow-600 w-5/6 break-words rounded mb-2 p-1'>
                    {data.post[2]}
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
                <VoteDisplayComment isVisible={voteVisible} setIsVisible={setVoteVisible} data={data} postID={postID} alerts={alerts} alertsDispatch={alertsDispatch} />
            </div>
        </div>
    );
}

export default Comment;