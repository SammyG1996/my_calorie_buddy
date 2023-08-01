import React, {useContext, useState} from 'react'
import { IsLoggedInContext } from '../../App';
import { useNavigate } from 'react-router';
import JoblyApi from '../helpers/JoblyApi';
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';



const LoginForm = () => {
    const baseFormInfo = {username : '', password : ''};
    const [loading, setLoading] = useState(false);
    const [inputData, updateInputData] = useState(baseFormInfo)
    const {updatedIsLoggedIn, updateToken, updateAlert, updateUsername} = useContext(IsLoggedInContext)
    const navigate = useNavigate();
  
    const handleUpdate = (e) => {
      updateInputData({...inputData, [e.target.name] : e.target.value})
    }
    
    // Handles submission of data. If everything is submitted then a user is redirected to the companies route
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const token =  await JoblyApi.login(inputData)
            console.log(token)

            if(token){
                updateToken(token);
                updatedIsLoggedIn();
                updateAlert(null);
                updateUsername(inputData.username)
                sessionStorage.setItem("token", `${token}`)
                sessionStorage.setItem("username", `${inputData.username}`)
                setLoading(false)
                navigate('/companies')
            }
        } catch(err){
            setLoading(false)
            updateAlert('Invalid Username or Password Please Try Again')
            updateInputData(baseFormInfo)
        }
    }

    return (
        <div>
            {loading && 
            <div className='h-screen w-full flex justify-center'>
                    <div className='mt-[30vh]'>
                        <IconContext.Provider value={{ size: '2.5rem' }}>
                            <BiLoader className='animate-spin animate-infinite animate-duration-[1500ms] animate-ease-linear animate-normal animate-fill-forwards'/>
                        </IconContext.Provider>
                    </div>
            </div>}

            {!loading && <form  onSubmit={handleSubmit}>
                <div className='p-10 mt-10 w-[80vw] md:w-[60vw] lg:w-[35vw] bg-[#EDF7F2] shadow-md'>
                    <h1 className='text-2xl text-center my-5'>Login</h1>
                    <div className='mb-2'>
                        <input value={inputData.username} onChange={handleUpdate} className='w-full py-2 px-2' type='text' name='username' id='username' placeholder='Username' />
                    </div>
                    <div className='mb-2'>
                        <input value={inputData.password} onChange={handleUpdate} className='w-full py-2 px-2' type='password' name='password' id='password' placeholder='Password' />
                    </div>
                    <button className='flex items-center mx-auto my-4 px-3 py-2  bg-[#C2E5D3] hover:bg-[#31C48D]' >Submit</button>
                </div>
            </form>}
        </div>
    )
}

export default LoginForm