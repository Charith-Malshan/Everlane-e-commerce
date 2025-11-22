import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";
import Navbar from "../../Components/Navbar/Navbar"; 
import Footer from "../../Components/Footer/Footer";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";


const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
  {
    id: 1,
    title: "Relaxed Cardigan",
    price: "LKR.1600.00",
    img: product1,
    inStock: true,
  },
  {
    id: 2,
    title: "Relaxed Cardigan",
    price: "LKR.1600.00",
    img: product2,
    inStock: true,
  },
]);

  const handleRemove = (id) => {
  setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
  };


  return (
    <div className="page-bg"> 
    <div className="wishlist-navbar-container">
    <Navbar /> 
      <div className="wishlist-navbar-icons">
        <Link to="/cart"><FaShoppingCart size={20} /></Link>
        <Link to="/profile"><FaUser size={20} /></Link>
        <Link to="/wishlist"><FaHeart size={20} /></Link>
    </div>
    </div>
      <main className="wishlist-wrap">
        <div className="wishlist-inner">
          <div className="wishlist-top">
            <div className="wishlist-mark">♡</div>
            <h1 className="wishlist-heading">My Wish list</h1>
          </div>

          <div className="wishlist-table-wrap">
            <table className="wishlist-table" aria-label="wishlist table">
              <thead>
                <tr>
                  <th className="col-remove" />
                  <th className="col-image">Product Image</th>
                  <th className="col-title">Product title</th>
                  <th className="col-price">Price</th>
                  <th className="col-stock">Stock status</th>
                  <th className="col-action">Action</th>
                </tr>
              </thead>

              <tbody>
                {wishlistItems.map((it) => (
                  <tr key={it.id}>
                    <td className="remove-cell">
                      <button className="remove-x" aria-label={`remove ${it.title}`}
                      onClick= {() => handleRemove(it.id)}>
                        ×
                      </button>
                    </td>

                    <td className="image-cell">
                      <img src={it.img} alt={it.title} className="product-thumb" />
                    </td>

                    <td className="title-cell">{it.title}</td>

                    <td className="price-cell">{it.price}</td>

                    <td className="stock-cell">
                      <span className={it.inStock ? "in-stock" : "out-stock"}>
                        {it.inStock ? "in stock" : "out of stock"}
                      </span>
                    </td>

                    <td className="action-cell">
                      <button className="addcart-btn">Add to cart</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;

