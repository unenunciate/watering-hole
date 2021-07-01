import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import { ethers } from 'ethers';

import WateringHoleCard from '../components/watering-hole-card';

export default function Topics( { topics } ) {
  const parsedTopics = JSON.parse(topics);
  
  return (
    <>
      <div className='relative flex flex-col sm:flex-wrap sm:flex-row max-w-full justify-around items-center py-12 mb-2 mx-4 z-10 pt-24'>
        {
            <div className=''>
              {
                Object.keys(parsedTopics).map( (key) => {
                    return (
                        <div key={key} className='bg-blue-400 sm:flex-col mb-12 p-8 rounded-lg border-2 border-blue-600 flex-col flex'> 
                          <h1 key={key} className=' bg-yellow-400 text-yellow-50 rounded-lg mb-2 border border-yellow-600 text-center'>{key}</h1>
                          <div className='flex flex-col sm:flex-wrap md:flex-row' > 
                          {
                            parsedTopics[key].map( (hole) => {
                                return <div className='m-2'><WateringHoleCard hole={hole} key={parseInt(hole._id)} /></div>
                              }
                            )
                          }
                          </div>
                        </div>
                    );  
                })
                }
            </div>
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
        break;
      case 'Culture': 
        topics.Culture.push(holes[i - 1]);
        break;
      case 'Science': 
        topics.Science.push(holes[i - 1]);
        break;
      case 'Music': 
        topics.Music.push(holes[i - 1]);
        break;
      case 'Film': 
        topics.Film.push(holes[i - 1]);
        break;
      case 'Television': 
        topics.Television.push(holes[i - 1]);
        break;
      case 'Art': 
        topics.Art.push(holes[i - 1]);
        break;
      case 'Books': 
        topics.Books.push(holes[i - 1]);
        break;
    }
  }

  return {
    props: { topics: JSON.stringify(topics) },
  }
}