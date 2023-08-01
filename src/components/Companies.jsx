import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IsLoggedInContext } from '../App';
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';
import {v4 as uuid} from 'uuid'
import JoblyApi from './helpers/JoblyApi';
import CompaniesForm from './forms/CompaniesForm';


const Companies = () => {
    const {isLoggedIn, updatedIsLoggedIn, token, updateToken, username} = useContext(IsLoggedInContext);
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    const handleClick = (companyHandle) => {
        navigate(`/companies/${companyHandle}`);
    }
    const updateCompanies = (newData) => {
        setCompanies(newData);
    }
    // This will check if your logged in. If not your redirected. If it is then make API call
    useEffect(() => {
        try {
            if(!token || !isLoggedIn){
                navigate("/");
            } else {
                const getData = async () => {
                    const companies = await JoblyApi.getCompanies();
                    setCompanies(companies)
                    setLoading(false)

                    // const test = await JoblyApi.getFilterCompany('')
                }
                getData();
            }
        } catch (error) {
            console.log(error);
            navigate("/");
        }
    }, [])
    
    return (
        <div>
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
            <div className='flex items-center flex-col w-full h-[100%] bg-[#F9FCFB] animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out animate-normal animate-fill-forwards'>
                <CompaniesForm updateCompanies={updateCompanies}/>
                <div className='grid pt-10 lg:grid-cols-3 sm:grid-cols-2 max-w-[1000px]'>
                    {companies.map((company) => {
                        return (
                            <div onClick={()=>handleClick(company.handle)} key={uuid()} className='bg-white p-5 m-5 shadow-md hover:shadow-xl'>
                                <h2 className='text-[#096A2E] text-[1.5rem]'>{company.name}</h2>
                                <p>{company.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Companies