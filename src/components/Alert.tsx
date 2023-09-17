import React, {useContext, useEffect, useState} from 'react'
import { IsLoggedInContext } from '../App'


// This will create the alert that can be envoked on command
const Alert = () => {
    const {alert, updateAlert} = useContext(IsLoggedInContext);
    const [timeouts, updatedTimeouts] = useState([])
    useEffect(()=>{
        /**
         * This use effect will handle when to remove the alert. If a new alert is set the useEffect will run. It will 
         * disable any previous setTimeouts and will start a new setTimeout. This will ensure that the message will always get 7 seconds
         */
        if(timeouts.length > 1){
            timeouts.forEach(timeout => {
                clearTimeout(timeout)
            });
            updatedTimeouts([]);
        }
        const timeoutID = setTimeout(()=>{
            updateAlert(null)
        }, 7000)
        updatedTimeouts([...timeouts, timeoutID])
    }, [alert])
    return (
        <>
            {alert && <div className='flex justify-center w-full h-[30px] bg-[#715AFF] mt-[70px] absolute'>
                <span className='text-[1rem] text-[#F9FCFB]'>{alert}</span>
            </div>}
        </>
    )
}

export default Alert