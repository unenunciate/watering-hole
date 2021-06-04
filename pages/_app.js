import '../styles/globals.css';

import Head from 'next/head';

import { useEffect, useState } from 'react';

import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import Header from '../components/header';
import Footer from '../components/footer';
import Overlay from '../components/overlay';

import Ethers from '../lib/ethers';
import {ethers} from 'ethers';
import EthersContext from '../contexts/ethers';

const App = ({ Component, pageProps }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(async function () {
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers );
    
    const user = await WateringHoles.getUser('0x7289be8f6e14af0385e1ce5db9fcb0d096514f7a');
    console.log(user);
  }, [])
  return (
    <EthersContext.Provider value={Ethers} >
          <div className='bg-hero-pattern bg-yellow-100 min-w-full z-auto min-h-screen w-screen max-w-full'>
              <Overlay overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
              <Header overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
              <Component {...pageProps} />
              <Footer />
          </div>
    </EthersContext.Provider>
  )
}

export default App;

/* 
  <Head>
        <title property='app:title' key='title'>Dilettante</title>
        <meta property='app:description' key='description' name='description' content='The gallery for your digital art.' />
        <link property='app:favicon' key='favicon' rel='icon' href='/favicon.ico' />
        <link
            property='app:font'
            key='font'
            rel='preload'
            href='../public/fonts/KGHolocene/KGHolocene.ttf'
            as='font'
            crossOrigin=''
          />
      </Head>
*/