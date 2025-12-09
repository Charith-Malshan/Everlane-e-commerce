import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import ProductAdmin from './pages/admin/productsAdminPage.jsx'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import Wishlist from './pages/Wishlist/wishlist.jsx';
import Product from './pages/ProductPage/productPage.jsx';
import ContactUs from './pages/contactUs/contactUs.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/product/:id" element={< Product />} />
        <Route path='/admin/products' element={<ProductAdmin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/wishlist' element={<Wishlist />} />
         <Route path='/contactus' element={<ContactUs />} />
        

      </Routes>
    </BrowserRouter>
  )
}

export default App
