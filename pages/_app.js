import '../styles/globals.css';

import Head from 'next/head';

import { Web3ReactProvider } from '@web3-react/core';

import Web3 from 'web3';

import { useEffect, useState } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import Overlay from '../components/overlay';

const App = ({ Component, pageProps }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  const getLibrary = 
    () => {
      const options = {
        timeout: 30000,
        clientConfig: {
          maxReceivedFrameSize: 100000000,
          maxReceivedMessageSize: 100000000,
          keepalive: true,
          keepaliveInterval: 60000
        },
        reconnect: {
            auto: true,
            delay: 5000,
            maxAttempts: 5,
            onTimeout: false
        }
      };

      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", options);
      console.log(web3);
      return web3;
  };

  return (
    <>
      <main>
        <Web3ReactProvider getLibrary={getLibrary}>
              <div className='bg-hero-pattern bg-yellow-100 min-w-full min-h-full z-auto'>
                  <Overlay overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
                  <Header overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
                  <Component {...pageProps} />
                  <Footer />
              </div>
        </Web3ReactProvider>
      </main>
    </>
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