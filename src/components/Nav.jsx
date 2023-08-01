import React from 'react'
import { useState, useContext } from 'react'
import Logo from '../assets/logo.png'
import {FaBars, FaTimes} from "react-icons/fa"
import {AiFillHome} from "react-icons/ai"
import {BsFillPersonPlusFill, BsFillBuildingFill, BsFillPersonVcardFill} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {MdLogout, MdLogin} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { IsLoggedInContext } from '../App'
import JoblyApi from './helpers/JoblyApi'



const Nav = () => {
    const [menuClicked, setMenuClicked] = useState(false);
    const {isLoggedIn, updatedIsLoggedIn, token, updateToken, alert, updateAlert, username} = useContext(IsLoggedInContext);
    const navigate = useNavigate();

    const handleHamburgerClick = () => {
        setMenuClicked( (bool) => {
            return !bool
        })
    }
    const handleLogOut = (e) => {
        e.preventDefault();
        updatedIsLoggedIn(false);
        updateToken('');
        updateAlert('You have been succefully logged out')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        JoblyApi.token = null;
        JoblyApi.bearer_token_req = null;
        navigate('/')
    }

    return (
        // Icon light color hex 31C48D
        <div className='sticky top-0 w-full h-[70px] flex justify-between px-4 items-center bg-[#C2E5D3] text-[#096A2E] shadow-md z-50'>
            <div>
                <Link to={'/'}><img src={Logo} alt="image logo" style={{height: "20px"}}/></Link>      
            </div>

            {/* Menu */}
            <ul className='hidden md:flex '>

                {isLoggedIn && 
                    <li>
                         <div className='flex items-center justify-between h-full mr-2'>
                            <h3 className='text-[1rem]'>Hello {username}</h3>
                         </div>
                    </li>
                }

                <li className='flex h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center'>
                        <div className='flex items-center justify-between'>
                            <AiFillHome /><span className='pl-2'><Link to={'/'}>Home</Link></span>
                        </div>
                    </button>
                </li>

                {!isLoggedIn && <li className='flex h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center'>
                        <div className='flex items-center justify-between'>
                            <BsFillPersonPlusFill /><span className='pl-2'><Link to={'/signup'}>Sign Up</Link></span>
                        </div>
                    </button>
                </li>}

                {isLoggedIn && <li className='flex h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' href="/">
                        <div className='flex items-center justify-between'>
                            <BsFillBuildingFill /><span className='pl-2'><Link to={'/companies'}>Companies</Link></span>
                        </div>
                    </button>
                </li>}
                
                {isLoggedIn && <li className='flex h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' >
                        <div className='flex items-center justify-between'>
                            <BsFillPersonVcardFill /><span className='pl-2'><Link to={'/jobs'}>Jobs</Link></span>
                        </div>
                    </button>
                </li>}

                {isLoggedIn && <li className='flex h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' href="/">
                        <div className='flex items-center justify-between'>
                            <CgProfile /><span className='pl-2'><Link to={'/profile'}>Profile</Link></span>
                        </div>
                    </button>
                </li>}

                {!isLoggedIn && <li className='flex h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' >
                        <div className='flex items-center justify-between'>
                            <MdLogin /><span className='pl-2'><Link to={'/login'}>Login</Link></span>
                        </div>
                    </button>
                </li>}
                {isLoggedIn && <li className='flex h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button onClick={handleLogOut} className='flex items-center' href="/">
                        <div className='flex items-center justify-between'>
                            <MdLogout /><span className='pl-2'>Logout</span>
                        </div>
                    </button>
                </li>}
                
            </ul>

            {/* Hamburger Icon */}
            <div className='md:hidden z-10 ' onClick={handleHamburgerClick}>
                {menuClicked ? <FaTimes/> : <FaBars />}
            </div>

            {/* Mobile Menu */}
            <ul className={menuClicked ? 'absolute top-0 left-0 w-full h-screen bg-[#C2E5D3] flex flex-col justify-center items-center' : 'hidden'}>
            <li className='flex justify-center w-[100%] h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' onClick={handleHamburgerClick}>
                        <div className='flex items-center justify-between'>
                            <AiFillHome /><span className='pl-2'><Link to={'/'}>Home</Link></span>
                        </div>
                    </button>
                </li>

                {!isLoggedIn && <li className='flex justify-center w-[100%] h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' onClick={handleHamburgerClick}>
                        <div className='flex items-center justify-between'>
                            <BsFillPersonPlusFill /><span className='pl-2'><Link to={'/signup'}>Sign Up</Link></span>
                        </div>
                    </button>
                </li>}

                {isLoggedIn && <li className='flex justify-center w-[100%] h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' href="/" onClick={handleHamburgerClick}>
                        <div className='flex items-center justify-between'>
                            <BsFillBuildingFill /><span className='pl-2'><Link to={'/companies'}>Companies</Link></span>
                        </div>
                    </button>
                </li>}
                
                {isLoggedIn && <li className='flex justify-center w-[100%] h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' onClick={handleHamburgerClick}>
                        <div className='flex items-center justify-between'>
                            <BsFillPersonVcardFill /><span className='pl-2'><Link to={'/jobs'}>Jobs</Link></span>
                        </div>
                    </button>
                </li>}

                {isLoggedIn && <li className='flex justify-center w-[100%] h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' onClick={handleHamburgerClick}>
                        <div className='flex items-center justify-between'>
                            <CgProfile /><span className='pl-2'><Link to={'/profile'}>Profile</Link></span>
                        </div>
                    </button>
                </li>}

                {!isLoggedIn && <li className='flex justify-center w-[100%] h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button className='flex items-center' onClick={handleHamburgerClick}>
                        <div className='flex items-center justify-between'>
                            <MdLogin /><span className='pl-2'><Link to={'/login'}>Login</Link></span>
                        </div>
                    </button>
                </li>}

                {isLoggedIn && <li className='flex justify-center w-[100%] h-[70px] px-2 hover:bg-[#31C48D]'>
                    <button onClick={(e)=> {handleLogOut(e); handleHamburgerClick();}} className='flex items-center' >
                        <div className='flex items-center justify-between'>
                            <MdLogout /><span className='pl-2'>Logout</span>
                        </div>
                    </button>
                </li>}
            </ul>



        </div>
    )
}

export default Nav