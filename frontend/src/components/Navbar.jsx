import React, { useState, useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext);

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  
  // --- 1. Create a reference for the profile menu ---
  const profileMenuRef = useRef(null);

  // --- 2. Logic to close dropdown when clicking anywhere else ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the clicked element is NOT part of the menu
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    // Add listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logic to prevent background scroll for Mobile Menu
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [showMobileMenu]);

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/')
  }

  return (
    <div className='flex items-center justify-between py-4 mb-5 text-sm border-b border-b-gray-400'>

      <img onClick={() => navigate('/')} className='cursor-pointer w-44' src={assets.logo} alt="Logo" />

      <ul className='items-center hidden gap-5 font-medium md:flex'>
        <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
        <NavLink to='/doctors'><li className='py-1'>ALL DOCTORS</li></NavLink>
        <NavLink to='/about'><li className='py-1'>ABOUT</li></NavLink>
        <NavLink to='/contact'><li className='py-1'>CONTACT</li></NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {token ? (
          <div
            // --- 3. Attach the ref here ---
            ref={profileMenuRef} 
            className='relative flex items-center gap-2 cursor-pointer group'
            onClick={() => setShowProfileMenu(prev => !prev)}
          >
            <img className='rounded-full size-8' src={userData?.image || assets.profile_pic} alt="" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />

            {/* --- Profile Dropdown --- */}
            <div className={`absolute top-0 right-0 z-20 pt-14 ${showProfileMenu ? 'block' : 'hidden'}`}>
              <div className='flex flex-col gap-4 p-4 text-base font-medium text-gray-600 rounded shadow-xl min-w-48 bg-stone-100'>
                <p onClick={() => { navigate('/my-profile'); setShowProfileMenu(false) }} className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => { navigate('/my-appointments'); setShowProfileMenu(false) }} className='cursor-pointer hover:text-black'>My Appointments</p>
                <p onClick={() => { logout(); setShowProfileMenu(false) }} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='hidden px-8 py-3 font-light text-white rounded-full bg-primary md:block'>Create Account</button>
        )}

        {/* Mobile Menu Icon */}
        <img onClick={() => setShowMobileMenu(true)} className='w-6 cursor-pointer md:hidden' src={assets.menu_icon} alt="" />

        {/* --- Mobile Menu Drawer --- */}
        <div className={`${showMobileMenu ? 'fixed w-full h-full' : 'w-0 h-0'} md:hidden top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='cursor-pointer w-7' onClick={() => setShowMobileMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 px-5 mt-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMobileMenu(false)} to='/'><p className='px-4 py-2 rounded'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to='/doctors'><p className='px-4 py-2 rounded'>DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to='/about'><p className='px-4 py-2 rounded'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to='/contact'><p className='px-4 py-2 rounded'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar