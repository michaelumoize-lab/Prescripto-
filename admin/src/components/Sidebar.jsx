import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
    const { aToken, getAllDoctors } = useContext(AdminContext); // Get your fetch function
    const { dToken, getAppointments } = useContext(DoctorContext); // Get doctor fetch function

    return (
        <div className='min-h-screen bg-white border-r'>
            {aToken && (
                <ul className='text-[#515151] mt-5'>
                    {/* ... other links ... */}
                    
                    <NavLink 
                        onClick={() => getAllDoctors()} // Force a re-fetch when clicked
                        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} 
                        to={'/doctor-list'}
                    >
                        <img src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Doctors List</p>
                    </NavLink>
                </ul>
            )}
            
            {/* Repeat similar logic for dToken links if needed */}
        </div>
    )
}

export default Sidebar