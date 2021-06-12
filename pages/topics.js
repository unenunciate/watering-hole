import { useContext, useEffect } from 'react';

import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import Ethers from '../lib/ethers';
import { ethers } from 'ethers';

import WateringHoleCard from '../components/watering-hole-card';

export default function Topics( { topics } ) {
  const parsedTopics = JSON.parse(topics);
  
  return (
    <>
      <div className='relative flex flex-col sm:flex-wrap sm:flex-row max-w-full justify-around items-center py-24 mb-2 mx-4 z-10 pt-24'>
        {
            <>
              {
                Object.keys(parsedTopics).forEach(key => {
                    return (
                        <div className='bg-red-600'>
                            <div>   
                                {
                                        parsedTopics[key].length > 0 ? 
                                            parsedTopics[key].map((hole) => {
                                                return <WateringHoleCard key={hole[0]} hole={hole} />
                                            })
                                    :
                                        <div></div>
                                }
                            </div>
                        </div>
                    );
                })
                }
            </>
        }
      </div>
    </>
  );
}


export async function getServerSideProps ( ) {
  const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers );

  const numberOfWateringHoles = await WateringHoles.getNumberOfWateringHoles()

  let holes = [];

  let topics = { Technology: [], Culture: [], Science: [], Music: [], Film: [], Television: [], Art: [], Books: []};

  for(let i = 1; i <= numberOfWateringHoles; i++) {
    holes[i - 1] = await WateringHoles.getWateringHole(i);
    switch(holes[i - 1][3]) {
      case 'Technology': 
        topics.Technology.push(holes[i - 1]);
      case 'Culture': 
        topics.Culture.push(holes[i - 1]);
      case 'Science': 
        topics.Science.push(holes[i - 1]);
      case 'Music': 
        topics.Music.push(holes[i - 1]);
      case 'Film': 
        topics.Film.push(holes[i - 1]);
      case 'Television': 
        topics.Television.push(holes[i - 1]);
      case 'Art': 
        topics.Art.push(holes[i - 1]);
      case 'Books': 
        topics.Books.push(holes[i - 1]);
    }
  }

  return {
    props: { topics: JSON.stringify(topics) },
  }
}