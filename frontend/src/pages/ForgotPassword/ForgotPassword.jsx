import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
// Note: You need to import the actual Navbar component from '../../Components/Navbar/Navbar.jsx'
// The structure provided indicates Navbar is available.

// Import necessary components based on your structure
// import Navbar from '../../Components/Navbar/Navbar'; 
// import Footer from '../../Components/Footer/Footer'; 
// (For simplicity, the provided code will use a basic header structure inside the component)

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // ---  මෙතැන Backend API call එක යෙදේවි ---
        // උදාහරණයක් ලෙස:
        // fetch('/api/forgot-password', { method: 'POST', body: JSON.stringify({ email }) })
        
        console.log('Password reset requested for:', email);
        setMessage('If an account with that email exists, a password reset link has been sent.');
        setEmail(''); // Clear the input field
    };

    return (
        <div className={styles.pageContainer}>
            
            {/* Header/Navbar - According to your structure, you should use the imported Navbar component here:
            <Navbar /> 
            */}
            <header className={styles.header}>
                <div className={styles.logo}>EVERLANE</div>
                <nav className={styles.navLinks}>
                    <a href="/" className={styles.active}>Home</a>
                    <a href="/products">Products</a>
                    <a href="/contacts">Contacts</a>
                </nav>
                <div className={styles.navIcons}>
                    <span>&#128269;</span>
                    <span>&#128722;</span>
                    <span>&#128100;</span>
                </div>
            </header>

            {/* Main Content (Split Layout) */}
            <div className={styles.mainContent}>
                
                {/* Left Panel (Form) */}
                <div className={styles.leftPanel}>
                    <div className={styles.formContainer}>
                        <h1>Forgot Password</h1>
                        
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Enter your email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                            
                            <button type="submit">Reset password</button>
                        </form>

                        {message && <p className={styles.successMessage}>{message}</p>}
                    </div>
                </div>
                
                {/* Right Panel (Image) - Uses main_img.jpg from assets as a placeholder background */}
                <div className={styles.rightPanel}>
                    {/* The image is set via CSS background-image property */}
                </div>
            </div>

            {/* <Footer /> component should be used here if needed */}
        </div>
    );
};

export default ForgotPassword;