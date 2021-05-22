import '../styles/globals.css';

import Head from 'next/head';

import { useState } from 'react';

import EthereumContext from '../contexts/ethereum';
import AccountContext from '../contexts/account';

import Header from '../components/header';
import Footer from '../components/footer';
import Overlay from '../components/overlay';

const App = ({ Component, pageProps }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
      <EthereumContext.Provider>
        <AccountContext.Provider>
          <div className='bg-hero-pattern bg-yellow-100 min-w-full min-h-full z-auto'>
              <Overlay overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
              <Header overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
              <Component {...pageProps} />
              <Footer />
          </div>
        </AccountContext.Provider>
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