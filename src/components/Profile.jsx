import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router';
import { IsLoggedInContext } from '../App';
import ProfileForm from './forms/ProfileForm'
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';
import NutritionApi from './helpers/NutritionApi';

const Profile = () => {
    const {isLoggedIn, token, username} = useContext(IsLoggedInContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
        // This will check if your logged in. If not your redirected. If it is then make API call
        useEffect(() => {
            try {
                if(!token || !isLoggedIn){
                    navigate("/");
                } else {
                    const getData = async () => {
                        // Gets the data for the profile
                        const user = await NutritionApi.getUserData(username)
                        setUserData(user);
                        setLoading(false)
                    }
                    getData();
                }
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }, [])

        const updateUserData = (val) =>{
            setUserData(val);
        }

        return (
            <div className='flex h-[100vh]flex-col items-center mt-20'>
                {/* This runs while loading is happening */}
                {loading && 
                <div className='h-screen w-full flex justify-center'>
                    <div className='h-screen w-full flex justify-center items-center'>
                        <IconContext.Provider value={{ size: '2.5rem' }}>
                            <BiLoader className='animate-spin animate-infinite animate-duration-[1500ms] animate-ease-linear animate-normal animate-fill-forwards'/>
                        </IconContext.Provider>
                    </div>
                </div>}
                {!loading && <div className='flex flex-col items-center w-full h-screen animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out animate-normal animate-fill-forwards'>
                    <ProfileForm userData={userData} updateUserData={updateUserData} />
                </div>}

            </div>
        )
}

export default Profile