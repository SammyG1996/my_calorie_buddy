import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IsLoggedInContext } from '../App';
import {v4 as uuid} from 'uuid'
import NutritionApi from './helpers/NutritionApi';
import FoodSearchForm from './forms/FoodSearchForm';
import Datepicker from "react-tailwindcss-datepicker"; 




const SearchData = () => {
    
    const {username, formattedDate} = useContext(IsLoggedInContext);
    const location = useLocation();
    const data = location.state;
    const [date, setDate] = useState(formattedDate)
    const navigate = useNavigate();
    const [value, setValue] = useState({ 
        startDate: date,
        endDate: date 
        }); 

        const handleValueChange = (newValue) => {
            setValue(newValue); 
            setDate(newValue.startDate)
            } 
        
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
                // console.log(data)
                try {
                        await NutritionApi.addFoodToLog(username, data);
                        navigate("/counter")

                    } catch (error) {
                        console.log(error)
                    }
            }
            getData();
        }
   
    return (
        <div className='w-full h-screen'>
            <div className='flex mt-10 justify-center w-full'>
                <div className='flex mt-20 bg-white bg-opacity-50 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-5 m-2 shadow-lg w-[100%] max-w-[750px]'>
                    <FoodSearchForm />
                </div>
                
            </div>
            
            {/* This will display after loading */}
                <div className='flex justify-center w-full'>
                    
                    <div className='flex flex-col w-full max-w-[750px]'>
                        {/* Animation needs to be below so that way it occurs even when going between /jobs and /companies/job-handle */}
                        {data.length === 0 ? <h2 className='m-5 text-[#102E4A] text-[1.5rem]'>No Results, Please Try Again</h2> : data.map((item) => {
                            return (
                                <div key={uuid()} className='flex flex-col bg-white bg-opacity-50 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-5 m-2 shadow-lg animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out animate-normal animate-fill-forwards '>
                                    <h2 className='ml-2 text-[#102E4A] text-[1.5rem]'>{item.name}</h2>
                                    <div className='flex items-center justify-center h-full bg-white bg-opacity-0 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-2 m-2 shadow-md mt-1 mb-1'>
                                        <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Kcal:</span> {item.calories}</p>
                                        <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Prot:</span> {item.protein_g}g</p>
                                        <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Carb:</span> {item.carbohydrates_total_g}g</p>
                                        <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Fat:</span> {item.fat_total_g}g</p>
                                        <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Serving:</span> {item.serving_size_g}g</p>
                                    </div>
                                    <div className='bg-white bg-opacity-0 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-2 m-2 shadow-md flex justify-center items-center mt-1'>
                                        <Datepicker 
                                            asSingle={true} 
                                            value={value} 
                                            onChange={handleValueChange}
                                            readOnly={true}
                                            /> 
                                    </div>
                                    
                                    <button data-name={item.name} 
                                    data-calories={item.calories} 
                                    data-protein={item.protein_g} 
                                    data-carbs={item.carbohydrates_total_g} 
                                    data-fats={item.fat_total_g} 
                                    data-serving={item.serving_size_g} 
                                    onClick={handleButtonClick} 
                                    className='flex items-center mx-auto my-4 px-3 py-2   bg-[#715AFF] hover:bg-[#A682FF] shadow-md rounded-lg text-white'>Add</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
        </div>
    )
}

export default SearchData