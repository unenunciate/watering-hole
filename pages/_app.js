import '../styles/globals.css';

import Head from 'next/head';

import Amplify from 'aws-amplify';

import { useState, useReducer } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import Overlay from '../components/overlay';

import AlertsDisplay from '../components/alerts-display'


Amplify.configure({
  ssr: true
});

const App = ({ Component, pageProps }) => {

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  function alertReducer(state, action) {
    switch (action.type) {
      case 'addAlert':
        setShowAlerts(true);
        console.log(state);
        state.alerts[state.alerts.length] = { message: 'The changes given will be displayed after the transaction processes and a page refresh.', timeout: 10000 };
        return { alerts: [...state.alerts] };
      case 'removeAlert':
        state.alerts.pop();

        if(state.alerts.length < 1) {
          setShowAlerts(false);
          return { alerts: [] };
        } else {
          return { alerts: [...state.alerts] };
        }
    }
  }
  
  const [alerts, alertsDispatch] = useReducer(alertReducer, { alerts: [] } );

  return (      
        <div className='bg-hero-pattern bg-yellow-100 min-w-full z-auto min-h-screen w-screen max-w-full items-center'>
            <Overlay overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
            {showAlerts && <AlertsDisplay alerts={alerts} alertsDispatch={alertsDispatch} />}
            <Header overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} />
            <Component {...pageProps} alerts={alerts} alertsDispatch={alertsDispatch}/>
            <Footer />
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