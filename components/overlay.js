import Link from 'next/link';

import { DAPP_ADDRESS } from '../constrants/index';

const Overlay = ({ overlayVisible, setOverlayVisible }) => {
    return (
        overlayVisible ?
            <div className='min-w-full z-30 fixed mt-20 '>
                <div className='flex flex-row text-yellow-400 shadow-2xl rounded-xl min-w-full border-yellow-400 border-b-2'>
                    <div className='flex flex-col w-full border-r-2 border-yellow-400'>
                        <Link href={`https://join.status.im/browse/${DAPP_ADDRESS}`}>
                            <button className='group' onClick={
                                        () => {
                                            setOverlayVisible(!overlayVisible);
                                        }
                                    }
                                >
                                    <div className={`${overlayVisible && ''} group flex flex-col items-center py-8 shadow-2xl bg-blue-600 border-t-2 border-yellow-400 cursor-pointer hover:bg-blue-400 min-w-full`}>
                                        <div>
                                        <svg className='group cursor-pointer' width='45' height='45' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                            <path className='group-hover:text-yellow-100 text-yellow-400 fill-current shadow-lg' fillRule='evenodd' clipRule='evenodd' d='M22.4762 0C10.0629 0 0 10.0737 0 22.5C0 34.9264 10.0629 45 22.4762 45C34.8895 45 44.9524 34.9264 44.9524 22.5C44.9524 10.0737 34.8895 0 22.4762 0Z' fill='#4360DF'/>
                                            <path className='group-hover:text-blue-400 text-blue-600 fill-current' fillRule='evenodd' clipRule='evenodd' d='M23.2309 21.5138C24.3595 21.6314 25.4882 21.749 26.8757 21.6716C30.6352 21.4618 32.9125 19.5302 32.7509 16.6428C32.5862 13.7052 29.5565 11.8953 26.5251 12.0645C21.5849 12.34 17.9521 16.6819 17.543 21.6444C18.2139 21.4871 18.9201 21.3932 19.586 21.356C20.9737 21.2787 22.1023 21.3962 23.2309 21.5138ZM13.5465 27.936C13.7024 30.6289 16.5727 32.288 19.4446 32.1328C24.1247 31.8802 27.5665 27.9002 27.954 23.3511C27.3184 23.4954 26.6495 23.5816 26.0185 23.6156C24.7039 23.6866 23.6346 23.5788 22.5653 23.471C21.4961 23.3632 20.4268 23.2554 19.1122 23.3264C15.5508 23.5187 13.3932 25.2893 13.5465 27.936Z' fill='currentColor' />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div> 
        :
            null
    );

}

export default Overlay;
