import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Get user ID from localStorage (set during login)
    const getUserId = () => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            return userData._id || userData.id;
        }
        return null;
    };

    const userId = getUserId();
    const API_BASE_URL = "http://localhost:5000/api";

    // Fetch cart items from database
    useEffect(() => {
        // Check if user is logged in
        if (!userId) {
            setLoading(false);
            setError('Please login to view your cart');
            return;
        }
        fetchCartItems();
    }, [userId]);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
            setCart(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching cart:', err);
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    // Update quantity
    const updateQty = async (id, delta) => {
        const item = cart.find((item) => item._id === id);
        if (!item) return;
        
        const newQty = Math.max(1, item.qty + delta);

        try {
            await axios.put(`${API_BASE_URL}/cart/update/${id}`, {
                qty: newQty
            });

            setCart((items) =>
                items.map((item) =>
                    item._id === id ? { ...item, qty: newQty } : item
                )
            );
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    // Remove item from cart
    const removeItem = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/cart/remove/${id}`);
            setCart((items) => items.filter((item) => item._id !== id));
        } catch (err) {
            console.error('Error removing item:', err);
        }
    };

    // Process checkout
    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        try {
            const shippingAddress = {
                street: "123 Main St",
                city: "Colombo",
                postalCode: "10000",
                country: "Sri Lanka"
            };

            const response = await axios.post(`${API_BASE_URL}/orders/create`, {
                userId,
                shippingAddress
            });

            alert('Order placed successfully!');
            setCart([]);
            
        } catch (err) {
            console.error('Error creating order:', err);
            alert('Failed to place order. Please try again.');
        }
    };

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
    );

    // Not logged in state
    if (!userId) {
        return (
            <div>
                <Navbar />
                <main className="cart-wrapper">
                    <div className="empty-cart">
                        <h2>Please Login</h2>
                        <p>You need to login to view your cart</p>
                        <button 
                            className="checkout-btn"
                            onClick={() => navigate('/login')}
                        >
                            Go to Login
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <Navbar />
                <main className="cart-wrapper">
                    <p>Loading cart...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <main className="cart-wrapper">
                    <p>Error: {error}</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <main className="cart-wrapper">
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-table">
                            <div className="cart-header">
                                <span></span>
                                <span>Product Image</span>
                                <span>Product title</span>
                                <span>Price</span>
                                <span>Quantity</span>
                                <span>Total</span>
                            </div>

                            {cart.map((item) => (
                                <div className="cart-row" key={item._id}>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item._id)}
                                    >
                                        ×
                                    </button>

                                    <div className="product-img">
                                        <img src={item.img} alt={item.title} />
                                    </div>

                                    <div className="product-title">{item.title}</div>

                                    <div className="price">
                                        LKR.{item.price.toFixed(2)}
                                    </div>

                                    <div className="quantity">
                                        <div className="qty-control">
                                            <button onClick={() => updateQty(item._id, -1)}>
                                                -
                                            </button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => updateQty(item._id, 1)}>
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="row-total">
                                        LKR.{(item.price * item.qty).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <p className="cart-total">
                                <strong>Cart Total: LKR.{cartTotal.toFixed(2)}</strong>
                            </p>
                        </div>

                        <div className="checkout-wrapper">
                            <button 
                                className="checkout-btn"
                                onClick={handleCheckout}
                            >
                                Process to checkout
                            </button>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Cart;