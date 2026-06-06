import React, { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()

    if (!validateEmail(email)){
      setError("Enter a valid email address")
      return
    }

    if (!password){
      setError("Enter the password")
      return
    }

    setError("")

    // login api
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex-col justify-center'>
        <h3 className="text-xl text-black font-semibold">Welcome</h3>
        <p className='text-xs text-slate-700 mt-2 mb-6'>
          Enter your details
        </p>

        <form onSubmit={handleLogin}>
          <Input 
          value={email} 
          onChange={({target}) => setEmail(target.value)} 
          label="Email"
          placeholder='a@gmail.com'
          type='text' />

          <Input 
          value={password} 
          onChange={({target}) => setPassword(target.value)} 
          label="Password"
          placeholder='Min 8 characters'
          type='password' />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account? {" "}
            <Link className='font-medium text-primary underline' to='/signup'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login