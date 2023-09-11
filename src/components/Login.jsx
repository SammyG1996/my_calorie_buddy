import React from 'react'
import LoginForm from './forms/LoginForm'



const Login = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen animate-fade-up animate-once animate-duration-1000 animate-ease-out animate-normal animate-fill-forwards'>
      <div className='max-w-[1000px]'>

        <LoginForm />

      </div>
    </div>
  )
}

export default Login