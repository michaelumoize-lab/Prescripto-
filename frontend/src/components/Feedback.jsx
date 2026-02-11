import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Feedback = () => {
    const { backendUrl, token, userData } = useContext(AppContext);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            return toast.warn("Please login to submit feedback");
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/user/add-review', 
            { 
                userId: userData._id, 
                userName: userData.name, 
                userImage: userData.image, 
                rating, 
                comment 
            }, 
            { headers: { token } });

            if (data.success) {
                toast.success("Thank you for your feedback!");
                setComment('');
                setRating(5);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='flex flex-col items-center gap-4 px-5 py-16 mt-10 text-gray-800 bg-white border shadow-sm rounded-xl'>
            <h2 className='text-3xl font-semibold text-primary'>Share Your Experience</h2>
            <p className='text-gray-500 text-center max-w-[400px] mb-4'>
                Your feedback helps us improve our healthcare services for everyone.
            </p>

            <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-lg gap-4'>
                <div className='flex flex-col gap-2'>
                    <label className='font-medium'>Rating</label>
                    <select 
                        value={rating} 
                        onChange={(e) => setRating(Number(e.target.value))}
                        className='p-2 transition-all border border-gray-300 rounded-md outline-none focus:border-primary'
                    >
                        <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                        <option value="4">⭐⭐⭐⭐ (Very Good)</option>
                        <option value="3">⭐⭐⭐ (Good)</option>
                        <option value="2">⭐⭐ (Fair)</option>
                        <option value="1">⭐ (Poor)</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='font-medium'>Your Review</label>
                    <textarea 
                        required
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us what you liked or how we can improve..."
                        className='p-3 transition-all border border-gray-300 rounded-md outline-none resize-none focus:border-primary'
                    ></textarea>
                </div>

                <button 
                    type='submit' 
                    className='py-3 mt-2 font-medium text-white transition-all rounded-full bg-primary hover:bg-opacity-90 active:scale-95'
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default Feedback;