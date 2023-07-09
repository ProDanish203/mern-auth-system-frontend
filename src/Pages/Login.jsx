import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

export const Login = ({ setUser }) => {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showPass, setShowPass] = useState(false)

    
    const navigate = useNavigate();
    const url = "http://localhost:5000/api/v1/login"

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);
        await axios.post(url, {
            email, 
            pass
        })
        .then((res) => {
            setError("");
            setLoading(false);
            console.log(res.data)
            
            setUser(res.data.user)
            navigate("/home");
        })
        .catch((e) => {
            console.log(e)
            if(e.response.data.success == false){
                setError(e.response.data.message);
                return
            }
        })
        .finally(setLoading(false));

    }

  return (
    <>
    <div className="form-container flex flex-col gap-5 items-center justify-center mt-3 min-h-[80vh] h-full w-full">

    {error && (
        <div className='max-w-[350px] w-full bg-red-400 py-2 rounded-md text-center text-white'>{error}</div>
    )}

        <form 
        onSubmit={handleLogin}
        className='px-3 py-4 bg-purple max-w-[350px] rounded-md bg-gray-100 w-full flex flex-col gap-3 items-center justify-center shadow-2xl '
        >
            <h2 className='font-bold text-3xl mb-3'>Login</h2>

            <div className='px-3 w-full'>
                <label htmlFor="email" className='text-md font-semibold'>Email Address:</label>
                <input 
                id='email'
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className='w-full px-4 py-2 border-2 border-[#999] focus:border-[#333] rounded-md outline-none mt-2'
                placeholder='Email Address'
                autoComplete='off'
                />
            </div>

            <div className='px-3 w-full'>
                <label htmlFor="password" className='text-md font-semibold'>Password:</label>

                <div className='px-4 py-2 flex items-center justify-center border-2 border-[#999] focus:border-[#333] rounded-md'>
                <input 
                id='password'
                type={`${showPass ? "text" : "password"}`} 
                required 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                className='w-full border-none outline-none'
                placeholder='Enter Password'
                autoComplete='off'
                />
                <i className={`fas fa-${showPass ? 'eye-slash' : 'eye'} cursor-pointer text-xl hover:text-purple-700`} 
                onClick={() => setShowPass(prev => !prev)}
                ></i>
                </div>
            </div>

            <div className='px-3 w-full mt-4'>
                <button className='w-full bg-purple-700 text-white text-xl py-2 rounded-md'>Login</button>
            </div>

            <p className='text-md self-start pl-3 mt-2'>Don't have an account? <Link to="/signup" className='text-purple-500 cursor-pointer'>Signup now</Link></p>

        </form>
    </div>
    </>
  )
}
