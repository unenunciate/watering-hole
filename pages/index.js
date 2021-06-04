import Head from 'next/head';
import { useContext, useEffect } from 'react';

import Card from '../components/card';

export default function Home( {} ) {

  
  return (
    <>
      <div className='relative flex flex-col sm:flex-wrap sm:flex-row max-w-full justify-around items-center pb-12 mb-2 mx-4 z-10 pt-24'>
        {
          !false ?
            <>
              <div className='flex mb-6 sm:mt-6 md:mt-0 md:mx-4 z-10'>
                <Card />
              </div>
            </>
            :
            <>
              <div className='flex mb-6 sm:mt-6 md:mt-0 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 sm:mt-6 md:mt-0 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
              <div className='flex mb-6 z-10 md:mx-4'>
                <Card />
              </div>
            </>
        }
      </div>
    </>
  );
}
