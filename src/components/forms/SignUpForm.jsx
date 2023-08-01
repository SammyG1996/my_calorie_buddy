import React, {useState, useContext} from 'react';
import { IsLoggedInContext } from '../../App';
import JoblyApi from '../helpers/JoblyApi';
import { useNavigate } from 'react-router';
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';



const SignUpForm = () => {
    const baseFormInfo = {username : '',firstName: '', lastName: '', email: '', password : '', confirmpassword : ''};
    const [inputData, updateInputData] = useState(baseFormInfo)
    const {updatedIsLoggedIn, updateToken, updateAlert, updateUsername} = useContext(IsLoggedInContext)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleUpdate = (e) => {
      updateInputData({...inputData, [e.target.name] : e.target.value})
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const {username, firstName, lastName, email, password, confirmpassword} = inputData;
        const createUser = async () => {
            // Makes sure that no fields are blank
            if(password !== '' && confirmpassword !== '' && username !== '' && firstName !== '' && lastName !== '' && email !== ''){
                if(password === confirmpassword){ /**confirms the user entered the correct pw */
                    const res = await JoblyApi.createUser(username, firstName, lastName, email, password);
                    if(res.name && res.name === 'AxiosError'){
                        // Checks to see if error meassage is in an array
                        setLoading(false)
                        Array.isArray(res.response.data.error.message) ? updateAlert(res.response.data.error.message[0]) : updateAlert(res.response.data.error.message);
                    } else if(res.status === 201){ /**if there is no error this will run */
                        setLoading(false)
                        updateAlert('User created')
                        navigate('/login')

                    }
                }
            } 
            else {
                setLoading(false)
                updateAlert('Passwords did not match or field one of the fields are empty')
            }
        }
        createUser();
    }

    return (
        <div>
            {loading && 
            <div className='h-screen w-full flex justify-center'>
                    <div className='mt-[30vh]'>
                        <IconContext.Provider value={{ size: '2.5rem' }}>
                            <BiLoader className='animate-spin animate-infinite animate-duration-[1500ms] animate-ease-linear animate-normal animate-fill-forwards'/>
                        </IconContext.Provider>
                    </div>
            </div>}

            {!loading && <form  onSubmit={handleSubmit}>
                <div className='p-10 mt-10 w-[80vw] md:w-[60vw] lg:w-[35vw] bg-[#EDF7F2] shadow-md'>
                    <h1 className='text-2xl text-center my-5'>Login</h1>
                        <div className='mb-2'>
                        <input value={inputData.firstname} onChange={handleUpdate} className='w-full py-2 px-2' type='text' name='firstName' id='firstName' placeholder='First Name' />
                        </div>
                        <div className='mb-2'>
                        <input value={inputData.lastname} onChange={handleUpdate} className='w-full py-2 px-2' type='text' name='lastName' id='lastName' placeholder='Last Name' />
                        </div>
                        <div className='mb-2'>
                        <input value={inputData.username} onChange={handleUpdate} className='w-full py-2 px-2' type='text' name='username' id='username' placeholder='Username' />
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
                    <button className='flex items-center mx-auto my-4 px-3 py-2  bg-[#C2E5D3] hover:bg-[#31C48D]' >Submit</button>
                </div>
            </form>}
        </div>
    )
}

export default SignUpForm