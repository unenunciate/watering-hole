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

    useEffect(async() => {
        if(window.ethereum) {
            if(WateringHoleBond) {
                let temp = (await WateringHoleBond.getAmountOwed( parsedUser[1] ));
                setRecentActivity(parseInt(temp._hex, 16)/100);
            }
        }
    }, [WateringHole, WateringHoleBond, GallonsERC20])

    return (
        <div className='flex-col flex items-center py-24'>
            <div className='flex flex-col bg-blue-600 border-4 border-yellow-400 items-center mt-16' >
                <img src={parsedUser[3]} height={128} width={128} className='rounded-full border-4 border-yellow-400 -mt-16' />
                <div className='font-holocene text-yellow-400 px-12 truncate' >{parsedUser[1]}</div>
                <div className='font-holocene text-yellow-400 px-12 truncate' >Name: {parsedUser[2]}</div>
                <div className='font-holocene text-yellow-400 px-12' >Recent Activity: {recentActivity} Gals</div>
                <div className='font-holocene text-yellow-400 px-12' >Balance: {parseInt(parsedUser[4].hex, 16)/100} Gals</div>
                <div className='font-holocene text-yellow-400 px-12' >Contributions Received: {parseInt(parsedUser[4].hex, 16)/100} Gals</div>
                <div className='font-holocene text-yellow-400 px-12' >Favorite Topic: {parsedUser[5]} </div>
                <div className='font-holocene text-yellow-400 px-12' >Total Number of Posts: {parseInt(parsedUser[6].hex, 16)} </div>
                <div className='font-holocene text-yellow-400 px-12 truncate -mb-16' >
                    <img src={parsedUser[3]} height={128} width={128} className='rounded-full border-4 border-yellow-400' />
                </div>
            </div>
            <div className='mt-20 items-center'>
                <div className='text-center text-2xl mb-8 text-blue-600 bg-blue-400 border-4 border-blue-600 rounded'>Posts</div>
                {
                    parsedPosts.map(({wID, data}) => {
                        return (
                            <div className='mb-4'>
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

const eventFilter = async (contractAddress, erc20abi, _provider) => {
    const iface = new ethers.utils.Interface(erc20abi);
    const logs = await _provider.getLogs({
        address: contractAddress
    });
    const decodedEvents = logs.map(log => {
        iface.decodeEventLog("NewPost", log.data)
        console.log(log);
    });

    console.log(decodedEvents);
  //  const wIDs = decodedEvents.map(event => event["values"]["_wID"]);
  //  const pIDs = decodedEvents.map(event => event["values"]["_pID"]);
 //   return [wIDs, pIDs];
}

export async function getServerSideProps ( { query } ) {
    const serverProvider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:9545');
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , serverProvider);
    const { address } = query;

    const user = await WateringHoles.getUser(address);

    const temp0 = WateringHoles.filters.NewPost(user[1]);
    const temp = await WateringHoles.queryFilter(temp0);

    const iface = new ethers.utils.Interface(WATERING_HOLES_ABI);
    let posts = [];
    for(let i = 0; i < temp.length; i++) {
        const decodedEvents = iface.decodeEventLog("NewPost", temp[i].data);
        console.log(posts[posts.length]);
        posts[posts.length] = { wID: parseInt(decodedEvents._wID._hex, 16), data: await WateringHoles.getPost(parseInt(decodedEvents._wID._hex, 16), parseInt(decodedEvents._pID._hex, 16))};
        console.log(posts[posts.length]);
    }

    console.log("decode",posts);

    const decoder = new ethers.utils.AbiCoder();
    console.log(eventFilter(WATERING_HOLES_ADDRESS, WATERING_HOLES_ABI, serverProvider));

    return {
      props: { user: JSON.stringify(user), posts: JSON.stringify(posts) },
    } 
}