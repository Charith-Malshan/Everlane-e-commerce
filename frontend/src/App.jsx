import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import ProductsPage from './pages/ProductPage/productPage.jsx'
import ProductAdmin from './pages/admin/productsAdminPage.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/productspage' element={<ProductsPage />} />
        <Route path='/admin/products' element={<ProductAdmin />} />
      </Routes>
    </div>
  )
}

export default App
