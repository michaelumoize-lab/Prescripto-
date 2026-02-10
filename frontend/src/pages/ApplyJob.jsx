import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ApplyJob = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    experience: [{ company: '', role: '', years: '' }],
    resume: null,
    consent: false
  })

  // Function to add more experience rows
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', role: '', years: '' }]
    })
  }

  const handleInputChange = (index, event) => {
    const values = [...formData.experience]
    values[index][event.target.name] = event.target.value
    setFormData({ ...formData, experience: values })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.consent) {
      return toast.error("Please consent to data processing")
    }
    // Simulate API Call
    console.log("Application Data:", formData)
    toast.success("Application Submitted Successfully!")
    navigate('/job-openings')
  }

  return (
    <div className='mx-4 sm:mx-[10%] mb-20'>
      <div className='pt-10 text-center'>
        <p className='text-2xl text-gray-500'>APPLICATION FOR: <span className='font-semibold text-gray-700 uppercase'>{jobId.replace('-', ' ')}</span></p>
        <button onClick={() => navigate(-1)} className='mt-2 text-sm underline text-primary'>View other roles</button>
      </div>

      <form onSubmit={handleSubmit} className='max-w-3xl p-8 mx-auto mt-10 space-y-6 bg-white border rounded-xl border-zinc-200'>
        
        {/* Section 1: Personal Info */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <p className='mb-1 text-sm font-medium text-gray-600'>Full Name</p>
            <input required className='w-full p-2 border rounded border-zinc-300' type="text" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div>
            <p className='mb-1 text-sm font-medium text-gray-600'>Email Address</p>
            <input required className='w-full p-2 border rounded border-zinc-300' type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
        </div>

        {/* Section 2: Experience (Dynamic Fields) */}
        <div>
          <p className='mb-3 text-lg font-semibold text-gray-700'>Work History</p>
          {formData.experience.map((exp, index) => (
            <div key={index} className='grid grid-cols-1 gap-3 mb-3 md:grid-cols-3'>
              <input name="company" placeholder="Company" className='p-2 border rounded border-zinc-300' onChange={(e) => handleInputChange(index, e)} />
              <input name="role" placeholder="Role" className='p-2 border rounded border-zinc-300' onChange={(e) => handleInputChange(index, e)} />
              <input name="years" placeholder="Years" className='p-2 border rounded border-zinc-300' onChange={(e) => handleInputChange(index, e)} />
            </div>
          ))}
          <button type="button" onClick={addExperience} className='text-sm font-medium text-primary'>+ Add more experience</button>
        </div>

        {/* Section 3: Resume Upload UI */}
        <div className='p-6 border-2 border-dashed rounded-lg border-zinc-200 bg-zinc-50'>
          <p className='mb-2 text-sm font-medium text-gray-600'>Resume / CV (PDF Only)</p>
          <input 
            type="file" 
            accept=".pdf" 
            required 
            onChange={(e) => setFormData({...formData, resume: e.target.files[0]})}
            className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90'
          />
        </div>

        {/* Section 4: Privacy Consent */}
        <div className='flex items-start gap-2'>
          <input 
            type="checkbox" 
            id="consent" 
            className='mt-1' 
            onChange={(e) => setFormData({...formData, consent: e.target.checked})} 
          />
          <label htmlFor="consent" className='text-xs text-gray-500'>
            I agree to the storage and processing of my personal data for recruitment purposes by Prescripto Health Systems.
          </label>
        </div>

        <button type='submit' className='w-full py-3 text-white transition-all rounded-md bg-primary hover:shadow-lg'>
          Submit Professional Application
        </button>
      </form>
    </div>
  )
}

export default ApplyJob