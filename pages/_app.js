import '../styles/globals.css';

import Head from 'next/head';

import { UseWalletProvider } from 'use-wallet';
import { useState } from 'react'; 

import Header from '../components/header';
import Footer from '../components/footer';
import Overlay from '../components/overlay';

const App = ({ Component, pageProps }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
      <div>
        <div className='bg-hero-pattern bg-yellow-100 min-w-full min-h-full z-auto'>
          <UseWalletProvider 
                chainId={3}
                connectors={
                  { 
                    fortmatic: { apiKey: 'pk_test_8A9FF02D9D192E0A' },
                    walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
                    walletlink: { url: 'https://mainnet.eth.aragon.network/' },
                  }
                }
              >
              <Overlay overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
              <Header overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
              <Component {...pageProps} />
              <Footer />
            </UseWalletProvider>
          </div>
      </div>
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