import React from 'react'
import { useState } from 'react'
import JoblyApi from '../helpers/JoblyApi';

const CompaniesForm = ({updateCompanies}) => {
    const [inputData, setInputData] = useState('');
    const handleChange = (e) => {
        setInputData(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const search = async () => {
            const res = await JoblyApi.getFilterCompany(inputData);
            updateCompanies(res)
        }
        search();
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className='flex mt-10 w-[80vw] md:w-[60vw]'>
                <input autoComplete='off' value={inputData} onChange={handleChange} type="text" name="search" id="search" className='w-[100%] py-2 px-2 shadow-md' />
                <button type="submit" className='flex items-center px-3 py-2 m-1 bg-[#C2E5D3] hover:bg-[#31C48D] shadow-md'>Search</button>
            </div>            
            </form>
        </div>
    )
}

export default CompaniesForm