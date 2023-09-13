import React, {useContext, useState} from 'react'
import { IsLoggedInContext } from '../../App';
import { useNavigate } from 'react-router';
import NutritionApi from '../helpers/NutritionApi';
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";




/**This is a login form. It is used when a user is logging into the application. */
const LoginForm = () => {
    const baseFormInfo = {username : '', password : ''};
    const [loading, setLoading] = useState(false);
    const [inputData, updateInputData] = useState(baseFormInfo)
    const {updatedIsLoggedIn, updateToken, updateAlert, updateUsername} = useContext(IsLoggedInContext)
    const navigate = useNavigate();
  
    /**Handles the control of the input data into state */
    const handleUpdate = (e) => {
      updateInputData({...inputData, [e.target.name] : e.target.value})
    }
    
    // Handles submission of data. If everything is submitted then a user is redirected to the companies route
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const token =  await NutritionApi.login(inputData)
            if(token){
                updateToken(token);
                updatedIsLoggedIn();
                updateUsername(inputData.username)
                sessionStorage.setItem("token", `${token}`)
                sessionStorage.setItem("username", `${inputData.username}`)
                setLoading(false)
                navigate('/counter')
            }
        } catch(err){
            setLoading(false)
            updateAlert('Invalid Username or Password Please Try Again')
            updateInputData(baseFormInfo)
        }
    }

    const handleOAuthSubmit = async (credentialResponse) => {
        try {
            setLoading(true);
            const {token, username} = await NutritionApi.loginOAuth(credentialResponse);
            if(token){
                updateToken(token);
                updatedIsLoggedIn();
                updateUsername(username)
                sessionStorage.setItem("token", `${token}`)
                sessionStorage.setItem("username", `${username}`)
                setLoading(false)
                navigate('/counter')
            }
        } catch(err){
            // If the user doesnt exist an alert happens and a user is redirected to the signup page
            setLoading(false)
            updateAlert('User does not exist, please sign up')
            navigate('/signup')
        }
    }

    return (
        <div>
            {loading && 
            <div className='h-screen w-full flex justify-center items-center'>
                    <div className=''>
                        <IconContext.Provider value={{ size: '2.5rem' }}>
                            <BiLoader className='animate-spin animate-infinite animate-duration-[1500ms] animate-ease-linear animate-normal animate-fill-forwards'/>
                        </IconContext.Provider>
                    </div>
            </div>}

            {!loading && <form  onSubmit={handleSubmit}>
                <div className='bg-white bg-opacity-50 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-10 mt-10 w-[80vw] md:w-[60vw] lg:w-[30vw] shadow-md flex flex-col items-center'>
                    <h1 className='text-2xl text-center my-5 text-white font-black'>Login</h1>
                    <div className='mb-2'>
                        <input value={inputData.username} onChange={handleUpdate} className='w-[250px] py-2 px-2' type='text' name='username' id='username' placeholder='Username' />
                    </div>
                    <div className='mb-2'>
                        <input value={inputData.password} onChange={handleUpdate} className='w-[250px] py-2 px-2' type='password' name='password' id='password' placeholder='Password' />
                    </div>
                    
                    <GoogleLogin
                            size='large'
                            width='250px'
                            onSuccess={ (credentialResponse) => handleOAuthSubmit(credentialResponse)}
                            onError={ () => {
                                updateAlert('Login Failed')
                            }}
                        />
                    <button className='flex items-center mx-auto my-4 px-3 py-2 rounded-lg bg-[#715AFF] hover:bg-[#A682FF] shadow-md text-white' >Submit</button>

                    <a class="hover:cursor-pointer hover:text-[#715AFF] underline text-xs " onClick={() => (navigate('/signup'))}>Or Sign Up Instead</a>

                </div>
            </form>}
        </div>
    )
}

export default LoginForm