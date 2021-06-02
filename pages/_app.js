import '../styles/globals.css';

import Head from 'next/head';

import { useEffect, useState } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import Overlay from '../components/overlay';
import Ethereum from '../lib/ethereum';
import EthereumContext from '../contexts/ethereum';

const App = ({ Component, pageProps }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

 
  return (
    <EthereumContext.Provider value={Ethereum} >
          <div className='bg-hero-pattern bg-yellow-100 min-w-full z-auto min-h-screen w-screen max-w-full'>
              <Overlay overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
              <Header overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
              <Component {...pageProps} />
              <Footer />
          </div>
    </EthereumContext.Provider>
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