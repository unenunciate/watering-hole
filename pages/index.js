import { useContext, useEffect } from 'react';

import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import Ethers from '../lib/ethers';
import { ethers } from 'ethers';

import WateringHoleCard from '../components/watering-hole-card';
import AddButton from '../components/add-button';

export default function Home( { holes } ) {
  const parsedHoles = JSON.parse(holes);
  
  return (
    <>
      <div className='relative flex flex-col sm:flex-wrap sm:flex-row max-w-full justify-around items-center py-24 mb-2 mx-4 z-10 pt-24'>
        {
            <>
              {
                parsedHoles.map((hole) => {
                  return <WateringHoleCard key={parsedHoles.find(() => hole[0] === parsedHoles[0])} hole={hole} />
                })
              }
            </>
        }
      </div>
      
      <div className='fixed z-40 right-1 bottom-20'>
        <div className='text-yellow-400'>
          <AddButton type={0} />
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps ( ) {
  const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers );

  const numberOfWateringHoles = await WateringHoles.getNumberOfWateringHoles()

  let holes = [];

  for(let i = 1; i <= numberOfWateringHoles; i++) {
    holes[i - 1] = await WateringHoles.getWateringHole(i);
  }

  return {
    props: { holes: JSON.stringify(holes) },
  }
}
