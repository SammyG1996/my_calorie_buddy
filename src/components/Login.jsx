import React from 'react'
import LoginForm from './forms/LoginForm'



const Login = () => {
  return (
    <div className='flex justify-center w-full h-screen bg-[#F9FCFB] animate-fade-up animate-once animate-duration-1000 animate-ease-out animate-normal animate-fill-forwards'>
      <div className='max-w-[1000px] text-[#096A2E]'>

        <LoginForm />

      </div>
    </div>
  )
}

export default Login