import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext);

    const navigate = useNavigate();

    const logout = () => {
        navigate('/'); // Redirect to login page on logout
        if (aToken) {
            setAToken('');
            localStorage.removeItem('aToken');
        }
        if (dToken) {
            setDToken('');
            localStorage.removeItem('dToken');
        }
    }

    return (
        <div className='flex items-center justify-between px-4 py-3 bg-white border-b sm:px-10'>
            <div className='flex items-center gap-2 text-xs'>
                {/* Logo with onClick to navigate to Dashboard Home */}
                <img 
                    onClick={() => navigate('/')} 
                    className='cursor-pointer w-36 sm:w-40' 
                    src={assets.admin_logo} 
                    alt="Logo" 
                />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'> 
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>
            
            <button 
                onClick={logout} 
                className='bg-primary text-white text-sm px-8 py-1.5 sm:px-10 sm:py-2 rounded-full cursor-pointer transition-all hover:bg-opacity-90'
            >
                Logout
            </button> 
        </div>
    )
}

export default Navbar