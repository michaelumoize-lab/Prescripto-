import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import EditDoctor from "./pages/Admin/EditDoctor"; // Import the new component
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import DashboardHome from "./pages/DashboardHome";

const App = () => {
  // Pull loading states from both to be safe
  const { aToken, loading: adminLoading } = useContext(AdminContext);
  const { dToken, loading: doctorLoading } = useContext(DoctorContext);

  // Use a combined loading check
  const isAppLoading = adminLoading || doctorLoading;

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      {/* Pass the stable boolean */}
      <Loading loading={!!isAppLoading} />
      <ToastContainer />
      <ScrollToTop />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Common Dashboard Home */}
          <Route path="/" element={<DashboardHome />} />

          {/* Admin Only Routes */}
          {aToken && (
            <>
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/edit-doctor/:docId" element={<EditDoctor />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
            </>
          )}

          {/* Doctor Only Routes */}
          {dToken && (
            <>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route
                path="/doctor-appointments"
                element={<DoctorAppointments />}
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
