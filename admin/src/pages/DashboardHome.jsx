import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { motion } from 'framer-motion';

const DashboardHome = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken, profileData, getProfileData } = useContext(DoctorContext);

  const isAdmin = !!aToken;

  // Fetch doctor profile on load if dToken exists to get the name
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  // Logic to handle the "Dr. Dr." issue
  const getCleanName = () => {
    if (isAdmin) return "Administrator";
    
    const name = profileData?.name || "";
    if (!name) return "Doctor";

    // If name already has "Dr." or "Dr", just return the name. 
    // Otherwise, add "Dr. "
    return name.startsWith("Dr") ? name : `Dr. ${name}`;
  };

  return (
    <div className="p-6 min-h-[85vh] bg-gray-50/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center w-full overflow-hidden shadow-2xl rounded-3xl min-h-[400px] bg-white"
      >
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-[#5f6FFF] to-indigo-900 opacity-95"></div>
        
        {/* Floating Glass Orbs for UI depth */}
        <div className="absolute top-0 right-0 translate-x-10 -translate-y-10 rounded-full w-80 h-80 bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-10 translate-y-10 rounded-full bg-blue-400/20 blur-3xl"></div>

        <div className="relative z-10 w-full px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase rounded-full bg-white/20 backdrop-blur-lg border border-white/10">
              {isAdmin ? "Admin Control Center" : "Medical Professional Portal"}
            </span>

            <h1 className="text-5xl font-extrabold leading-[1.1] text-white md:text-7xl">
              Welcome back, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-200">
                {getCleanName()}! 👋
              </span>
            </h1>

            <p className="max-w-xl mt-8 text-lg font-light leading-relaxed text-indigo-50/90 md:text-xl">
              {isAdmin 
                ? "Your healthcare network is performing optimally. Access detailed analytics and management tools from the sidebar menu." 
                : "You have a clear view of your day ahead. Review patient records, manage consultations, and update your clinical availability."}
            </p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4 mt-12"
            >
              <div className="w-10 h-[2px] bg-indigo-300/50"></div>
              <p className="text-sm font-semibold tracking-widest text-indigo-100 uppercase">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;