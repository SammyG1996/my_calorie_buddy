import React, { useContext } from 'react'
import { IsLoggedInContext } from '../App';
import {v4 as uuid} from 'uuid'


const UserJobs = ({jobApplications}) => {
    const {isLoggedIn, updatedIsLoggedIn, token, updateToken} = useContext(IsLoggedInContext);
    return (
        <div>
            <h2 className='text-[#096A2E] text-[2rem] text-center mt-10'>Jobs Applied</h2>
            <div className='flex justify-center w-full'>
                <div className='grid pt-10 grid-cols-1 lg:grid-cols-2 max-w-[750px]'>
                    {/* Animation needs to be below so that way it occurs even when going between /jobs and /companies/job-handle */}
                    {jobApplications.map((job) => {
                        return (
                            <div key={uuid()} className='bg-white p-5 m-5 shadow-md hover:shadow-xl animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out animate-normal animate-fill-forwards'>
                                <h2 className='text-[#096A2E] text-[1.5rem]'>{job.title}</h2>
                                <p className='mb-2'><span className='text-[#096A2E] text-[1rem]'>Company:</span> {job.companyHandle}</p>
                                <p><span className='text-[#096A2E] text-[1rem]'>Salary:</span> {job.salary ? job.salary : 'N/A'}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserJobs