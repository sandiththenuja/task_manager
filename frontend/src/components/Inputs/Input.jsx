import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa6";

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleshowPassword = () => {
        setShowPassword(!showPassword)
    }

  return (
    <div>
        <label className='text-[13px] text-slate-800'>{label}</label>

        <div className="input-box">
            <input type={type == "password" ? (showPassword ? "text" : "password") : type} placeholder={placeholder} className='w-full bg-transparent outline-none' value={value} onChange={(e) => onChange(e)} />
            {type === "password" && (
                <>
                {showPassword ? (
                    <FaRegEye className='text-primary cursor-pointer' size={22} onClick={() => toggleshowPassword} />
                ) : <FaRegEyeSlash className='text-primary cursor-pointer' size={22} onClick={() => toggleshowPassword} />}
                </>
            )}
        </div>
    </div>
  )
}

export default Input