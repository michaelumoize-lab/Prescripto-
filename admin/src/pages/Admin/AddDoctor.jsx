import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
    // State variables for form inputs
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Year");
    const [fees, setFees] = useState("");
    const [about, setAbout] = useState("");
    const [speciality, setSpeciality] = useState("General physician");
    const [degree, setDegree] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const { backendUrl, aToken, setLoading, loading } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error("Please select a doctor image");
            }

            setLoading(true);

            const formData = new FormData();

            // Appending all fields to FormData
            formData.append("image", docImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fees", Number(fees));
            formData.append("about", about);
            formData.append("speciality", speciality);
            formData.append("degree", degree);
            formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(
                backendUrl + '/api/admin/add-doctor', 
                formData, 
                { headers: { aToken } }
            );

            if (data.success) {
                toast.success(data.message);
                
                // Resetting form fields after success
                setDocImg(false);
                setName("");
                setEmail("");
                setPassword("");
                setFees("");
                setAbout("");
                setDegree("");
                setAddress1("");
                setAddress2("");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="w-full m-5">
            <p className="mb-5 text-lg font-medium text-gray-700">Add Doctor</p>

            <div className="px-8 py-8 bg-white border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-sm">
                
                {/* Image Upload Section */}
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img 
                            className="object-cover w-16 h-16 bg-gray-100 border-2 border-gray-300 border-dashed rounded-full cursor-pointer" 
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                            alt="upload" 
                        />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p className="text-sm">
                        Upload Doctor <br /> Image
                    </p>
                </div>

                <div className="flex flex-col items-start gap-10 text-gray-600 lg:flex-row">
                    
                    {/* Left Column */}
                    <div className="flex flex-col w-full gap-4 lg:flex-1">
                        <div className="flex flex-col gap-1">
                            <p>Doctor Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className="px-3 py-2 border rounded focus:outline-primary" type="text" placeholder="Name" required />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="px-3 py-2 border rounded focus:outline-primary" type="email" placeholder="Email" required />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Doctor Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="px-3 py-2 border rounded focus:outline-primary" type="password" placeholder="Password" required />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className="px-3 py-2 border rounded focus:outline-primary">
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={`${i + 1} Year${i > 0 ? 's' : ''}`}>{i + 1} Year{i > 0 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className="px-3 py-2 border rounded focus:outline-primary" type="number" placeholder="Fees" required />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col w-full gap-4 lg:flex-1">
                        <div className="flex flex-col gap-1">
                            <p>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="px-3 py-2 border rounded focus:outline-primary">
                                <option value="General Physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className="px-3 py-2 border rounded focus:outline-primary" type="text" placeholder="Education" required />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="px-3 py-2 mb-2 border rounded focus:outline-primary" type="text" placeholder="Address 1" required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="px-3 py-2 border rounded focus:outline-primary" type="text" placeholder="Address 2" required />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mt-4 mb-2">About Doctor</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded focus:outline-primary" placeholder="Write about doctor" rows={5} required />
                </div>

                <button 
                    disabled={loading}
                    type="submit" 
                    className={`px-10 py-3 mt-4 text-sm text-white rounded-full bg-primary transition-all ${loading ? 'opacity-70 cursor-wait' : 'hover:bg-blue-700'}`}
                >
                    {loading ? 'Adding Doctor...' : 'Add Doctor'}
                </button>
            </div>
        </form>
    );
};

export default AddDoctor;