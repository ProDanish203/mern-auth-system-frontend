import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export const Signup = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        pass: "",
        cpass: ""
    })

    const [showPass, setShowPass] = useState(false)

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user, 
            [name]: value
        })
    }


    const navigate = useNavigate();

    const url = "http://localhost:5000/api/v1/register"

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("")

        const { name, email, pass} = user;

        if(user.pass.length < 6){
            setError("Password should be greater than 6 characters")
            return
        }
        else if(user.pass !== user.cpass){
            setError("Passwords do not match")
            return
        }

        if(!error){
            try{
                // setError("");
                setLoading(true);
                await axios.post(url, {
                    name,
                    email, 
                    pass
                })
                .then((res) => {
                    const data = res?.data
                    if(data?.success == false){
                        setError(data.message)
                    }else{
                        setError("")
                        setLoading(false)
                        navigate("/login")
                        // console.log(res)
                    }
                    
                    
                })
                .catch((e) => {
                    if(e?.data?.success == false){
                        setError(e?.data?.message);
                        return
                    }
                })
                .finally(setLoading(false));
            }
            catch(err){
                console.log(err)
                setError("Unable to create account")
                setLoading(false);
            }
    }
}

  return (
    <>
    <div className="form-container flex flex-col gap-5 items-center mt-3 justify-center min-h-[80vh] h-full w-full">

    {error && (
        <div className='max-w-[350px] w-full bg-red-400 py-2 rounded-md text-center text-white'>{error}</div>
    )}

    <form 
    onSubmit={handleSignup}
    className='px-3 py-4 bg-purple max-w-[350px] rounded-md bg-white w-full flex flex-col gap-3 items-center justify-center shadow-2xl '
    >
        <h2 className='font-bold text-3xl mb-3'>Signup</h2>

        <div className='px-3 w-full'>
            <label htmlFor="name" className='text-md font-semibold'>Name:</label>
            <input 
            id='name'
            type="text" 
            required 
            name="name"
            value={user.name} 
            onChange={handleChange} 
            className='w-full px-4 py-2 border-2 border-[#999] focus:border-[#333] rounded-md outline-none mt-2'
            placeholder='Enter Name'
            autoComplete='off'
            />
        </div>

        <div className='px-3 w-full'>
            <label htmlFor="email" className='text-md font-semibold'>Email Address:</label>
            <input 
            id='email'
            type="email" 
            required 
            name='email'
            value={user.email} 
            onChange={handleChange} 
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
                name='pass'
                value={user.pass} 
                onChange={handleChange} 
                className='w-full border-none outline-none'
                placeholder='Enter Password'
                autoComplete='off'
                />
                <i className={`fas fa-${showPass ? 'eye-slash' : 'eye'} cursor-pointer text-xl hover:text-purple-700`} 
                onClick={() => setShowPass(prev => !prev)}
                ></i>
            </div>
        </div>

        <div className='px-3 w-full'>
            <label htmlFor="cpass" className='text-md font-semibold'>Confirm Password:</label>
            <input 
            id='cpass'
            type={`${showPass ? "text" : "password"}`} 
            required 
            name='cpass'
            value={user.cpass} 
            onChange={handleChange} 
            className='w-full px-4 py-2 border-2 border-[#999] focus:border-[#333] rounded-md outline-none mt-2'
            placeholder='Re-enter Password'
            autoComplete='off'
            />
        </div>

        <div className='px-3 w-full mt-4'>
            <button className='w-full bg-purple-700 text-white text-xl py-2 rounded-md'>Signup</button>
        </div>

        <p className='text-md self-start pl-3 mt-2'>Already have an account? <Link to="/login" className='text-purple-500 cursor-pointer'>Login</Link></p>

    </form>
    </div>
    </>
  )
}
