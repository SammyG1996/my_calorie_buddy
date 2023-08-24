import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IsLoggedInContext } from '../App';
import {v4 as uuid} from 'uuid'
import JoblyApi from './helpers/JoblyApi';
import DateForm from './forms/DateForm';
import FoodSearchForm from './forms/FoodSearchForm';




const SearchData = () => {
    
    const {isLoggedIn, updatedIsLoggedIn, token, updateToken, username, updateAlert, formattedDate} = useContext(IsLoggedInContext);
    const location = useLocation();
    const data = location.state;
    const [date, setDate] = useState(formattedDate)
    const navigate = useNavigate();

        const handleButtonClick = (e) => {
            const getData = async () => {
                /**This retrives all the data attributes from the button and puts it in an object to send in the request */
                const name = e.target.getAttribute('data-name')
                const serving_size = e.target.getAttribute('data-serving')
                const calories = e.target.getAttribute('data-calories')
                const protein = e.target.getAttribute('data-protein')
                const carbohydrates = e.target.getAttribute('data-carbs')
                const fats = e.target.getAttribute('data-fats')
                const data = {
                    name,
                    serving_size, 
                    calories : parseFloat(calories), 
                    protein : parseFloat(protein), 
                    carbohydrates : parseFloat(carbohydrates), 
                    fats : parseFloat(fats), 
                    username, 
                    date : `${date}`
                }
                console.log(data)
                try {
                        await JoblyApi.addFoodToLog(username, data);
                        navigate("/counter")

                    } catch (error) {
                        console.log(error)
                    }
            }
            getData();
        }
   
    return (
        <div className='bg-[#F9FCFB] w-full h-screen'>
            <div className='flex justify-center w-full'>
                <FoodSearchForm />
            </div>
            
            {/* This will display after loading */}
                <div className='flex justify-center w-full bg-[#F9FCFB]'>
                    
                    <div className='flex flex-col max-w-[1000px]'>
                        {/* Animation needs to be below so that way it occurs even when going between /jobs and /companies/job-handle */}
                        {data.length === 0 ? <h2 className='m-5 text-cyan-700 text-[1.5rem]'>No Results, Please Try Again</h2> : data.map((item) => {
                            return (
                                <div key={uuid()} className='flex flex-col bg-white p-5 m-5 shadow-md hover:shadow-xl animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out animate-normal animate-fill-forwards'>
                                    <h2 className='ml-2 text-cyan-700 text-[1.5rem]'>{item.name}</h2>
                                    <div className='flex items-center justify-center h-full'>
                                        <p className='m-2'><span className='text-cyan-700 text-[1rem]'>Calories:</span> {item.calories}</p>
                                        <p className='m-2'><span className='text-cyan-700 text-[1rem]'>Protein:</span> {item.protein_g}g</p>
                                        <p className='m-2'><span className='text-cyan-700 text-[1rem]'>Carb:</span> {item.carbohydrates_total_g}g</p>
                                        <p className='m-2'><span className='text-cyan-700 text-[1rem]'>Fat:</span> {item.fat_total_g}g</p>
                                        <p className='m-2'><span className='text-cyan-700 text-[1rem]'>Serving Size:</span> {item.serving_size_g}g</p>
                                    </div>
                                    <DateForm date={date} setDate={setDate} />
                                    <button data-name={item.name} 
                                    data-calories={item.calories} 
                                    data-protein={item.protein_g} 
                                    data-carbs={item.carbohydrates_total_g} 
                                    data-fats={item.fat_total_g} 
                                    data-serving={item.serving_size_g} 
                                    onClick={handleButtonClick} 
                                    className='flex items-center mx-auto my-4 px-3 py-2  bg-cyan-500 hover:bg-cyan-700'>Add</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
        </div>
    )
}

export default SearchData