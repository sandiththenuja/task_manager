import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminInviteToken, setAdminInviteToken] = useState('')
  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignup = async(e) => {
      e.preventDefault()

      let profileImageUrl = ''
      
      // add other validations here

      if (!validateEmail(email)){
        setError("Enter a valid email address")
        return
      }
  
      if (!password){
        setError("Enter the password")
        return
      }
  
      setError("")

      // signup api
      try {

      if (profilePic){
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      })

      const {token, role} = response.data

      if (token){
        localStorage.setItem("token", token)
        updateUser(response.data)

        // redirect based on role
        if (role === "admin"){
          navigate("/admin/dashboard")
        }else{
          navigate("/user/dashboard")
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Try again")
      }
    }
  }
  

  return (
    <AuthLayout>
        <div className="lg:w[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">
            <p className="text-xs text-slate-700 mt-5">
              Join today by entering details here.
            </p>

            <form onSubmit={handleSignup}>
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Input value={fullName} onChange={({target}) => setFullName(target.value)} label="Full Name" placeholder="Abcd" type="text" />

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

          <Input 
          value={adminInviteToken} 
          onChange={({target}) => setAdminInviteToken(target.value)} 
          label="Admin Invite Token"
          placeholder='6 digit code'
          type='text' />
              </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>Register</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account? {" "}
            <Link className='font-medium text-primary underline' to='/login'>
              Login
            </Link>
          </p>
            </form>
          </h3>
        </div>
    </AuthLayout>
  )
}

export default Signup