import { WATERING_HOLES_ABI } from '../../constrants/abi';
import { WATERING_HOLES_ADDRESS } from '../../constrants/index';

import { WATERING_HOLES_BOND_ADDRESS } from '../../constrants/index';
import { WATERING_HOLES_BOND_ABI } from '../../constrants/abi';

import { GALLONS_ERC20_ADDRESS } from '../../constrants/index';
import { GALLONS_ERC20_ABI } from '../../constrants/abi';

import { ethers } from 'ethers';

import Card from '../../components/card';

import { useEffect, useState } from 'react';

const Profile = ( { user, posts } ) => {
    const parsedUser = JSON.parse(user);
    const parsedPosts = JSON.parse(posts);

    const [WateringHole, setWateringHole] = useState(false);
    const [WateringHoleBond, setWateringHoleBond] = useState(false);
    const [GallonsERC20, setGallonsERC20] = useState(false);

    useEffect(() => {
        if(window.ethereum) {
            const signer = (new ethers.providers.Web3Provider(window.ethereum));
            setWateringHole(new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , signer));
            setWateringHoleBond(new ethers.Contract( WATERING_HOLES_BOND_ADDRESS , WATERING_HOLES_BOND_ABI , signer));
            setGallonsERC20(new ethers.Contract( GALLONS_ERC20_ADDRESS , GALLONS_ERC20_ABI , signer));
        }
    }, [])

    const [recentActivity, setRecentActivity] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(async() => {
        if(window.ethereum) {
            if(WateringHoleBond) {
                let temp = (await WateringHoleBond.getAmountOwed( parsedUser[1] ));
                setRecentActivity(parseInt(temp._hex, 16)/100);
            }
            if(GallonsERC20) {
                let temp = (await GallonsERC20.balanceOf( parsedUser[1] ));
                setBalance(parseInt(temp._hex, 16)/100);
            }
        }
    }, [WateringHole, WateringHoleBond, GallonsERC20])

    console.log(parsedUser);

    return (
        <div className='flex-col flex items-center py-24'>
            <div className='flex flex-col bg-blue-600 border-4 border-yellow-400 items-center mt-16 shadow-2xl' >
                <img src={parsedUser[3]} height={128} width={128} className='rounded-full border-4 border-yellow-400 -mt-16 shadow-2xl' />
                <div className='font-holocene text-yellow-400 px-6 truncate pt-2' >{parsedUser[2].toUpperCase()}</div>
                <div className='font-holocene text-yellow-400 truncate text-sm w-4/6 -mx-4' >{parsedUser[1]}</div>
                <div className='font-holocene text-yellow-400 px-6' >Recent Activity: {recentActivity} Gals</div>
                <div className='font-holocene text-yellow-400 px-6' >Balance: {balance} Gals</div>
                <div className='font-holocene text-yellow-400 ' >Lifetime Contributions: {parseInt(parsedUser[4].hex, 16)/100} Gals</div>
                <div className='font-holocene text-yellow-400 ' >Favorite Topic: {parsedUser[5]} </div>
                <div className='font-holocene text-yellow-400 pb-2' >Total Number of Posts: {parseInt(parsedUser[6].hex, 16)} </div>
                <div className='font-holocene text-yellow-400 px-6 truncate -mb-16' >
                    <img src={parsedUser[3]} height={128} width={128} className='rounded-full border-4 border-yellow-400 shadow-2xl' />
                </div>
            </div>
            <div className='mt-20 items-center'>
                <div className='text-center text-2xl mb-8 text-blue-600 bg-blue-400 border-4 border-blue-600 rounded shadow-2xl'>Posts</div>
                {
                    parsedPosts.map(({wID, data}) => {
                        return (
                            <div key={Math.random()} className='mb-4'>
                                <Card key={Math.random()} wID={wID} data={data}/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Profile;

export async function getServerSideProps ( { query } ) {
    const serverProvider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/bb89bda1e77844a0bc414756b92a6496');
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , serverProvider);
    const { address } = query;

    const user = await WateringHoles.getUser(address);

    const filter = WateringHoles.filters.NewPost(address);
    const queriedData = await WateringHoles.queryFilter(filter);
    const iface = new ethers.utils.Interface(WATERING_HOLES_ABI);

    let posts = [];
    for(let i = 0; i < queriedData.length; i++) {
        const decodedEvent = iface.decodeEventLog("NewPost", queriedData[i].data);
        posts[posts.length] = { wID: parseInt(decodedEvent._wID._hex, 16), data: await WateringHoles.getPost(parseInt(decodedEvent._wID._hex, 16), parseInt(decodedEvent._pID._hex, 16))};
    }

    return {
      props: { user: JSON.stringify(user), posts: JSON.stringify(posts) },
    } 
}

/*
/profiles/<address>	/profiles/[address].html
/watering-holes/<wid>	/watering-holes/[slug].html
/watering-holes/<wid>/<pid>	/watering-holes/[hole]/[slug].html
*/