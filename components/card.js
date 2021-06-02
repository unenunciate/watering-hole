import Skeleton from 'react-loading-skeleton';

const Card = () => {
    return(
        <div className='flex relative min-w-24 max-w-lg z-20 bg-blue-600 rounded-lg px-2 shadow-2xl border-yellow-400 border-2 pt-2' >
            <div className='flex flex-col z-20'>
                <div className='flex flex-row' >
                    <div className='pr-4 px-2' >
                        <Skeleton circle={true} height={24} width={24}  />
                    </div>

                    <div className='rounded py-2'>
                        <Skeleton width={208} height={12} />
                    </div>
                </div>

                <Skeleton width={256} height={64} />

                <div className='flex flex-row justify-between'>
                    <div className='rounded mr-2 my-2'>
                        <Skeleton width={116} height={12} />
                    </div>
                    
                    <div className='ml-2 my-2'>
                        <Skeleton width={116} height={12} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;