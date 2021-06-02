import Link from 'next/link';

const Header = ({ overlayVisible, setOverlayVisible }) => {
    
    return (
        <div className='fixed top-0 flex flex-row min-w-full justify-between bg-blue-600 p-6 z-30 border-b-2 border-yellow-400 mb-24 shadow-2xl'>
            <Link href='/'>
                <h1 className='hover:text-yellow-100 ml-4 font-holocene text-2xl text-yellow-400 cursor-pointer'>Watercooler</h1>
            </Link>
            {   
                !false ? 
                <div>
                    <button onClick={() => setOverlayVisible(!overlayVisible)} className='shadow-2xl pl-1 flex flex-row rounded cursor-pointer hover:bg-yellow-100 active:bg-yellow-200 bg-yellow-400 mt-1 mr-4'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                        </svg>
                    </button>
                </div>                      
                :   
                <div className='flex flex-row text-yellow-400 pt-2'>
                    <Link href='/settings'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='hover:text-yellow-100 mt-1 mx-4 fill-current h-6 w-6 cursor-pointer' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' />
                        </svg>
                    </Link>
                    <Link href='/profile'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='hover:text-yellow-100 mt-1 mx-4 h-6 w-6 cursor-pointer' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                    </Link>
                </div>
            }
        </div>
    );
}

export default Header;