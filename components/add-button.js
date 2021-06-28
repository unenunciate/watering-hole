import { useReducer, useState } from "react";
import AddForm from "./add-post-form";


const AddButton = ( { type, wID, pID, alertsDispatch } ) => {
    
    const [visible, setVisible] = useState(false);

    return(
        <>
            {visible && <AddForm setVisible={setVisible} type={type} alertsDispatch={alertsDispatch} wID={wID} pID={pID} />}
            <button className='rounded-full transform hover:-rotate-45 transition duration-300 bg-blue-600 focus:outline-none' onClick={() => setVisible(!visible)}>
                <svg xmlns='http://www.w3.org/2000/svg' className='rounded-full text-yellow-400 hover:text-yellow-100 hover:bg-blue-400 cursor-pointer h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
            </button>
        </>
    );
}

export default AddButton;