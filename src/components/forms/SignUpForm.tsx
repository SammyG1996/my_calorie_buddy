import React, {useState, useContext} from 'react';
import { IsLoggedInContext } from '../../App';
import NutritionApi from '../helpers/NutritionApi';
import { useNavigate } from 'react-router';
import {BiLoader} from 'react-icons/bi'
import { IconContext } from 'react-icons';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


/**This form handles the creation of a new user */
const SignUpForm = () => {
    const baseFormInfo = {username : '',firstName: '', lastName: '', email: '', password : '', confirmpassword : ''};
    const [inputData, updateInputData] = useState(baseFormInfo);
    const [outhAlert, updateOauthAlert] = useState(false)
    const {updateAlert} = useContext(IsLoggedInContext)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    /**Handles the updating of data into state */
    const handleUpdate = (e) => {
      updateInputData({...inputData, [e.target.name] : e.target.value})
    }
  
    /**Handles the submission of new user to database in order to create a new user */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const {username, firstName, lastName, email, password, confirmpassword} = inputData;
        const createUser = async () => {
            // Makes sure that no fields are blank
            if(password !== '' && confirmpassword !== '' && username !== '' && firstName !== '' && lastName !== '' && email !== ''){
                if(password === confirmpassword){ /**confirms the user entered the correct pw */
                    const res = await NutritionApi.createUser(username, firstName, lastName, email, password);
                    if(res.name && res.name === 'AxiosError'){
                        // Checks to see if error meassage is in an array
                        setLoading(false)
                        let alert;
                        Array.isArray(res.response.data.error.message) ? alert = res.response.data.error.message[0] : alert = res.response.data.error.message;
                        updateAlert(alert)
                        if(alert.includes('already has an account, please sign in')){
                            navigate('/login')
                        }

                    } else if(res.status === 201){ /**if there is no error this will run */
                        setLoading(false)
                        updateAlert('User created')
                        navigate('/login')

                    }
                } else {
                    setLoading(false)
                    updateAlert('Passwords did not match'); /**If passwords did not match this shows up */
                }
            } 
            else {
                setLoading(false)
                updateAlert('Passwords did not match or one of the fields are empty'); /**If passwords did not match this shows up */
            }
        }
        createUser();
    }

    /**
     * This function handles the extraction of information from the JWT.
     * Once the data is extracted it will be manually updated into the form fields. 
     * All fields will then be hidden using the oauthAlert var. 
     * The only 2 fields left are the pw and confirm-pw. 
     * An alert then appears to tell the users to enter a PW to finish submision. Then they are redirected to signin
     */
    const handleOAuthSubmit = (credentialResponse) => {
        const {credential} = credentialResponse;
        const decodedJWT = jwt_decode(credential);
      
        updateInputData({username : decodedJWT.email,
                        firstName: decodedJWT.given_name, 
                        lastName: decodedJWT.family_name, 
                        email: decodedJWT.email, 
                        password : '', 
                        confirmpassword : ''})
        updateOauthAlert(true)
    }

    return (
        <div>
            {loading && 
            <div className='h-screen w-full flex justify-center'>
                    <div className='justify-center items-center'>
                        <IconContext.Provider value={{ size: '2.5rem' }}>
                            <BiLoader className='animate-spin animate-infinite animate-duration-[1500ms] animate-ease-linear animate-normal animate-fill-forwards'/>
                        </IconContext.Provider>
                    </div>
            </div>}

            {!loading && <form  onSubmit={handleSubmit}>
                <div className='bg-white bg-opacity-50 backdrop-blur-xl backdrop-filter backdrop-saturate-200 rounded-lg p-10 mt-10 w-[80vw] md:w-[60vw] lg:w-[30vw] shadow-md flex flex-col items-center'>
                    <h1 className='text-2xl text-center my-5 text-white font-black'>Sign Up</h1>
                    {outhAlert && <p className='text-sm text-center text-[#715AFF] font-black'>You information has been auto filled.</p> }
                    {outhAlert && <p className='text-sm text-center text-[#715AFF] font-black'>Please enter a password and submit.</p> }

                        {!outhAlert && <div className='mb-2'>
                         <input value={inputData.firstName} onChange={handleUpdate} className='w-[250px] py-2 px-2' type='text' name='firstName' id='firstName' placeholder='First Name' />
                        </div>}

                        {!outhAlert && <div className='mb-2'>
                        <input value={inputData.lastName} onChange={handleUpdate} className='w-[250px] py-2 px-2' type='text' name='lastName' id='lastName' placeholder='Last Name' />
                        </div>}

                        {!outhAlert &&<div className='mb-2'>
                        <input value={inputData.username} onChange={handleUpdate} className='w-[250px] py-2 px-2' type='text' name='username' id='username' placeholder='Username' />
                        </div>}

                        {!outhAlert &&<div className='mb-2'>
                        <input value={inputData.email} onChange={handleUpdate} className='w-[250px] py-2 px-2' type='email' name='email' id='email' placeholder='Email' />
                        </div>}

                        <div className='mb-2'>
                        <input value={inputData.password} onChange={handleUpdate} className='w-[250px] py-2 px-2' type='password' name='password' id='password' placeholder='Password' />
                        </div>
                        <div className='mb-2'>
                        <input value={inputData.confirmpassword} onChange={handleUpdate} className='w-[250px] py-2 px-2' type='password' name='confirmpassword' id='confirmpassword' placeholder='Confirm Password' />
                        </div>
                        {!outhAlert &&<GoogleLogin
                            size='large'
                            width='250px'
                            text='signup_with'
                            onSuccess={ (credentialResponse) => handleOAuthSubmit(credentialResponse)}
                            onError={ () => updateAlert('Login Failed')}
                        />}
                    <button className='flex items-center mx-auto my-4 px-3 py-2  rounded-lg bg-[#715AFF] hover:bg-[#A682FF] shadow-md text-white' >Submit</button>
                    <a class="hover:cursor-pointer hover:text-[#715AFF] underline text-xs " onClick={() => (navigate('/login'))}>Or Login Instead</a>
                </div>
            </form>}
        </div>
    )
}

export default SignUpForm