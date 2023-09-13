import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IsLoggedInContext } from '../App';
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';
import NutritionApi from './helpers/NutritionApi';
import FoodSearchForm from './forms/FoodSearchForm';
import DateForm from './forms/DateForm';
import Datepicker from "react-tailwindcss-datepicker"; 


const Counter = () => {
    const {isLoggedIn, token, username, formattedDate} = useContext(IsLoggedInContext);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState([]);
    const [date, setDate] = useState(formattedDate)
    const [totalCalories, setTotalCalories] = useState(0)
    const [totalProtein, setTotalProtein] = useState(0)
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [totalFats, setTotalFats] = useState(0)
    const [value, setValue] = useState({ 
        startDate: null,
        endDate: null 
        }); 

    const navigate = useNavigate();
        
    const handleValueChange = (newValue) => {
        setValue(newValue); 
        setDate(newValue.startDate)
        } 

    const updateNutrients = (items) => {
                    // Bellow sets the totals for calories/protein/carbs/fats
                    let calories = 0;
                    let protein = 0;
                    let carbs = 0;
                    let fats = 0;
                    items.map((log) => {
                        calories = calories + log.calories
                        protein = protein + log.protein
                        carbs = carbs + log.carbs
                        fats = fats + log.fats

                    })
                    // Now all the totals are set in state
                    setTotalCalories(calories.toFixed(1))
                    setTotalProtein(protein.toFixed(1))
                    setTotalCarbs(carbs.toFixed(1))
                    setTotalFats(fats.toFixed(1))
    }

    const handleButtonClick = (id) => {
        const handleUpdate = async () => {
            try{
                await NutritionApi.deleteItem(username, id)
                const updatedLogs = logs.filter(log => log.id !== id);
                setLogs(updatedLogs);
                updateNutrients(updatedLogs)

            } catch(err){
                console.log(err)
            }    
        }
        handleUpdate()
    }

    // This will check if your logged in. If not your redirected. If it is then make API call
    useEffect(() => {
        try {
            if(!token || !isLoggedIn){
                navigate("/");
            } else {
                const getData = async () => {
                    const {items} = await NutritionApi.getItems(username, date);
                    setLogs(items)
                    updateNutrients(items)
                    setLoading(false)
                    
                }
                getData();
            }
        } catch (error) {
            console.log(error);
            navigate("/");
        }
    }, [date])
    
    return (
        <div className='flex justify-center items-center w-full h-screen'>
            {/* This runs while loading is happening */}
            {loading && 
            <div className='flex justify-center'>
                <div className=''>
                    <IconContext.Provider value={{ size: '2.5rem' }}>
                        <BiLoader className='animate-spin animate-infinite animate-duration-[1500ms] animate-ease-linear animate-normal animate-fill-forwards'/>
                    </IconContext.Provider>
                </div>
            </div>}

            {/* This will display after loading */}
            {!loading && 
            <div className='mt-10 flex items-center flex-col w-full h-screen animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out animate-normal animate-fill-forwards'>
                

                <div className='bg-white bg-opacity-50 backdrop-blur-xl backdrop-filter backdrop-saturate-200 my-20 rounded-lg flex shadow-lg flex-col w-[98%] max-w-[750px] px-5 md:px-10 py-5'>
                    <div className='flex flex-row justify-center'>
                        <h1 className='text-[1.5rem] text-[#102E4A] text-center font-black'>Food Log:</h1>
                        <div className='w-[150px] mx-2'>
                            <Datepicker 
                                asSingle={true} 
                                value={value} 
                                onChange={handleValueChange} 
                                placeholder={date}
                                /> 
                        </div>

                    </div>

                    
                    <div className='bg-white bg-opacity-0 backdrop-blur-xl backdrop-filter backdrop-saturate-200  rounded-lg p-5 m-2 shadow-md flex'>
                     <FoodSearchForm />
                    </div>
                    
                    
                    {/* <h2 className='text-[1.5rem] text-cyan-700 text-center mt-2'>Macro Totals:</h2> */}

                    <div className='bg-white bg-opacity-0 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-5 m-2 shadow-md flex flex-row justify-center px-5 mt-1 text-[1rem]'>
                        <p className='ml-1 mr-1 text-[#102E4A]'><span className='text-[#715AFF] font-black'>Calories:</span> {totalCalories}g</p>
                        <p className='ml-1 mr-1 text-[#102E4A]'><span className='text-[#715AFF] font-black'>Protein:</span> {totalProtein}g</p>
                        <p className='ml-1 mr-1 text-[#102E4A]'><span className='text-[#715AFF] font-black'>Carbs:</span> {totalCarbs}g</p>
                        <p className='ml-1 mr-1 text-[#102E4A]'><span className='text-[#715AFF] font-black'>Fats:</span> {totalFats}g</p>
                    </div>

                    <div className='bg-white bg-opacity-0 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-5 m-2 shadow-md flex justify-center items-center mt-1 mb-5'>
                        {/* <DateForm date={date} setDate={setDate} /> */}
                    </div>

                    {logs.map((log) => {
                        return (
                            <div key={log.id} className='bg-white bg-opacity-0 backdrop-blur-xl backdrop-filter backdrop-saturate-200 mt-1 rounded-lg p-5 m-2 shadow-md flex mb-1'>
                                <div className='flex flex-col'>
                                    <h2 className='text-[#102E4A] text-[1.5rem]'>{log.name}</h2>
                                    <div className='flex flex-row items-end'>
                                        <p className='mr-3'><span className='text-[#715AFF] text-[1em]'>Calories: </span>{log.calories.toFixed(1)}kcal</p>
                                        <p className='mr-3'><span className='text-[#715AFF] text-[1em]'>Protein: </span>{log.protein.toFixed(1)}g</p>
                                        <p className='mr-3'><span className='text-[#715AFF] text-[1em]'>Carbs: </span>{log.carbs.toFixed(1)}g</p>
                                        <p><span className='text-[#715AFF] text-[1em]'>Fats: </span>{log.fats.toFixed(1)}g</p>
                                    </div>
                                    <button className='mt-2 px-2 py-1 w-[75px] bg-[#715AFF] hover:bg-[#A682FF] shadow-md rounded-lg text-white' onClick={()=>handleButtonClick(log.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Counter