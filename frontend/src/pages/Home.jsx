import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Feedback from '../components/Feedback'

const Home = () => {
  return (
    <div>
        <Header/>
        <SpecialityMenu/>
        <TopDoctors/>
        <Banner/>
        <Feedback />
    </div>
  )
}

export default Home
