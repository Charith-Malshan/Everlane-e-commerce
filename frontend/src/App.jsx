import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import ProductsPage from './pages/ProductPage/productPage.jsx'
import ProductAdmin from './pages/admin/productsAdminPage.jsx'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ForgotPassword from './pages/login/ForgotPassword'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import Wishlist from './pages/Wishlist/wishlist.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/productspage' element={<ProductsPage />} />
        <Route path='/admin/products' element={<ProductAdmin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/wishlist' element={<Wishlist />} />
      </Routes>
    </Router>
  )
}

export default App
