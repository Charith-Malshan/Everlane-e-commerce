import { useState } from "react";
import "./Checkout.css";
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

const orderItems = [
    {
        id: 1,
        title: "Relaxed Cardigan",
        price: 900,
        qty: 1,
        img: "https://i.pinimg.com/236x/a2/cc/5e/a2cc5e37c05850f595981158dde3379f.jpg",
    },
    {
        id: 2,
        title: "Relaxed Cardigan",
        price: 1200,
        qty: 1,
        img: "https://i.pinimg.com/736x/34/d1/18/34d118f20a017fdcda35a7708be51315.jpg",
    },
];


const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const subTotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    return (
        <div>

            <Navbar />

            <main className="payment-wrapper">
                {/* LEFT: PAYMENT FORM */}
                <section className="payment-left">
                    <h2 className="payment-title">Your Order is Completed</h2>

                    <h3 className="payment-section-title">Payment Method</h3>
                    <div className="payment-methods">
                        <button
                            type="button"
                            className={
                                "method-pill " +
                                (paymentMethod === "card" ? "method-pill-active" : "")
                            }
                            onClick={() => setPaymentMethod("card")}
                        >
                            <span className="method-radio">
                                {paymentMethod === "card" && <span />}
                            </span>
                            <span>Card</span>
                        </button>

                        <button
                            type="button"
                            className={
                                "method-pill " +
                                (paymentMethod === "paypal" ? "method-pill-active" : "")
                            }
                            onClick={() => setPaymentMethod("paypal")}
                        >
                            <span className="method-radio">
                                {paymentMethod === "paypal" && <span />}
                            </span>
                            <span>PayPal</span>
                        </button>
                    </div>

                    <h3 className="payment-section-title">Payment Details</h3>

                    <div className="field">
                        <input
                            className="text-input"
                            type="text"
                            placeholder="Enter Name on Card"
                        />
                    </div>

                    <div className="field">
                        <div className="input-with-addon">
                            <input
                                className="text-input"
                                type="text"
                                placeholder="Card Number"
                            />
                            <span className="card-brand">VISA ▾</span>
                        </div>
                    </div>

                    <div className="field-row">
                        <div className="field">
                            <input
                                className="text-input"
                                type="text"
                                placeholder="Expiration"
                            />
                        </div>
                        <div className="field">
                            <input className="text-input" type="password" placeholder="CVV" />
                        </div>
                    </div>

                    <p className="terms-text">
                        By clicking &quot;Confirm Payment&quot; I agree to the company&apos;s
                        terms of service.
                    </p>

                    <div className="payment-actions">
                        <button className="btn-secondary">Back</button>
                        <button className="btn-primary">
                            Confirm Payment: LKR.{subTotal.toFixed(2)}
                        </button>
                    </div>
                </section>

                {/* RIGHT: ORDER SUMMARY */}
                <section className="payment-right">
                    <div className="summary-card">
                        <h3 className="summary-title">Order Summary</h3>

                        <div className="summary-items">
                            {orderItems.map((item) => (
                                <div key={item.id} className="summary-item">
                                    <div className="summary-img">
                                        <img src={item.img} alt={item.title} />
                                    </div>
                                    <div className="summary-info">
                                        <div className="summary-product-title">
                                            {item.title}
                                        </div>
                                        <div className="summary-product-price">
                                            LKR.{item.price.toFixed(2)}
                                        </div>

                                        <div className="summary-meta-row">
                                            <span>Quantity</span>
                                            <span>{item.qty}</span>
                                        </div>
                                        <div className="summary-meta-row">
                                            <span>Total Price</span>
                                            <span>
                                                LKR.{(item.price * item.qty).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-subtotal">
                            <span>Sub Total</span>
                            <div className="subtotal-box">
                                LKR.{subTotal.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

        </div>
    )
}

export default Checkout