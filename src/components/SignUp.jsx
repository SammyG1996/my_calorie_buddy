import React from 'react'
import SignUpForm from './forms/SignUpForm'



const SignUp = () => {

  return (
    <div className='flex justify-center items-center w-full h-screen animate-fade-up animate-once animate-duration-1000 animate-ease-out animate-normal animate-fill-forwards'>
        <div className='max-w-[1000px]'>
            <SignUpForm />
        </div>
    </div>
  )
}

export default SignUp