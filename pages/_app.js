import '../styles/globals.css';

import Head from 'next/head';

import { useEffect, useState, useReducer } from 'react';

import { WATERING_HOLES_ADDRESS } from '../constrants/index';
import { WATERING_HOLES_ABI } from '../constrants/abi';

import Header from '../components/header';
import Footer from '../components/footer';
import Overlay from '../components/overlay';

import Ethers from '../lib/ethers';
import {ethers} from 'ethers';
import EthersContext from '../contexts/ethers';

import AlertsDisplay from '../components/alerts-display'


const App = ({ Component, pageProps }) => {

  function alertReducer(state, action) {
    switch (action.type) {
      case 'addAlert':
        setShowAlerts(true);
        return [{ message: 'The changes given will be displayed after the transaction processes and a page refersh.', timeout: 10000 }];
      case 'removeAlert':
        let temp;
        if(state.length <= 1) {
          temp = [];
          setShowAlerts(false);
        } else {
          temp = state.splice(state.length - 1);
          setShowAlerts(true);
        }
        return temp;
      default:
        console.log(state);
    }
  }

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [alerts, alertsDispatch] = useReducer(alertReducer, []);

  useEffect(async function () {
    const WateringHoles = new ethers.Contract( WATERING_HOLES_ADDRESS , WATERING_HOLES_ABI , Ethers );
    
    const user = await WateringHoles.getUser('0x7289be8f6e14af0385e1ce5db9fcb0d096514f7a');
  }, [])

  return (
      <EthersContext.Provider value={Ethers} >
            <div className='bg-hero-pattern bg-yellow-100 min-w-full z-auto min-h-screen w-screen max-w-full'>
                <Overlay overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
                {showAlerts && <AlertsDisplay alerts={alerts} alertsDispatch={alertsDispatch} />}
                <Header overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
                <Component {...pageProps} alerts={alerts} alertsDispatch={alertsDispatch}/>
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