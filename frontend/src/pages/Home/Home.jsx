import React from 'react'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import Hero from '../../Components/Hero/Hero.jsx'
import Categories from '../../Components/Categories/Categories.jsx'
import Services from '../../Components/Services/Services.jsx'
import NewArrivals from '../../Components/NewArrivals/NewArrivals.jsx'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Categories />
        <NewArrivals />
        <Services />
        <Footer />
    </div>
  )
}

export default Home