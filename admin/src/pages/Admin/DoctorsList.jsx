import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailablility } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>

      {doctors.length === 0 ? (
        /* --- Expanded Empty State Container --- */
        <div className='flex flex-col items-center justify-center w-full min-h-[50vh] mt-10 border-2 border-dashed rounded-2xl border-zinc-300 bg-zinc-50/50 px-10 md:px-40'>
          
          <div className='text-center'>
            <p className='text-2xl font-semibold text-zinc-700'>No Doctors Available</p>
            <p className='mt-2 text-zinc-500'>It looks like your directory is currently empty. Start by adding a new medical professional to the system.</p>
          </div>
          
          <button 
            onClick={() => navigate('/add-doctor')} 
            className='py-4 mt-8 text-white transition-all duration-200 rounded-full shadow-md px-14 bg-primary hover:bg-opacity-90 active:scale-95'
          >
            + Add New Doctor
          </button>
          
        </div>
      ) : (
        <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6'>
          {
            doctors.map((item, index) => (
              <div className='overflow-hidden border border-indigo-200 cursor-pointer rounded-xl max-w-56 group' key={index}>
                <img className='transition-all duration-500 bg-indigo-50 group-hover:bg-primary' src={item.image} alt="" />
                <div className='p-4'>
                  <p className='text-lg font-medium text-neutral-800'>{item.name}</p>
                  <p className='text-sm text-zinc-600'>{item.speciality}</p>
                  <div className='flex items-center gap-1 mt-2 text-sm'>
                    <input onChange={() => changeAvailablility(item._id)} type="checkbox" checked={item.available} />
                    <p>Available</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}

export default DoctorsList