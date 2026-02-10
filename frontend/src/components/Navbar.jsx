import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext);

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/')
  }

  return (
    <div className='flex items-center justify-between py-4 mb-5 text-sm border-b border-b-gray-400'>

      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className='cursor-pointer w-44'
        src={assets.logo}
        alt="Prescripto Logo"
      />

      {/* Desktop Menu */}
      <ul className='items-center hidden gap-5 font-medium md:flex'>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        {/* --- ADMIN LINKS SECTION --- */}
        <div className='flex gap-2 ml-2'>
          {/* Localhost Link */}
          <a 
            href="http://localhost:5174" 
            target="_blank" 
            rel="noopener noreferrer" 
            className='px-3 py-1 text-[10px] transition-all border rounded-full border-zinc-400 text-zinc-600 hover:bg-zinc-600 hover:text-white'
          >
            ADMIN (LOCAL)
          </a>

          {/* Production Link */}
          <a 
            href="https://prescripto-admin-ovst.onrender.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className='px-3 py-1 text-[10px] transition-all border rounded-full border-primary text-primary hover:bg-primary hover:text-white'
          >
            ADMIN (LIVE)
          </a>
        </div>
      </ul>

      {/* ... rest of your profile and mobile menu code remains exactly the same ... */}
      <div className='flex items-center gap-4'>
        {token ? (
          <div
            className='relative flex items-center gap-2 cursor-pointer group'
            onClick={() => {
              if (window.innerWidth < 768) {
                setShowProfileMenu(prev => !prev)
                setShowMobileMenu(false)
              }
            }}
          >
            <img className='rounded-full size-8' src={userData?.image || assets.profile_pic} alt="" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />

            <div
              className={`absolute top-0 right-0 z-20 pt-14 ${showProfileMenu ? 'block' : 'hidden'} md:hidden md:group-hover:block`}
            >
              <div className='flex flex-col gap-4 p-4 text-base font-medium text-gray-600 rounded min-w-48 bg-stone-100'>
                <p onClick={(e) => { e.stopPropagation(); navigate('/my-profile'); setShowProfileMenu(false) }} className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={(e) => { e.stopPropagation(); navigate('/my-appointments'); setShowProfileMenu(false) }} className='cursor-pointer hover:text-black'>My Appointments</p>
                <p onClick={(e) => { e.stopPropagation(); logout(); setShowProfileMenu(false) }} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='hidden px-8 py-3 font-light text-white rounded-full bg-primary md:block'>Create Account</button>
        )}

        <img
          onClick={() => { setShowMobileMenu(true); setShowProfileMenu(false) }}
          className='w-6 cursor-pointer md:hidden'
          src={assets.menu_icon}
          alt=""
        />

        <div className={`${showMobileMenu ? 'fixed w-full' : 'w-0 h-0'} md:hidden top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='cursor-pointer w-7' onClick={() => setShowMobileMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 px-5 mt-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMobileMenu(false)} to='/'><p className='px-4 py-2 rounded'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to='/doctors'><p className='px-4 py-2 rounded'>DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to='/about'><p className='px-4 py-2 rounded'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to='/contact'><p className='px-4 py-2 rounded'>CONTACT</p></NavLink>
            
            {/* Added Admin Links to Mobile Menu too */}
            <a href="http://localhost:5174" className='px-4 py-2 text-zinc-500'>ADMIN (LOCAL)</a>
            <a href="https://prescripto-admin-ovst.onrender.com" className='px-4 py-2 text-primary'>ADMIN (LIVE)</a>

            {!token && (
              <button onClick={() => { navigate('/login'); setShowMobileMenu(false); }} className='px-8 py-3 mt-4 text-white rounded-full bg-primary'>Create Account</button>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar