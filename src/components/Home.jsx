import React, { useContext, useState } from 'react'
import Logo from '../assets/logo.png'
import {BsFillPersonPlusFill, BsFillMouseFill} from 'react-icons/bs'
import {MdLogin} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { IsLoggedInContext } from '../App'
import NutritionApi from './helpers/NutritionApi';
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';




const Home = () => {
    const {updatedIsLoggedIn, updateToken, updateAlert, updateUsername} = useContext(IsLoggedInContext)
    const [loading, setLoading] = useState(false);
    const {isLoggedIn, username} = useContext(IsLoggedInContext);
    const navigate = useNavigate();
    const handleDemoClick = async (e) => {
        e.preventDefault();
        try{
            setLoading(true)
            const token =  await NutritionApi.login({'username' : 'demo', 'password': 'demo123'})
            if(token){
                updateToken(token);
                updatedIsLoggedIn();
                updateAlert(null);
                updateUsername('demo')
                sessionStorage.setItem("token", `${token}`)
                sessionStorage.setItem("username", `demo`)
                setLoading(false)
                navigate('/counter')
            }
        } catch(err){
            setLoading(false)
            updateAlert('Invalid Username or Password Please Try Again')
            
        }


    }
    

    return (

        //  The home componenent will have a slighty slower animation that the other,2 seconds instead of 1
        <div className='flex justify-center items-center w-full h-screen'>


            {loading && 
            <div className='h-screen w-full flex justify-center items-center'>
                    <div className=''>
                        <IconContext.Provider value={{ size: '2.5rem' }}>
                            <BiLoader className='animate-spin animate-infinite animate-duration-[1500ms] animate-ease-linear animate-normal animate-fill-forwards'/>
                        </IconContext.Provider>
                    </div>
            </div>}


            {!loading && <div className='bg-white bg-opacity-50 backdrop-blur-xl backdrop-filter backdrop-saturate-200 p-10 shadow-xl rounded-lg h-[50vh] md:h-[60vh] max-w-[1000px] w-[90vw] md:w-[50vw]  flex justify-center items-center animate-fade-up animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards'>
                <div>
                    <img className='w-[100vw] mx-auto md:w-[35vw]' src={Logo} alt="logo img" />
                    {isLoggedIn ? <h1 className='text-center mt-5 mb-2 text-xl md:text-2xl text-white'>Welcome Back {username}</h1> : <h1 className='text-center mt-5 mb-2 text-2xl md:text-3xl text-white'>Meet your new buddy!</h1>}
                    {!isLoggedIn && <h1 className='text-center text-xl md:text-2xl text-white'>Sign Up Today</h1>}

                    <div className='flex justify-center mt-10'>

                        {!isLoggedIn && <button className='flex items-center rounded-lg px-3 py-2 m-1 text-white bg-[#715AFF] hover:bg-[#A682FF] shadow-md' >
                            <div className='flex items-center justify-between'>
                                <BsFillPersonPlusFill /><span className='pl-2'><Link to={'/signup'}>Sign Up</Link></span>
                            </div>
                        </button>}
                        {!isLoggedIn && <button className='flex items-center rounded-lg px-3 py-2 m-1 text-white bg-[#715AFF] hover:bg-[#A682FF] shadow-md' >
                            <div className='flex items-center justify-between'>
                                <MdLogin /><span className='pl-2'><Link to={'/login'}>Login</Link></span>
                            </div>
                        </button>}
                        {!isLoggedIn && <button className='flex items-center rounded-lg px-3 py-2 m-1 text-white bg-[#715AFF] hover:bg-[#A682FF] shadow-md' >
                            <div className='flex items-center justify-between' onClick={handleDemoClick}>
                                <BsFillMouseFill /><span className='pl-2'>Demo</span>
                            </div>
                        </button>}

                    </div>
                    
                </div>

                
            </div>}
            
        </div>
    )
}

export default Home