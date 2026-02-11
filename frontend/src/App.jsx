import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import JobOpenings from './pages/JobOpenings'
import ApplyJob from './pages/ApplyJob'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// --- Added Imports ---
import { AppContext } from './context/AppContext'
import Loading from './components/Loading'

const App = () => {

  // --- Extract loading state ---
  const { loading } = useContext(AppContext)

  return (
    <div className='mx-4 sm:mx-[10%]'>
      {/* --- Added Loading Component --- */}
      <Loading loading={loading} />

      <ScrollToTop />

      <ToastContainer />

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='appointment/:docId' element={<Appointment />} />

        <Route path='/job-openings' element={<JobOpenings />} />
        <Route path='/apply/:jobId' element={<ApplyJob />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App