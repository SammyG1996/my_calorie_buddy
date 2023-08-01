import React, {useContext, useEffect} from 'react'
import { IsLoggedInContext } from '../App'

// This will create the alert that can be envoked on command
const Alert = () => {
    const {isLoggedIn, updatedIsLoggedIn, token, updateToken, alert, updateAlert} = useContext(IsLoggedInContext);
    useEffect(()=>{
        setTimeout(()=>{
            updateAlert(null)
        }, 4000)
    }, [alert])
    return (
        <>
            {alert && <div className='flex justify-center w-full h-[30px] bg-[#096A2E]'>
                <span className='text-[1rem] text-[#F9FCFB]'>{alert}</span>
            </div>}
        </>
    )
}

export default Alert