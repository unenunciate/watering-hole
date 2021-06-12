import { useEffect } from 'react';

const Alert = ({ timeout, message, alertsDispatch }) => {

    useEffect(function () {
        setInterval(() => {
            alertsDispatch('removeAlert');
        }, timeout);

    }, [timeout, alertsDispatch])

    return (
        <div className='text-blue-600 border-blue-600 border p-1 bg-blue-400 z-30 mb-4 mx-24 rounded-md shadow-lg'>
            <div className='flex flex-row justify-between'>
                {message} 
                <span>  </span>
                <button className='text-blue-600 border border-red-600 px-1 bg-red-400 rounded-md text-red-600 shadow-inner' onClick={() => alertsDispatch('removeAlert')}>
                        <span className='text-red-600'>X</span>
                </button>
            </div>
        </div>
    );
}


export default Alert;