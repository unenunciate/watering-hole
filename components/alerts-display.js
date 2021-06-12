import { useContext, useEffect, useState } from 'react';

import Alert from './alert';


const AlertsDisplay = ({ alerts, alertsDispatch }) => {
    
    console.log(alerts);
    return (
        alerts?
            <div className='flex flex-col mt-24  items-center justify-center fixed z-40'>
                {
                    alerts.map( function(alert) {
                        if(alert) {
                            console.log("alerts-display map function", alert);
                            return <Alert key={Math.random()} timeout={alert.timeout} message={alert.message} alertsDispatch={alertsDispatch} />
                        }
                    })
                }
            </div>
        :
            <div></div>
    );
}

export default AlertsDisplay;