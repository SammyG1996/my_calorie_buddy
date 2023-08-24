import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import JoblyApi from '../helpers/JoblyApi';


const FoodSearchForm = () => {
    const [inputData, setInputData] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputData(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const search = async () => {
            const res = await JoblyApi.getNutritionData(inputData);
            navigate('/search', {state: res})
        }
        search();
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className='flex mt-10 w-[80vw] md:w-[60vw]'>
                <input autoComplete='off' placeholder='Enter Food Along With Serving Size' value={inputData} onChange={handleChange} type="text" name="search" id="search" className='w-[100%] py-2 px-2 shadow-md' />
                <button type="submit" className='flex items-center px-3 py-2 m-1 bg-cyan-500 hover:bg-cyan-700 shadow-md'>Search</button>
            </div>            
            </form>
        </div>
    )
}

export default FoodSearchForm