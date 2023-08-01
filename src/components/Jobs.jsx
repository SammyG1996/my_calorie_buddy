import React, { useEffect, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IsLoggedInContext } from '../App';
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';
import {v4 as uuid} from 'uuid'
import JoblyApi from './helpers/JoblyApi';

const Jobs = () => {
    const {isLoggedIn, updatedIsLoggedIn, token, updateToken, username, updateAlert} = useContext(IsLoggedInContext);
    const [loading, setLoading] = useState(true);
    const [jobList, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([])
    const navigate = useNavigate();
    const {company} = useParams();
    // This will check if your logged in. If not your redirected. If it is then make API call
    // I watch the company variable because that will change based on whats being rendered
    useEffect(() => {
            try {
                if(!token || !isLoggedIn){
                    navigate("/");
                } else {
                    const getData = async () => {

                        if(company){ /**If there is a company in the params a filtered api call needs to be made */
                            const jobs = await JoblyApi.getJobsByCompany(company)
                            console.log(jobs)
                            Array.isArray(jobs) ? setJobs(jobs) : setJobs([jobs]); /**Ensures that jobs state will always be an array */

                        } else{ /**Else a normal api call needs to be made */
                            const jobs = await JoblyApi.getJobs();
                            console.log(jobs)
                            Array.isArray(jobs) ? setJobs(jobs) : setJobs([jobs]);
                        }
                        // Gets the data for job applications
                        console.log(username)
                        const applications = await JoblyApi.getUserJobApplications(username)
                        const jobIds = applications.map(({job_id}) => (job_id))
                        setAppliedJobs(jobIds);
                        setLoading(false);
                    }
                    getData();
                }
            } catch (error) {
                console.log(error);
                navigate("/");
            }
    
    
        }, [company])

        const handleButtonClick = (e) => {
            console.log(e)
            const getData = async () => {
                try {
                    await JoblyApi.applyToJob(username, e.target.id, {
                        username : `${username}`, 
                        jobId : parseInt(e.target.id)
                    })
                    // Sets style attributes for applied Job if succesful
                    e.target.innerText = 'Applied'
                    e.target.disabled = true;
                    e.target.className = 'flex items-center mx-auto my-4 px-3 py-2  bg-[#31C48D]'
                    } catch (error) {
                        console.log(error)
                    }
            }
            getData();
        }
   
    return (
        <div className='bg-[#F9FCFB] w-full h-screen'>
        {/* This runs while loading is happening */}
        {loading && 
                <div className='h-screen w-full flex justify-center'>
                    <div className='mt-[30vh]'>
                        <IconContext.Provider value={{ size: '2.5rem' }}>
                            <BiLoader className='animate-spin animate-infinite animate-duration-[1500ms] animate-ease-linear animate-normal animate-fill-forwards'/>
                        </IconContext.Provider>
                    </div>
                </div>}

                {/* This will display after loading */}
                {!loading && 
                <div className='flex justify-center w-full bg-[#F9FCFB]'>
                    <div className='grid pt-10 lg:grid-cols-3 sm:grid-cols-2 max-w-[1000px]'>
                        {/* Animation needs to be below so that way it occurs even when going between /jobs and /companies/job-handle */}
                        {jobList.map((job) => {
                            return (
                                <div key={uuid()} className='bg-white p-5 m-5 shadow-md hover:shadow-xl animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out animate-normal animate-fill-forwards'>
                                    <h2 className='text-[#096A2E] text-[1.5rem]'>{job.title}</h2>
                                    <p className='mb-2'><span className='text-[#096A2E] text-[1rem]'>Company:</span> {job.companyHandle}</p>
                                    <p><span className='text-[#096A2E] text-[1rem]'>Salary:</span> {job.salary ? job.salary : 'N/A'}</p>
                                    {appliedJobs.includes(job.id) ? 
                                    <button id={job.id} className='flex items-center mx-auto my-4 px-3 py-2  bg-[#31C48D]' disabled >Applied</button> :
                                    <button onClick={handleButtonClick} id={job.id} className='flex items-center mx-auto my-4 px-3 py-2  bg-[#C2E5D3] hover:bg-[#31C48D]' >Apply</button>}
                                </div>
                            )
                        })}
                    </div>
                </div>}
        </div>
    )
}

export default Jobs