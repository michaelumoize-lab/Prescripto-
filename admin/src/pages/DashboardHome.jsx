import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { motion } from 'framer-motion';

const DashboardHome = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken, profileData, getProfileData } = useContext(DoctorContext);

  const isAdmin = !!aToken;

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const getCleanName = () => {
    if (isAdmin) return "Administrator";
    const name = profileData?.name || "";
    if (!name) return "Doctor";
    return name.startsWith("Dr") ? name : `Dr. ${name}`;
  };

  return (
    // Responsive padding: p-4 on mobile, p-6 on desktop
    <div className="p-4 md:p-6 min-h-[85vh] bg-gray-50/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // Adjusted height: min-h-[300px] on mobile, 400px on desktop
        className="relative flex items-center w-full overflow-hidden shadow-2xl rounded-2xl md:rounded-3xl min-h-[350px] md:min-h-[400px] bg-white"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-[#5f6FFF] to-indigo-900 opacity-95"></div>
        
        {/* Floating Orbs - Hidden on smallest screens to improve performance/cleanliness */}
        <div className="absolute top-0 right-0 hidden translate-x-10 -translate-y-10 rounded-full sm:block w-80 h-80 bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 hidden w-64 h-64 -translate-x-10 translate-y-10 rounded-full sm:block bg-blue-400/20 blur-3xl"></div>

        <div className="relative z-10 w-full px-6 py-10 md:px-16 md:py-0">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Tag - Smaller text on mobile */}
            <span className="inline-block px-3 py-1 mb-4 md:mb-6 text-[10px] md:text-xs font-bold tracking-[0.2em] text-white uppercase rounded-full bg-white/20 backdrop-blur-lg border border-white/10">
              {isAdmin ? "Admin Control Center" : "Medical Professional Portal"}
            </span>

            {/* Heading - Scaled from 3xl (mobile) to 7xl (desktop) */}
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl md:text-7xl">
              Welcome back, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-200">
                {getCleanName()}! 👋
              </span>
            </h1>

            {/* Paragraph - Scaled text and max-width */}
            <p className="max-w-xl mt-4 text-sm font-light leading-relaxed md:mt-8 sm:text-base md:text-xl text-indigo-50/90">
              {isAdmin 
                ? "Your healthcare network is performing optimally. Access detailed analytics and management tools from the sidebar menu." 
                : "You have a clear view of your day ahead. Review patient records, manage consultations, and update your clinical availability."}
            </p>

            {/* Date section - hidden on very small heights or adjusted margin */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 mt-8 md:gap-4 md:mt-12"
            >
              <div className="w-8 md:w-10 h-[2px] bg-indigo-300/50"></div>
              <p className="text-[10px] md:text-sm font-semibold tracking-widest text-indigo-100 uppercase">
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