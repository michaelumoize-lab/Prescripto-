import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { 
    dToken, 
    dashData, 
    setDashData, // Added setDashData
    getDashData, 
    cancelAppointment, 
    completeAppointment,
    loading 
  } = useContext(DoctorContext);
  
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
    // Cleanup dashData on unmount to prevent seeing old data when returning to dashboard
    return () => setDashData(false);
  }, [dToken]);

  return dashData && slotDateFormat ? (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 p-4 transition-all bg-white border-2 border-gray-100 rounded cursor-pointer min-w-52 hover:scale-105">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{currency}{dashData.earnings || 0}</p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 transition-all bg-white border-2 border-gray-100 rounded cursor-pointer min-w-52 hover:scale-105">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 transition-all bg-white border-2 border-gray-100 rounded cursor-pointer min-w-52 hover:scale-105">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments.map((item, index) => (
            <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100" key={index}>
              <img className="rounded-full size-10" src={item.userData.image} alt="" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-gray-800">{item.userData.name}</p>
                <p className="text-gray-600">
                  {/* Safety check: only call if it is a function */}
                  {typeof slotDateFormat === 'function' ? slotDateFormat(item.slotDate) : item.slotDate}
                </p>
              </div>

              {item.cancelled ? (
                <p className="text-xs font-medium text-red-400">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-xs font-medium text-green-500">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <img
                    onClick={() => !loading && cancelAppointment(item._id)}
                    className={`w-10 cursor-pointer ${loading ? 'opacity-50' : ''}`}
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                  <img
                    onClick={() => !loading && completeAppointment(item._id)}
                    className={`w-10 cursor-pointer ${loading ? 'opacity-50' : ''}`}
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
        <div className='flex flex-col items-center gap-3 p-8 bg-white shadow-xl rounded-2xl'>
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute top-0 w-16 h-16 border-4 border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className='text-lg font-medium text-zinc-500 animate-pulse'>Loading Dashboard...</p>
        </div>
    </div>
  );
};

export default DoctorDashboard;