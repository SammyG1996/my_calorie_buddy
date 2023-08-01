import React, { useContext, useEffect } from 'react'
import Logo from '../assets/logo.png'
import {BsFillPersonPlusFill} from 'react-icons/bs'
import {MdLogin} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { IsLoggedInContext } from '../App'



const Home = () => {
    const {isLoggedIn, updatedIsLoggedIn, token, updateToken, alert, updateAlert, username} = useContext(IsLoggedInContext);

    return (
        //  The home componenent will have a slighty slower animation that the other,2 seconds instead of 1
        <div className='flex justify-center w-full h-screen bg-[#F9FCFB]'>
            <div className='max-w-[1000px] flex flex-col text-cyan-700 animate-fade-up animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards'>
                {isLoggedIn ? <h1 className='text-center my-10 text-2xl'>Welcome Back {username}</h1> : <h1 className='text-center my-10 text-2xl'>Meet your new buddy!</h1>}
                <img className='w-[50vw] mx-auto md:w-[30vw] ' src={Logo} alt="logo img" />
                <div className='flex justify-center mt-10'>

                    {!isLoggedIn && <button className='flex items-center px-3 py-2 m-1 text-white bg-cyan-500 hover:bg-cyan-700 shadow-md' >
                        <div className='flex items-center justify-between'>
                            <BsFillPersonPlusFill /><span className='pl-2'><Link to={'/signup'}>Sign Up</Link></span>
                        </div>
                    </button>}
                    {!isLoggedIn && <button className='flex items-center px-3 py-2 m-1 text-white bg-cyan-500 hover:bg-cyan-700 shadow-md' >
                        <div className='flex items-center justify-between'>
                            <MdLogin /><span className='pl-2'><Link to={'/login'}>Login</Link></span>
                        </div>
                    </button>}

                </div>
                
            </div>
            
        </div>
    )
}

export default Home