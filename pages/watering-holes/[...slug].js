import { WATERING_HOLES_ADDRESS } from '../../constrants/index';
import { WATERING_HOLES_ABI } from '../../constrants/abi';

import { ethers } from 'ethers';

import Card from '../../components/card';
import AddButton from '../../components/add-button';

export default function WateringHole( { pageContent, whData } )  {
    const content = JSON.parse(pageContent);
    const wateringHoleData = JSON.parse(whData);

    return (
        <>
            <div className='relative flex flex-col sm:flex-wrap sm:flex-row max-w-full justify-around items-center py-24 mb-2 mx-4 z-10'>
                <div className='fixed z-30 top-24 w-2/3 px-6 py-4 flex justify-center bg-yellow-400 opacity-75 border-2 rounded-xl border-yellow-600 text-yellow-600'>
                    <h1 className='flex'>{wateringHoleData[3]} : {wateringHoleData[1]}</h1>
                </div>

                <div className='mt-20'>
                    {
                        content.map((item) => {
                            return <Card wID={parseInt(wateringHoleData[0].hex, 16)} pID={item[1]} data={item} />
                        })
                    }
                </div>
            </div>

            <div className='fixed z-40 right-1 bottom-20'>
                <div className='text-yellow-400'>
                    <AddButton type={1} wID={parseInt(wateringHoleData[0].hex, 16)}/>
                </div>
            </div>
        </>
    );
}


export async function getServerSideProps ( { query } ) {
    const serverProvider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:9545');
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , serverProvider);
    const { slug } = query;

    const wateringHole = await WateringHoles.getWateringHole(slug[0]);

    let posts = [];

    for(let i = 1; i <= parseInt(wateringHole[5], 16); i++ ) {
        posts.push(await WateringHoles.getPost( slug[0], i ));
    }

    return {
      props: { pageContent: JSON.stringify(posts), whData: JSON.stringify(wateringHole) },
    } 
}
