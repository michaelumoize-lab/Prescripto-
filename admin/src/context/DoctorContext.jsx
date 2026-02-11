import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= DASHBOARD DATA =================
  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/dashboard",
        { headers: { dToken } }
      );

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= PROFILE DATA =================
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/profile",
        { headers: { dToken } }
      );

      if (data.success) {
        setProfileData(data.profile);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= COMPLETE APPOINTMENT =================
  const completeAppointment = async (appointmentId) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        await getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= CANCEL APPOINTMENT =================
  const cancelAppointment = async (appointmentId) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        await getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    dashData,
    setDashData,
    profileData,
    getProfileData,
    getDashData,
    completeAppointment,
    cancelAppointment,
    loading,
    setLoading,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
