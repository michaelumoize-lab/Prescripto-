import React, { useContext, useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditDoctor = () => {
    const { docId } = useParams()
    const { doctors, aToken, backendUrl, getAllDoctors, setLoading, loading } = useContext(AdminContext)
    const navigate = useNavigate()

    // Initialize state with an object structure to avoid 'undefined' errors during first render
    const [docData, setDocData] = useState({
        name: '',
        speciality: 'General physician',
        fees: 0,
        address: { line1: '', line2: '' },
        available: false,
        image: ''
    })

    // Use useMemo to find the doctor so we don't re-run the search logic on every render
    const foundDoctor = useMemo(() => {
        return doctors.find(doc => doc._id === docId)
    }, [doctors, docId])

    useEffect(() => {
        if (foundDoctor) {
            setDocData(foundDoctor)
        } else if (aToken && doctors.length === 0) {
            getAllDoctors()
        }
    }, [foundDoctor, aToken, doctors.length, getAllDoctors])

    const updateDoctor = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            // Ensure data types are correct (e.g., fees as Number)
            const payload = { ...docData, fees: Number(docData.fees) }
            
            const { data } = await axios.post(
                `${backendUrl}/api/admin/update-doctor`,
                payload,
                { headers: { aToken } }
            )

            if (data.success) {
                toast.success("Profile updated successfully")
                await getAllDoctors() // Refresh the global list
                navigate('/doctor-list')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Server Error")
        } finally {
            setLoading(false)
        }
    }

    // Only show the loader if we have NO data and are actually fetching
    if (!foundDoctor && doctors.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-[60vh] w-full'>
                <div className='flex flex-col items-center gap-3 p-8 bg-white shadow-xl rounded-2xl'>
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-100 rounded-full"></div>
                        <div className="absolute top-0 w-16 h-16 border-4 border-t-primary rounded-full animate-spin"></div>
                    </div>
                    <p className='text-lg font-medium text-zinc-500 animate-pulse'>Loading doctor profile...</p>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={updateDoctor} className='w-full m-5 duration-500 animate-in fade-in'>
            <div className='flex items-center justify-between max-w-4xl mb-6'>
                <div>
                    <h2 className='text-xl font-semibold text-zinc-800'>Edit Doctor Profile</h2>
                    <p className='text-sm text-zinc-500'>Update credentials and availability for {docData.name}</p>
                </div>
                <button type='button' onClick={() => navigate('/doctor-list')} className='text-sm text-primary hover:underline'>
                    Back to List
                </button>
            </div>

            <div className='w-full max-w-4xl p-8 bg-white border shadow-sm border-zinc-200 rounded-2xl'>
                {/* Profile Header */}
                <div className='flex items-center gap-6 pb-8 mb-8 border-b border-zinc-100'>
                    <div className='relative'>
                        <img className='object-cover w-20 h-20 border-2 border-indigo-100 rounded-full bg-indigo-50' src={docData.image} alt="" />
                        <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${docData.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div>
                        <p className='font-medium text-zinc-800'>{docData.name || "Doctor Name"}</p>
                        <p className='text-xs text-zinc-400'>System ID: {docId}</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-zinc-600'>
                    {/* Left Column */}
                    <div className='space-y-4'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-medium'>Full Name</label>
                            <input 
                                onChange={e => setDocData(prev => ({ ...prev, name: e.target.value }))} 
                                value={docData.name} 
                                className='px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all' 
                                type="text" required 
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-medium'>Speciality</label>
                            <select 
                                onChange={e => setDocData(prev => ({ ...prev, speciality: e.target.value }))} 
                                value={docData.speciality} 
                                className='px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg outline-none'
                            >
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-medium'>Consultation Fees ($)</label>
                            <input 
                                onChange={e => setDocData(prev => ({ ...prev, fees: e.target.value }))} 
                                value={docData.fees} 
                                className='px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg outline-none' 
                                type="number" required 
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='space-y-4'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-medium'>Clinic Address</label>
                            <input 
                                onChange={e => setDocData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                value={docData.address.line1} 
                                className='px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg outline-none mb-2' 
                                type="text" placeholder="Street address" required 
                            />
                            <input 
                                onChange={e => setDocData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                value={docData.address.line2} 
                                className='px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg outline-none' 
                                type="text" placeholder="Suite / Landmark" required 
                            />
                        </div>

                        <div className='pt-4'>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={docData.available}
                                    onChange={() => setDocData(prev => ({ ...prev, available: !prev.available }))}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                <span className="ml-3 text-sm font-medium text-zinc-600">Available for Appointments</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-4 pt-6 mt-12 border-t border-zinc-100'>
                    <button 
                        disabled={loading}
                        type='submit' 
                        className='px-12 py-3 font-medium text-white transition-all rounded-full bg-primary hover:shadow-lg hover:shadow-indigo-100 disabled:bg-zinc-400'
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                        type='button' 
                        onClick={() => navigate('/doctor-list')} 
                        className='px-12 py-3 font-medium transition-all border rounded-full text-zinc-500 border-zinc-200 hover:bg-zinc-50'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditDoctor