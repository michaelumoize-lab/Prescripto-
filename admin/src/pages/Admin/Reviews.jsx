import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Reviews = () => {
    const { aToken, backendUrl } = useContext(AdminContext)
    const [reviews, setReviews] = useState([])

    const fetchAllReviews = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-reviews', { headers: { aToken } })
            if (data.success) {
                setReviews(data.reviews)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (aToken) fetchAllReviews()
    }, [aToken])

    return (
        <div className='w-full m-5'>
            <p className='mb-3 text-lg font-medium'>User Feedback & Reviews</p>
            <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
                <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr] py-3 px-6 border-b bg-gray-50 font-semibold'>
                    <p>#</p>
                    <p>User</p>
                    <p>Rating</p>
                    <p>Comment</p>
                </div>
                {reviews.map((item, index) => (
                    <div className='grid grid-cols-[0.5fr_2fr_1fr_3fr] items-center py-3 px-6 border-b hover:bg-gray-50' key={index}>
                        <p>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img className='w-8 rounded-full' src={item.userImage} alt="" /> <p>{item.userName}</p>
                        </div>
                        <p className='text-yellow-500'>{"⭐".repeat(item.rating)}</p>
                        <p>{item.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews