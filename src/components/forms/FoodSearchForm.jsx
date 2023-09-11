import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import NutritionApi from '../helpers/NutritionApi';

/**This is a form that handles the sending of requests to the external ninja nutrition API */
const FoodSearchForm = () => {
    const [inputData, setInputData] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputData(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const search = async () => {
            const res = await NutritionApi.getNutritionData(inputData);
            navigate('/search', {state: res});
        }
        search();
    }

    return (
        <div className='flex mx-auto'>
            <form onSubmit={handleSubmit}>
            <div className='flex mx-auto mt-2 w-[80vw] md:w-[60vw] max-w-[600px]'>
                <input autoComplete='off' placeholder='Enter Food w/ Serving Size' value={inputData} onChange={handleChange} type="text" name="search" id="search" className='w-[100%] py-2 px-2 shadow-md' />
                <button type="submit" className='flex items-center px-3 py-2 m-1 rounded-lg bg-[#715AFF] hover:bg-[#A682FF] shadow-md text-white'>Search</button>
            </div>            
            </form>
        </div>
    )
}

export default FoodSearchForm