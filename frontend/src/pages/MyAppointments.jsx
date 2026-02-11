import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from './../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {

    const { backendUrl, token, getDoctorsData, setLoading } = useContext(AppContext)

    const [appointments, setAppointments] = useState([])
    const [filter, setFilter] = useState('All') // New Filter State
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const [showCancelModal, setShowCancelModal] = useState(false)
    const [appointmentIdToCancel, setAppointmentIdToCancel] = useState(null)

    const navigate = useNavigate();

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('-')
        return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // --- FILTER LOGIC ---
    const filteredAppointments = appointments.filter(item => {
        if (filter === 'All') return true;
        if (filter === 'Cancelled') return item.cancelled;
        if (filter === 'Completed') return item.isCompleted;
        if (filter === 'Paid') return item.payment && !item.cancelled && !item.isCompleted;
        return true;
    })

    const cancelAppointment = async () => {
        try {
            setLoading(true)
            setShowCancelModal(false)
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId: appointmentIdToCancel }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
            setAppointmentIdToCancel(null)
        }
    }

    const openCancelModal = (id) => {
        setAppointmentIdToCancel(id)
        setShowCancelModal(true)
    }

    // Payment and Effect logic remains the same...
    useEffect(() => {
        if (token) getUserAppointments()
    }, [token])

    return (
        <div className='relative'>
            <div className='flex flex-col justify-between gap-4 mt-12 mb-4 border-b sm:flex-row sm:items-center'>
                <p className='pb-3 font-medium text-zinc-700'>My Appointments</p>
                
                {/* --- FILTER BUTTONS --- */}
                <div className='flex gap-2 pb-3 overflow-x-auto text-xs sm:text-sm'>
                    {['All', 'Paid', 'Completed', 'Cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-1.5 border rounded-full transition-all whitespace-nowrap ${
                                filter === status 
                                ? 'bg-primary text-white border-primary' 
                                : 'text-zinc-500 border-zinc-300 hover:border-primary'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Cancel Modal stays here... */}
            {showCancelModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
                    {/* ... (Previous Modal Code) ... */}
                    <div className='w-full max-w-sm p-8 mx-4 bg-white shadow-2xl rounded-2xl'>
                         <div className='text-center'>
                            <h2 className='text-xl font-bold text-slate-800'>Cancel Appointment?</h2>
                            <p className='mt-2 text-slate-500'>Are you sure? This cannot be undone.</p>
                        </div>
                        <div className='flex gap-3 mt-8'>
                            <button onClick={() => setShowCancelModal(false)} className='flex-1 py-2.5 bg-slate-100 rounded-xl'>No</button>
                            <button onClick={cancelAppointment} className='flex-1 py-2.5 bg-red-500 text-white rounded-xl'>Yes, Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div>
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((item, index) => (
                        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b' key={index}>
                            <div>
                                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
                            </div>
                            <div className='flex-1 text-sm text-zinc-600'>
                                <p className='font-semibold text-neutral-800'>{item.docData.name}</p>
                                <p>{item.docData.speciality}</p>
                                <p className='mt-1 font-medium text-zinc-700'>Address:</p>
                                <p className='text-xs'>{item.docData.address.line1}</p>
                                <p className='text-xs'>{item.docData.address.line2}</p>
                                <p className='mt-1 text-xs'><span className='text-sm font-medium text-neutral-700'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
                            </div>
                            <div className='flex flex-col justify-end gap-2'>
                                {!item.cancelled && item.payment && !item.isCompleted && <button className='py-2 border rounded sm:min-w-48 text-stone-500 bg-indigo-50'>Paid</button>}
                                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className='py-2 text-sm text-center transition-all duration-300 border rounded text-stone-500 sm:min-w-48 hover:bg-primary hover:text-white'>Pay Online</button>}
                                {!item.cancelled && !item.isCompleted && <button onClick={() => openCancelModal(item._id)} className='py-2 text-sm text-center transition-all duration-300 border rounded text-stone-500 sm:min-w-48 hover:bg-red-600 hover:text-white'>Cancel appointment</button>}
                                {item.cancelled && !item.isCompleted && <button className='py-2 text-sm text-center text-red-500 border border-red-500 rounded sm:min-w-48'>Appointment Cancelled</button>}
                                {item.isCompleted && <button className='py-2 text-sm text-center text-green-500 border border-green-500 rounded sm:min-w-48'>Completed</button>}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex flex-col items-center justify-center h-64 text-zinc-400'>
                        <p>No {filter.toLowerCase()} appointments found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyAppointments