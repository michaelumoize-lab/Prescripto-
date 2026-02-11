import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailablility, setLoading, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();

  // Search and Confirmation Modal States
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [docToDelete, setDocToDelete] = useState(null)

  useEffect(() => {
    if (aToken && doctors.length === 0) {
      getAllDoctors();
    }
  }, [aToken, doctors.length, getAllDoctors])

  const handleAvailability = async (docId) => {
    setLoading(true)
    await changeAvailablility(docId)
    setLoading(false)
  }

  // Opens the custom modal and prepares the ID
  const openDeleteModal = (doctor) => {
    setDocToDelete(doctor)
    setShowModal(true)
  }

  // The actual backend call
  const deleteDoctor = async () => {
    try {
      setShowModal(false)
      setLoading(true)
      const { data } = await axios.post(backendUrl + '/api/admin/delete-doctor', { docId: docToDelete._id }, { headers: { aToken } })
      
      if (data.success) {
        toast.success("Doctor record deleted successfully")
        getAllDoctors() // Refresh list
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Error deleting doctor")
    } finally {
      setLoading(false)
    }
  }

  const filteredDoctors = doctors.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.speciality.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll scrollbar-hide relative'>
      
      {/* --- CUSTOM CONFIRMATION MODAL --- */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
          <div className='w-full max-w-sm p-8 mx-4 duration-200 bg-white shadow-2xl rounded-2xl animate-in zoom-in'>
            <div className='text-center'>
              <div className='flex items-center justify-center w-20 h-20 mx-auto mb-4 text-red-500 rounded-full bg-red-50'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
              <h2 className='text-xl font-bold text-slate-800'>Are you sure?</h2>
              <p className='mt-2 text-slate-500'>
                This will permanently delete <b>{docToDelete?.name}</b> from the database. This action cannot be undone.
              </p>
            </div>
            <div className='flex gap-4 mt-8'>
              <button 
                onClick={() => setShowModal(false)}
                className='flex-1 py-3 font-semibold transition-all text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200'
              >
                Cancel
              </button>
              <button 
                onClick={deleteDoctor}
                className='flex-1 py-3 font-semibold text-white transition-all bg-red-500 shadow-lg rounded-xl hover:bg-red-600 shadow-red-200'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with Search */}
      <div className='flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-center'>
        <h1 className='text-lg font-medium text-slate-700'>All Doctors</h1>
        <input 
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text" 
          placeholder='Search doctor name...' 
          className='w-full px-4 py-2 text-sm border outline-none md:max-w-xs border-zinc-300 rounded-xl focus:border-primary'
        />
      </div>

      {filteredDoctors.length === 0 ? (
        <div className='flex flex-col items-center justify-center w-full min-h-[50vh] border-2 border-dashed rounded-2xl border-zinc-200 bg-zinc-50/30'>
          <p className='text-lg font-medium text-zinc-500'>No doctors matching your search.</p>
        </div>
      ) : (
        <div className='flex flex-wrap w-full gap-6 pb-10'>
          {filteredDoctors.map((item, index) => (
            <div 
              className='flex flex-col overflow-hidden transition-all duration-300 border border-indigo-100 rounded-xl w-full sm:w-[220px] hover:shadow-md bg-white group' 
              key={index}
            >
              <div className='relative overflow-hidden bg-indigo-50'>
                <img 
                  className='object-cover w-full h-48 transition-all duration-500 group-hover:scale-105' 
                  src={item.image} 
                  alt={item.name} 
                />
                {/* Delete button (Custom Icon) */}
                <button 
                  onClick={() => openDeleteModal(item)}
                  className='absolute p-2 text-red-500 transition-all rounded-full shadow-md top-2 right-2 bg-white/90 backdrop-blur hover:bg-red-500 hover:text-white'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>

              <div className='p-4'>
                <p className='text-base font-semibold truncate text-neutral-800'>{item.name}</p>
                <p className='mb-3 text-xs font-medium text-zinc-500'>{item.speciality}</p>
                
                <div className='flex items-center gap-2 mb-4'>
                  <input 
                    onChange={() => handleAvailability(item._id)} 
                    type="checkbox" 
                    id={`avail-${item._id}`}
                    checked={item.available} 
                    className='w-4 h-4 rounded cursor-pointer accent-primary'
                  />
                  <label htmlFor={`avail-${item._id}`} className='text-xs font-medium cursor-pointer text-zinc-600'>
                    {item.available ? 'Available' : 'Unavailable'}
                  </label>
                </div>

                <button 
                  onClick={() => navigate(`/edit-doctor/${item._id}`)}
                  className='w-full py-2 text-xs font-medium transition-all border rounded-lg border-primary text-primary hover:bg-primary hover:text-white'
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorsList