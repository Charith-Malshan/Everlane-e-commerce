import { useState } from 'react'
import './Cart.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

const initialCart = [
    {
        id: 1,
        title: "Relaxed Cardigan",
        price: 1600,
        qty: 1,
        img: "https://i.pinimg.com/236x/a2/cc/5e/a2cc5e37c05850f595981158dde3379f.jpg",
    },
    {
        id: 2,
        title: "Relaxed Cardigan",
        price: 1600,
        qty: 1,
        img: "https://i.pinimg.com/736x/34/d1/18/34d118f20a017fdcda35a7708be51315.jpg",
    },
];

const Cart = () => {
    const [cart, setCart] = useState(initialCart);

    const updateQty = (id, delta) => {
        setCart((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, qty: Math.max(1, item.qty + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCart((items) => items.filter((item) => item.id !== id));
    };

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
    );
    return (
        <div>
            <Navbar />

            <main className="cart-wrapper">
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
                        <div className="cart-row" key={item.id}>
                            <button
                                className="remove-btn"
                                onClick={() => removeItem(item.id)}
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
                                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                                </div>
                            </div>

                            <div className="row-total">
                                LKR.{(item.price * item.qty).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="checkout-wrapper">
                    <button className="checkout-btn">
                        Process to checkout
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Cart