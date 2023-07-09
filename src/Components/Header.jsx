import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Header = ({ user, setUser }) => {

  const [menuIsOpen, setmenuIsOpen] = useState(false)

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/login")
  }
  

  return (
    <header className='relative shadow-2xl flex items-center z-50 justify-between w-full py-4 px-5'>

      <div className='text-2xl text-white font-extrabold cursor-pointer'>
        <Link to="/">LOGO</Link>
      </div>

      {!menuIsOpen ? (
      <nav className='items-center justify-between gap-4 md:flex hidden'>
        {!user ? (
          <>
        <Link to="/login"
        onClick={() => setmenuIsOpen(false)}
        >
          <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'>Login</button>
        </Link>
        <Link to="/signup"
        onClick={() => setmenuIsOpen(false)}
        >
          <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'>Signup</button>
        </Link> 
          </>
        ) : (
          <div className='flex items-center justify-center gap-2'>
            <p className='text-white text-sm'>Logged in as: {user.name}</p>
            <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md' onClick={logout}>Logout</button>
          </div>
        )
      }
      </nav>
      )
      : (
        <nav className='flex justify-center absolute top-[100%] left-0 px-4 py-5 bg-transparent shadow-2xl w-full flex-col items-start gap-4'>

        <div className='flex items-center gap-4'>
          {!user ? (
            <>
            <Link to="/login"
            onClick={() => setmenuIsOpen(false)}
            >
            <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'>Login</button>
          </Link>
          <Link to="/signup"
          onClick={() => setmenuIsOpen(false)}
          >
            <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'>Signup</button>
          </Link>
            </>
        ) : 
        <div className='flex flex-col justify-center gap-2'>
          <p className='text-white text-sm'>Logged in as: {user.name}</p>
          <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md' onClick={logout}>Logout</button>
        </div>
        }
        </div>

        </nav>
      )
    }
    <div className='md:hidden'>
      <i className={`fas fa-${menuIsOpen ? 'times' : 'bars'} text-white cursor-pointer text-2xl font-extrabold`}
      onClick={() => setmenuIsOpen(prev => !prev)}
      ></i>
    </div>

      

    </header>
  )
}
