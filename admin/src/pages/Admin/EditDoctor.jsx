import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditDoctor = () => {
    const { docId } = useParams()
    const { doctors, aToken, backendUrl, getAllDoctors } = useContext(AdminContext)
    const navigate = useNavigate()

    const [docData, setDocData] = useState(false)

    // Fetch the specific doctor from the doctors list
    useEffect(() => {
        const doctor = doctors.find(doc => doc._id === docId)
        if (doctor) {
            setDocData(doctor)
        }
    }, [docId, doctors])

    const updateDoctor = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/update-doctor', { ...docData }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors() // Refresh the list
                navigate('/doctor-list')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return docData && (
        <form onSubmit={updateDoctor} className='w-full m-5'>
            <p className='mb-3 text-lg font-medium'>Edit Doctor Profile</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <img className='w-20 bg-gray-100 rounded-full cursor-pointer' src={docData.image} alt="" />
                </div>

                <div className='flex flex-col items-start gap-10 text-gray-600 lg:flex-row'>
                    <div className='flex flex-col w-full gap-4 lg:flex-1'>
                        <div className='flex flex-col flex-1 gap-1'>
                            <p>Doctor Name</p>
                            <input onChange={e => setDocData(prev => ({ ...prev, name: e.target.value }))} value={docData.name} className='px-3 py-2 border rounded' type="text" required />
                        </div>
                        <div className='flex flex-col flex-1 gap-1'>
                            <p>Speciality</p>
                            <select onChange={e => setDocData(prev => ({ ...prev, speciality: e.target.value }))} value={docData.speciality} className='px-3 py-2 border rounded'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                {/* Add all your specialities here */}
                            </select>
                        </div>
                    </div>
                </div>
                
                <button type='submit' className='px-10 py-3 mt-4 text-white rounded-full bg-primary'>Save Changes</button>
            </div>
        </form>
    )
}

export default EditDoctor