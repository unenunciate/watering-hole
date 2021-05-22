import { useWallet } from 'use-wallet';

import Card from '../components/card';

export default function Home() {
  const wallet = useWallet();

  return (
    <div className='flex flex-col lg:flex-wrap lg:flex-row max-w-full justify-around items-center pt-28 pb-12 mx-4 z-10'>
      {
        !wallet.account ?
          <div className='flex mb-6 z-10'>
            <Card />
          </div>
          :
          <div className='flex mb-6 z-10'>
            <Card />
          </div>
      }
    </div>
  );
}
