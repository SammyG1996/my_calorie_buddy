import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router';
import { IsLoggedInContext } from '../App';
import ProfileForm from './forms/ProfileForm'
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';
import UserJobs from './UserJobs';
import JoblyApi from './helpers/JoblyApi';

const Profile = () => {
    const {isLoggedIn, updatedIsLoggedIn, token, updateToken, username} = useContext(IsLoggedInContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    const [jobApplications, setJobApplications] = useState([])
        // This will check if your logged in. If not your redirected. If it is then make API call
        useEffect(() => {
            try {
                if(!token || !isLoggedIn){
                    navigate("/");
                } else {
                    const getData = async () => {
                        // Gets the data for the profile
                        const user = await JoblyApi.getUserData(username)
                        setUserData(user);
                        // Gets the data for job that user has applied too
                        const applications = await JoblyApi.getUserJobApplications(username)
                        // Sets the data for all jobs
                        const jobs = await JoblyApi.getJobs()
                        // // Ensures that we have an array filled with the job id's extracted from the profile axios call
                        const jobIDs = applications.map(({job_id}) => (job_id))
                        // Compares the applied jobs from the profile axios call with the jobs to create a piece of state that is paased downs as props
                        jobs.map((job)=>{
                            if(jobIDs.includes(job.id)){
                                setJobApplications((currApplications) => ([...currApplications, job]))
                            }
                        })
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
            <div className='flex h-[100vh]flex-col items-center'>
                {/* This runs while loading is happening */}
                {loading && 
                <div className='h-screen w-full flex justify-center'>
                    <div className='mt-[30vh]'>
                        <IconContext.Provider value={{ size: '2.5rem' }}>
                            <BiLoader className='animate-spin animate-infinite animate-duration-[1500ms] animate-ease-linear animate-normal animate-fill-forwards'/>
                        </IconContext.Provider>
                    </div>
                </div>}
                {!loading && <div className='flex flex-col items-center w-full h-screen animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out animate-normal animate-fill-forwards'>
                    <ProfileForm userData={userData} updateUserData={updateUserData} />
                    <UserJobs jobApplications={jobApplications}/>
                </div>}

            </div>
        )
}

export default Profile