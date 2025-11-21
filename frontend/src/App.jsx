import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import ProductsPage from './pages/ProductPage/productPage.jsx'
import ProductAdmin from './pages/admin/productsAdminPage.jsx'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ForgotPassword from './pages/login/ForgotPassword'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/productspage' element={<ProductsPage />} />
        <Route path='/admin/products' element={<ProductAdmin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default App
