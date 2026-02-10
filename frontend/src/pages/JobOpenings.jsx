import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const JobOpenings = () => {
    const navigate = useNavigate()
    const { token } = useContext(AppContext)

    const jobs = [
        { 
            id: 'senior-dev', 
            title: 'Senior Frontend Developer', 
            location: 'Remote / Washington',
            salary: '$90k - $120k',
            requirements: ['3+ years React experience', 'Tailwind CSS', 'Node.js'],
            description: 'Help us build the next generation of patient-doctor interaction tools.' 
        },
        { 
            id: 'med-writer', 
            title: 'Medical Content Writer', 
            location: 'Remote',
            salary: '$50k - $70k',
            requirements: ['Medical degree or equivalent', 'Excellent English', 'SEO knowledge'],
            description: 'Translate complex medical jargon into easy-to-read articles for our patients.' 
        }
    ]

    return (
        <div className='mx-4 sm:mx-[10%] mb-20'>
            <div className='pt-10 text-center'>
                <h1 className='text-3xl font-bold text-gray-800'>Career Opportunities</h1>
                <p className='mt-2 text-gray-500'>Join Prescripto and help shape the future of healthcare.</p>
            </div>

            <div className='grid gap-6 mt-12'>
                {jobs.map((job) => (
                    <div key={job.id} className='p-6 transition-all bg-white border rounded-xl border-zinc-200 hover:border-primary group'>
                        <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
                            <div className='flex-1'>
                                <h2 className='text-xl font-semibold text-gray-800'>{job.title}</h2>
                                <p className='text-sm font-medium text-primary'>{job.location} • {job.salary}</p>
                                <p className='mt-2 text-sm text-gray-600'>{job.description}</p>
                                
                                <div className='flex flex-wrap gap-2 mt-3'>
                                    {job.requirements.map((req, i) => (
                                        <span key={i} className='px-2 py-1 text-[10px] bg-zinc-100 text-zinc-600 rounded uppercase font-bold'>
                                            {req}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button 
                                onClick={() => token ? navigate(`/apply/${job.id}`) : navigate('/login')}
                                className='w-full px-8 py-3 text-white transition-all rounded-lg md:w-auto bg-primary hover:shadow-lg'
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobOpenings