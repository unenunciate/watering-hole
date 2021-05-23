import Link from 'next/link';

const Footer = () => {


    return (
        <footer className="flex justify-between shadow-inner min-w-full p-6 bg-purple-600 flex-row fixed bottom-0 text-yellow-400 z-40 border-t-2 border-yellow-400">
            <Link href='/search'>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-6 w-6 hover:text-yellow-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </Link>
            <Link href='/trends'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-yellow-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
            </Link>
            <Link href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-yellow-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </Link>
            <button className='relative inset-0 transform hover:-rotate-45 transition duration-300' onClick={
                    () => {
                        try {
                            if ( !false ) {
                                eth.scanQRCode()
                                    .then(data => {
                                    console.log('QR Scanned:', data, acc)
                                    })
                                    .catch(err => {
                                    console.log('Error:', err)
                                    });
                            }
                        } catch {
                            return console.log(eth);
                        }
                    }
                }
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="hover:text-yellow-100 cursor-pointer h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <Link href='/buy'>
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 hover:text-yellow-100 cursor-pointer h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </Link>
        </footer>
    );
}

export default Footer;