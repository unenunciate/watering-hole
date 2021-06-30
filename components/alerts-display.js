import { useContext, useEffect, useState } from 'react';

import Alert from './alert';


const AlertsDisplay = ({ alerts, alertsDispatch }) => {
    console.log(alerts);
    return (
        alerts?
            alerts.alerts?
                <div className='flex flex-col pt-24 items-center fixed right-1/2 left-1/2 z-50'>
                    {
                        alerts.alerts.map( function(alert) {
                            if(alert) {
                                return <Alert key={Math.random()} timeout={alert.timeout} message={alert.message} alertsDispatch={alertsDispatch} />
                            }
                        })
                    }
                </div>
            :
                <div></div>
        :
            <div></div>
    );
}

export default AlertsDisplay;