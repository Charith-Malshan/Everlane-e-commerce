import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Footer from '../../Components/Footer/Footer'
import ProductList from '../../Components/ProductList/ProductList'

const productPage = () => {
  return (
    <div>
       <Navbar />
       <SearchBar />
       <ProductList />
       <Footer /> 
    </div>
  )
}

export default productPage