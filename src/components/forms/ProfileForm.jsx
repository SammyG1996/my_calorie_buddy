import React, {useState, useContext} from 'react'
import { IsLoggedInContext } from '../../App';
import JoblyApi from '../helpers/JoblyApi';

const ProfileForm = ({userData, updateUserData}) => {
    // const baseFormInfo = {username : '',firstname: '', lastname: '', email: '', password : '', confirmpassword : ''};
    const [inputData, updateInputData] = useState({...userData, password : '', confirmpassword : ''})
    const {updatedIsLoggedIn, updateToken, username, updateAlert, updateUsername} = useContext(IsLoggedInContext)


    
  
    const handleUpdate = (e) => {
        updateInputData(data => ({...data, [e.target.name] : e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {firstName, lastName, email, password, confirmpassword} = inputData;
        const updateData = async () =>{
            if(password === '' && firstName !== '' && lastName !== '' && email !== ''){
                await JoblyApi.updateUser(username, firstName, lastName, email);
                updateAlert('Updated your name and email')
            }
            else if(password === confirmpassword  && firstName !== '' && lastName !== '' && email !== ''){
                await JoblyApi.updateUser(username, firstName, lastName, email, password)
                updateAlert('Updated you name, email, and password')
            } else {
                updateAlert('Passwords did not match or field one of the fields are empty')
            }
        }
        updateData();

    }
  
    return (
            <div>
                <form  onSubmit={handleSubmit}>
                    <div className='p-10 mt-10 w-[95vw] md:w-[80vw] lg:w-[70vw] xl:w-[55vw] bg-[#EDF7F2] shadow-md'>
                        <h1 className='text-[#096A2E] text-[2rem] text-2xl text-center my-5'>User Information</h1>
                            <div className='mb-2'>
                            <input value={inputData.firstName} onChange={handleUpdate} className='w-full py-2 px-2' type='text' name='firstName' id='firstname' placeholder='First Name' />
                            </div>
                            <div className='mb-2'>
                            <input value={inputData.lastName} onChange={handleUpdate} className='w-full py-2 px-2' type='text' name='lastName' id='lastname' placeholder='Last Name' />
                            </div>
                            <div className='mb-2'>
                            <input readOnly value={inputData.username} onChange={handleUpdate} className='w-full py-2 px-2' type='text' name='username' id='username' placeholder='Username' />
                            </div>
                            <div className='mb-2'>
                            <input value={inputData.email} onChange={handleUpdate} className='w-full py-2 px-2' type='email' name='email' id='email' placeholder='Email' />
                            </div>
                            <div className='mb-2'>
                            <input value={inputData.password} onChange={handleUpdate} className='w-full py-2 px-2' type='password' name='password' id='password' placeholder='Password' />
                            </div>
                            <div className='mb-2'>
                            <input value={inputData.confirmpassword} onChange={handleUpdate} className='w-full py-2 px-2' type='password' name='confirmpassword' id='confirmpassword' placeholder='Confirm Password' />
                            </div>
                        <button className='flex items-center mx-auto my-4 px-3 py-2  bg-[#C2E5D3] hover:bg-[#31C48D]' >Update</button>
                    </div>
                </form>
            </div>
    )
}

export default ProfileForm