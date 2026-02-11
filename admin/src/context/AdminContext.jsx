import { createContext, useState, useEffect, useCallback } from "react"; // Added useCallback
import axios from "axios";
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");

    const updateAToken = (token) => {
        setAToken(token);
        if (token) {
            localStorage.setItem('aToken', token);
        } else {
            localStorage.removeItem('aToken');
        }
    };

    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        if (!aToken) return; // Guard
        setLoading(true);
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } });
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const changeAvailablility = async (docId) => {
        setLoading(true);
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const getAllAppointments = async () => {
        if (!aToken) return; // Guard
        setLoading(true);
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } });
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        setLoading(true);
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                await getAllAppointments()
                await getDashData() 
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const getDashData = async () => {
        if (!aToken) return; // Guard
        setLoading(true);
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    // --- AUTOMATIC DATA FETCH ON REFRESH ---
    useEffect(() => {
        if (aToken) {
            // Only fetch if we don't already have the data
            if (doctors.length === 0) getAllDoctors();
            if (appointments.length === 0) getAllAppointments();
            if (!dashData) getDashData();
        }
    }, [aToken]); 

    const value = {
        aToken, setAToken: updateAToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailablility,
        appointments, setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData, getDashData,
        loading, setLoading 
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
};

export default AdminContextProvider