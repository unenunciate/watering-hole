import { WATERING_HOLES_ADDRESS } from '../../constrants/index';
import { WATERING_HOLES_ABI } from '../../constrants/abi';

import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const Profile = ( { user } ) => {
    const parsedUser = JSON.parse(user);

    const [WateringHoles, setWateringHoles] = useState({});

    useEffect(() => {
        setWateringHoles(new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , (new ethers.providers.Web3Provider(window.ethereum)).getSigner()));
    }, []);

    useEffect(() => {

    }, [])

    return (
        <div className='flex-col flex items-center py-24'>
            <div className='flex flex-col bg-blue-600 border-4 border-yellow-400 items-center mt-16' >
                <img src={parsedUser[3]} height={128} width={128} className='rounded-full border-4 border-yellow-400 -mt-16' />
                <div className='font-holocene text-yellow-400 px-12 truncate' >{parsedUser[1]}</div>
                <div className='font-holocene text-yellow-400 px-12 truncate' >Name: {parsedUser[2]}</div>
                <div className='font-holocene text-yellow-400 px-12' >Recent Activity: {parseInt(parsedUser[4].hex, 16)} Gals</div>
                <div className='font-holocene text-yellow-400 px-12' >Balance: {parseInt(parsedUser[4].hex, 16)/100} Gals</div>
                <div className='font-holocene text-yellow-400 px-12' >Contributions Received: {parseInt(parsedUser[4].hex, 16)/100} Gals</div>
                <div className='font-holocene text-yellow-400 px-12' >Favorite Topic: {parsedUser[5]} </div>
                <div className='font-holocene text-yellow-400 px-12' >Total Number of Posts: {parseInt(parsedUser[6].hex, 16)} </div>
                <div className='font-holocene text-yellow-400 px-12 truncate -mb-16' >
                    <img src={parsedUser[3]} height={128} width={128} className='rounded-full border-4 border-yellow-400' />
                </div>
            </div>
        </div>
    );
}

export default Profile;

export async function getServerSideProps ( { query } ) {
    const serverProvider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:9545');
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , serverProvider);
    const { address } = query;

    const user = await WateringHoles.getUser(address);

    return {
      props: { user: JSON.stringify(user) },
    } 
}