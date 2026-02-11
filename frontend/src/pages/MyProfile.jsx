import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {

    const { userData, setUserData, token, setToken, backendUrl, loadUserProfileData, setLoading } = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    
    // --- NEW MODAL STATE ---
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const deleteAccount = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(backendUrl + '/api/user/delete-account', {}, { headers: { token } });

            if (data.success) {
                toast.success("Account deleted successfully");
                setToken(false);
                localStorage.removeItem('token');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setShowDeleteModal(false);
            setLoading(false);
        }
    };

    const updateUserProfileData = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("phone", userData.phone);
            formData.append("address", JSON.stringify(userData.address));
            formData.append("gender", userData.gender);
            formData.append("dob", userData.dob);

            image && formData.append("image", image);

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return userData && (
        <div className='relative flex flex-col max-w-lg gap-2 text-sm'>

            {/* --- CUSTOM DELETE CONFIRMATION MODAL --- */}
            {showDeleteModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
                    <div className='w-full max-w-sm p-8 mx-4 duration-200 bg-white shadow-2xl rounded-2xl animate-in zoom-in'>
                        <div className='text-center'>
                            <div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 text-red-500 rounded-full bg-red-50'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <h2 className='text-xl font-bold text-slate-800'>Delete Account?</h2>
                            <p className='mt-2 text-slate-500'>
                                Are you sure you want to delete your account? All your data will be <b>permanently removed</b>.
                            </p>
                        </div>
                        <div className='flex gap-3 mt-8'>
                            <button 
                                onClick={() => setShowDeleteModal(false)}
                                className='flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-all'
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={deleteAccount}
                                className='flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all'
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Existing Profile UI */}
            {
                isEdit
                    ? <label htmlFor='image'>
                        <div className='relative inline-block cursor-pointers'>
                            <img className="rounded opacity-75 w-36" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                            <img className="absolute w-10 bottom-12 right-12" src={image ? null : assets.upload_icon} alt="" />
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                    : <img className="rounded w-36" src={userData.image} alt="" />
            }

            {
                isEdit
                    ? <input className="mt-4 text-3xl font-medium bg-gray-50 max-w-60" type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                    : <p className="mt-4 text-3xl font-medium text-neutral-800">{userData.name}</p>
            }

            <hr className="bg-zinc-400 h-[1px] border-none" />

            <div>
                <p className="mt-3 underline text-neutral-500">CONTACT INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Email id:</p>
                    <p className="text-blue-500">{userData.email}</p>
                    <p className="font-medium">Phone:</p>
                    {
                        isEdit
                            ? <input className="bg-gray-100 max-w-52" type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                            : <p className="text-blue-400">{userData.phone}</p>
                    }
                    <p className="font-medium">Address:</p>
                    {
                        isEdit
                            ? <p>
                                <input className="bg-gray-50" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
                                <br />
                                <input className="bg-gray-50" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
                            </p>
                            : <p className="text-gray-500">
                                {userData.address.line1}
                                <br />
                                {userData.address.line2}
                            </p>
                    }
                </div>
            </div>
            <div>
                <p className="mt-3 underline text-neutral-500">BASIC INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Gender:</p>
                    {
                        isEdit
                            ? <select className="bg-gray-100 max-w-20" onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            : <p className="text-gray-400">{userData.gender}</p>
                    }
                    <p className="font-medium">Birthday:</p>
                    {
                        isEdit
                            ? <input className="bg-gray-100 max-w-28" type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                            : <p className="text-gray-400">{userData.dob}</p>
                    }
                </div>
            </div>

            <div className="flex gap-4 mt-10">
                {
                    isEdit
                        ? <button className="px-8 py-2 transition-all border rounded-full border-primary hover:bg-primary hover:text-white" onClick={updateUserProfileData}>Save Information</button>
                        : <button className="px-8 py-2 transition-all border rounded-full border-primary hover:bg-primary hover:text-white" onClick={() => setIsEdit(true)}>Edit</button>
                }

                {!isEdit && (
                    <button 
                        className="px-8 py-2 text-red-500 transition-all border border-red-500 rounded-full hover:bg-red-500 hover:text-white" 
                        onClick={() => setShowDeleteModal(true)} // Opens UI modal
                    >
                        Delete Account
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;