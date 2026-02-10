import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [loading, setLoading] = useState(false); // Local loading state for Doctor Panel

  // Get Dashboard Data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", { headers: { dToken } });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Complete Appointment
  const completeAppointment = async (appointmentId) => {
    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/doctor/complete-appointment", { appointmentId }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        await getDashData(); // AUTO-REFRESH TRIGGER
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cancel Appointment
  const cancelAppointment = async (appointmentId) => {
    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/doctor/cancel-appointment", { appointmentId }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        await getDashData(); // AUTO-REFRESH TRIGGER
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
    dToken, setDToken,
    backendUrl,
    appointments, setAppointments,
    dashData, setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
    loading, setLoading
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;