import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditDoctor = () => {
    const { docId } = useParams()
    const { doctors, aToken, backendUrl, getAllDoctors, setLoading, loading } = useContext(AdminContext)
    const navigate = useNavigate()

    const [docData, setDocData] = useState(null) // Initialize as null for cleaner checks

    useEffect(() => {
    // This will run when the component mounts AND whenever the 'doctors' list updates
    if (doctors && doctors.length > 0) {
        const doctor = doctors.find(doc => doc._id === docId);
        if (doctor) {
            setDocData(doctor);
        }
    }
    }, [docId, doctors]); // Adding 'doctors' to the dependency array is the key

    const updateDoctor = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);

        // We send docData which now contains the _id and updated fields
        const { data } = await axios.post(
            backendUrl + '/api/admin/update-doctor', 
            docData, 
            { headers: { aToken } }
        );
        
        if (data.success) {
            toast.success(data.message);
            await getAllDoctors(); // This refreshes the local state in AdminContext
            navigate('/doctor-list');
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error("Frontend Update Error:", error);
        toast.error(error.response?.data?.message || error.message);
    } finally {
        setLoading(false);
    }
};

    // Prevents "undefined" errors during initial render
    if (!docData) {
        return <div className='m-5 text-gray-500'>Loading doctor data...</div>
    }

    return (
        <form onSubmit={updateDoctor} className='w-full m-5'>
            <p className='mb-3 text-lg font-medium text-gray-700'>Edit Doctor Profile</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-sm'>
                
                <div className='flex items-center gap-4 mb-8'>
                    <img className='object-cover w-24 h-24 border rounded-full bg-indigo-50' src={docData.image} alt="" />
                    <p className='text-xs text-gray-400'>ID: {docId}</p>
                </div>

                <div className='flex flex-col items-start gap-10 text-gray-600 lg:flex-row'>
                    <div className='flex flex-col w-full gap-4 lg:flex-1'>
                        
                        <div className='flex flex-col gap-1'>
                            <p>Doctor Name</p>
                            <input 
                                onChange={e => setDocData(prev => ({ ...prev, name: e.target.value }))} 
                                value={docData.name || ""} 
                                className='px-3 py-2 border rounded focus:outline-primary' 
                                type="text" required 
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select 
                                onChange={e => setDocData(prev => ({ ...prev, speciality: e.target.value }))} 
                                value={docData.speciality || "General physician"} 
                                className='px-3 py-2 border rounded'
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
                            <p>Fees</p>
                            <input 
                                onChange={e => setDocData(prev => ({ ...prev, fees: Number(e.target.value) }))} 
                                value={docData.fees || ""} 
                                className='px-3 py-2 border rounded' 
                                type="number" required 
                            />
                        </div>
                    </div>

                    <div className='flex flex-col w-full gap-4 lg:flex-1'>
                        <div className='flex flex-col gap-1'>
                            <p>Address</p>
                            <input 
                                onChange={e => setDocData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                value={docData.address?.line1 || ""} 
                                className='px-3 py-2 mb-2 border rounded' 
                                type="text" placeholder="Address 1" required 
                            />
                            <input 
                                onChange={e => setDocData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                value={docData.address?.line2 || ""} 
                                className='px-3 py-2 border rounded' 
                                type="text" placeholder="Address 2" required 
                            />
                        </div>

                        <div className='flex items-center gap-2 mt-4'>
                            <input 
                                onChange={() => setDocData(prev => ({ ...prev, available: !prev.available }))} 
                                checked={docData.available || false} 
                                type="checkbox" id='available' 
                            />
                            <label htmlFor="available" className='cursor-pointer'>Available for Appointments</label>
                        </div>
                    </div>
                </div>

                <div className='flex gap-4 mt-8'>
                    <button 
                        disabled={loading}
                        type='submit' 
                        className={`px-10 py-3 text-white rounded-full bg-primary ${loading ? 'opacity-70' : ''}`}
                    >
                        {loading ? 'Updating...' : 'Save Changes'}
                    </button>
                    <button type='button' onClick={() => navigate('/doctor-list')} className='px-10 py-3 text-gray-500 border rounded-full'>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default EditDoctor