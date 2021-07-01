import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import { ethers } from 'ethers';

import WateringHoleCard from '../components/watering-hole-card';
import AddButton from '../components/add-button';

export default function Home( { holes, alertsDispatch } ) {
  const parsedHoles = JSON.parse(holes);
  return (
    <>
      <div className='relative flex flex-col sm:flex-wrap sm:flex-row max-w-full justify-around items-center py-24 mb-2 mx-4 z-10 pt-24'>
        {
            <>
              {
                parsedHoles.map((hole) => {
                  return <WateringHoleCard key={Math.random()} hole={hole} />
                })
              }
            </>
        }
      </div>
      
      <div className='fixed z-40 right-1 bottom-20'>
        <div className='text-yellow-400'>
          <AddButton type={1} alertsDispatch={alertsDispatch} />
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps ( ) {
  const serverProvider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/bb89bda1e77844a0bc414756b92a6496');
  const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , serverProvider );

  const numberOfWateringHoles = await WateringHoles.getNumberOfWateringHoles()

  let holes = [];

  for(let i = 1; i <= numberOfWateringHoles; i++) {
    holes[i - 1] = await WateringHoles.getWateringHole(i);
  }

  return {
    props: { holes: JSON.stringify(holes) },
  }
}
