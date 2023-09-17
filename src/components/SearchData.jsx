import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IsLoggedInContext } from '../App';
import {v4 as uuid} from 'uuid'
import NutritionApi from './helpers/NutritionApi';
import FoodSearchForm from './forms/FoodSearchForm';
import Datepicker from "react-tailwindcss-datepicker"; 
import { BsFillXCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { Select, Option } from "@material-tailwind/react";




const SearchData = () => {

    const [mealTime, setMealTime] = useState(null);
    const {username, formattedDate} = useContext(IsLoggedInContext);
    const location = useLocation();
    const data = location.state;
    const [date, setDate] = useState(formattedDate) /**contains the date */
    const navigate = useNavigate();
    const [input, setInput] = useState({servings : 0}) /**controls the inputs */
    const [selectedFoodItem, setSelectedFoodItem] = useState('') /**Saves the food item that was selected the "update servings" button is pressed */
    const [value, setValue] = useState({ /** controls the state for the date picker */
        startDate: date,
        endDate: date 
        }); 
    const [modal, setModal] = useState(false); /**controls whether the modal is shown or not */

    // This will get the meal time to set the mealTimeState
    useEffect(()=>{
        const currDate = new Date(); 
        const hour = currDate.getHours()
        console.log(hour)
        if(hour < 11){
            setMealTime('breakfast'); 
        } else if(hour >= 11 && hour < 16){
            setMealTime('lunch'); 
        } else {
            setMealTime('dinner'); 
        }
    }, [])

    /** This updates the state that controls the date picker */
    const handleValueChange = (newValue) => {
            const {startDate, endDate} = newValue;
            // This prevents date from getting set to null
            if(startDate !== null && endDate !== null){
                setValue(newValue); 
                setDate(newValue.startDate)
            }

        } 
    
    /** This submits the data to add the food to the database and redirects to counter page */
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
                try {
                        await NutritionApi.addFoodToLog(username, data);
                        navigate("/counter")

                    } catch (error) {
                        console.log(error)
                    }
            }
            getData();
        }

    /** 
     * This is triggered when "update servings" button is clicked. the modal state is set to true triggering the update modal
     * The selected items food name is also saved in state. This will be used to triggered the search for the new serving size
     */
    const handleModalSelector = (e) =>{
            const foodName = e.target.dataset.name;
            setInput({...input, servings : e.target.dataset.serving})
            setSelectedFoodItem(foodName);
            setModal(true);

        }

    /** This is triggered when the serving size is updated in the modal in submitted. 
     * the modal is then hiden and a search happens. If successful the user is redirected to the serach page with the new data
     * thus triggering a rerender.
     */
    const handleUpdateServings = () =>{
            setModal(false)
            const searchStatment = `${input.servings}g of ${selectedFoodItem}`
            const search = async () => {
                try {
                    const res = await NutritionApi.getNutritionData(searchStatment);
                    navigate('/search', {state: res});
                } catch (error) {
                    console.log(error)
                }

            }
            search();
        }

    /** This will update the controlled number input in the modal */
    const handleInputUpdate = (e) => {
        setInput({...input, [e.target.name] : e.target.value})
    }

    const handleMealTimeUpdated = (val) =>{
        console.log(val)
        setMealTime(val)

    }
   
    return (
        <div className='w-full h-screen'>
            <div className='flex mt-10 justify-center w-full'>
                <div className='flex mt-20 bg-white bg-opacity-50 rounded-lg p-5 m-2 shadow-lg w-[100%] max-w-[735px]'>
                    <FoodSearchForm />
                </div>
                
            </div>
            
            {/* This will display after loading */}
                <div className='flex justify-center w-full'>
                    
                    <div className='flex flex-col w-full max-w-[750px] animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out animate-normal animate-fill-forwards'>
                        {!modal && <div>
                            {/* Animation needs to be below so that way it occurs even when going between */}
                            {data.length === 0 ? <h2 className='m-5 text-[#102E4A] text-[1.5rem]'>No Results, Please Try Again</h2> : data.map((item) => {
                                return (
                                    <div key={uuid()} className='flex flex-col bg-white bg-opacity-50 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-5 m-2 shadow-lg '>
                                        <div className='flex flex-col'>
                                            <h2 className='ml-2 text-[#102E4A] text-[1.5rem]'>{item.name}</h2>
                                            <div className='flex items-center justify-center h-full bg-white bg-opacity-0 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-2 m-2 shadow-md mt-1 mb-1'>
                                                <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Kcal:</span> {item.calories}</p>
                                                <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Prot:</span> {item.protein_g}g</p>
                                                <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Carb:</span> {item.carbohydrates_total_g}g</p>
                                                <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Fat:</span> {item.fat_total_g}g</p>
                                                <p className='m-2 text-[#102E4A]'><span className='text-[#715AFF] text-[1rem]'>Serving:</span> {item.serving_size_g}g</p>
                                            </div>

                                            <div className=' bg-white bg-opacity-0 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-2 m-2 shadow-md  mt-1'>
                                                    <div className=''>
                                                        <Datepicker 
                                                            asSingle={true} 
                                                            value={value} 
                                                            onChange={handleValueChange}
                                                            readOnly={true}
                                                            placeholder={date}
                                                            /> 
                                                    </div>


                                                    {/* <div className="">
                                                        <Select label="Meal Time" value={mealTime} onChange={handleMealTimeUpdated} className='bg-white'>
                                                            <Option value='breakfast'>Breakfast</Option>
                                                            <Option value='lunch'>Lunch</Option>
                                                            <Option value='dinner'>Dinner</Option>
                                                            <Option value='snack'>Snack</Option>
                                                        </Select>
                                                    </div> */}
                                            </div>

                                            <div className='flex flex-row justify-center mt-5'>
                                                <button data-name={item.name} 
                                                data-calories={item.calories} 
                                                data-protein={item.protein_g} 
                                                data-carbs={item.carbohydrates_total_g} 
                                                data-fats={item.fat_total_g} 
                                                data-serving={item.serving_size_g} 
                                                onClick={handleButtonClick} 
                                                className='flex items-center px-3 py-2 mx-1 bg-[#715AFF] hover:bg-[#A682FF] shadow-md rounded-lg text-white text-sm'>Add</button>
                                                
                                                <button data-name={item.name} 
                                                data-serving={item.serving_size_g} 
                                                onClick={handleModalSelector} 
                                                className='flex items-center px-3 py-2 mx-1 bg-[#715AFF] hover:bg-[#A682FF] shadow-md rounded-lg text-white text-sm'>Update Serving</button>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}



                        {modal && <div className='flex flex-col bg-white bg-opacity-50 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-5 m-2 shadow-lg '>
                                 <div className='flex flex-col'>
                                        
                                        <form>
                                            <div className='flex justify-center my-5'>
                                                <input placeholder='Enter new serving size' className='w-[150px] px-2' value={input.servings} onChange={handleInputUpdate} type="text" name="servings" id="servings" autocomplete="off" /><p className='self-end mr-2'>g</p>
                                                <button 
                  
                                                onClick={handleUpdateServings} 
                                                className='flex items-center px-3 py-2 mr-1 bg-[#715AFF] hover:bg-[#A682FF] shadow-md rounded-lg text-white text-sm'><BsCheckCircleFill /></button>

                                                <button 
                                                onClick={()=> setModal(false)} 
                                                className='flex items-center px-3 py-2  bg-[#715AFF] hover:bg-[#A682FF] shadow-md rounded-lg text-white text-sm'><BsFillXCircleFill /></button>
                                            </div>

                                        </form>
                                        
                                    </div>
                        </div>}


                    </div>
                </div>
        </div>
    )
}

export default SearchData