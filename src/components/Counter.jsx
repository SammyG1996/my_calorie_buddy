import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IsLoggedInContext } from '../App';
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';
import JoblyApi from './helpers/JoblyApi';
import FoodSearchForm from './forms/FoodSearchForm';
import DateForm from './forms/DateForm';


const Counter = () => {
    const {isLoggedIn, updatedIsLoggedIn, token, updateToken, username, formattedDate} = useContext(IsLoggedInContext);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState([]);
    const [date, setDate] = useState(formattedDate)
    const [totalCalories, setTotalCalories] = useState(0)
    const [totalProtein, setTotalProtein] = useState(0)
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [totalFats, setTotalFats] = useState(0)

    const navigate = useNavigate();

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
                    setTotalCalories(calories)
                    setTotalProtein(protein)
                    setTotalCarbs(carbs)
                    setTotalFats(fats)
    }

    const handleButtonClick = (id) => {
        const handleUpdate = async () => {
            try{
                await JoblyApi.deleteItem(username, id)
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
                    // const {items} = await JoblyApi.getItems();
                    const {items} = await JoblyApi.getItems(username, date);
                    // console.log(items)
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
                <FoodSearchForm />
                <div className='mt-5 flex flex-row max-w-[1000px] text-[1rem]'>
                    
                    <p className='ml-1 mr-1'><span className='text-cyan-700'>Calories</span> {totalCalories}</p>
                    <p className='ml-1 mr-1'><span className='text-cyan-700'>Protein:</span> {totalProtein}g</p>
                    <p className='ml-1 mr-1'><span className='text-cyan-700'>Carbs:</span> {totalCarbs}g</p>
                    <p className='ml-1 mr-1'><span className='text-cyan-700'>Fats:</span> {totalFats}g</p>

                </div>
                <div className='mt-5 flex flex-col w-[100%] max-w-[1000px]'>
                    <h1 className='text-[2rem] text-cyan-700 text-center'>Food Log: {date}</h1>
                    <DateForm date={date} setDate={setDate} />
                    {logs.map((log) => {
                        return (
                            <div key={log.id} className='bg-white p-5 m-2 shadow-md hover:shadow-xl'>
                                <h2 className='text-cyan-700 text-[1.5rem]'>{log.name}</h2>
                                <div className='flex flex-row'>
                                    <p className='mr-3'><span className='text-cyan-700 text-[1em]'>Calories: </span>{log.calories}kcal</p>
                                    <p className='mr-3'><span className='text-cyan-700 text-[1em]'>Protein: </span>{log.protein}g</p>
                                    <p className='mr-3'><span className='text-cyan-700 text-[1em]'>Carbs: </span>{log.carbs}g</p>
                                    <p><span className='text-cyan-700 text-[1em]'>Fats: </span>{log.fats}g</p>
                                </div>
                                <button className='mt-2 px-2 py-1  bg-red-400 hover:bg-red-600' onClick={()=>handleButtonClick(log.id)}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Counter