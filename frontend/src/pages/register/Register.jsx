import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../api/authService";
import "./Register.css";

const IMAGE_URL = "./src/assets/login1.jpg";

function Register() {
    // ==========================================
    // State
    // ==========================================
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    // ==========================================
    // Validation
    // ==========================================
    const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isPasswordValid = (val) => val.length >= 6;

    const canSubmit =
        fullName.trim().length > 0 &&
        isEmailValid(email) &&
        isPasswordValid(password) &&
        !loading;

    // ==========================================
    // Handle form submission
    // ==========================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);
        setErrorMsg("");

        try {
            // Call register API using authService
            const response = await authService.register({
                fullName: fullName.trim(),
                email: email.toLowerCase().trim(),
                password
            });

            // Check if registration was successful
            if (response.success && response.data?.token) {
                // Store token
                authService.setToken(response.data.token);

                // Redirect to dashboard
                navigate("/login");
            } else {
                throw new Error(response.message || "Registration failed");
            }

        } catch (error) {
            // Handle Axios errors
            if (error.response) {
                // Server responded with error status
                setErrorMsg(
                    error.response.data?.message ||
                    "Failed to create account. Please try again."
                );
            } else if (error.request) {
                // Request made but no response received
                setErrorMsg("Unable to connect to server. Please check your connection.");
            } else {
                // Other errors
                setErrorMsg(error.message || "An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // Render
    // ==========================================
    return (
        <div className="login-grid">
            {/* Left: Form Panel */}
            <section className="left-panel">
                <div className="form-wrap">
                    <header>
                        <h2 className="title">Create your account</h2>
                        <p className="subtitle">Enter your details to get started</p>
                    </header>

                    {/* Error Message */}
                    {errorMsg && (
                        <div className="error" role="alert">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Full Name */}
                        <div className="form-group">
                            <label htmlFor="fullName" className="label">
                                Full name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                className="input"
                                placeholder="Enter your name"
                                autoComplete="name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email" className="label">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="input"
                                placeholder="Enter your email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                aria-invalid={email !== "" && !isEmailValid(email)}
                                aria-describedby="email-help"
                                required
                            />
                            <div id="email-help" className="assistive">
                                {email !== "" && !isEmailValid(email)
                                    ? "Please enter a valid email."
                                    : " "}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="input"
                                placeholder="Create a password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                            <div className="assistive">
                                {password !== "" && !isPasswordValid(password)
                                    ? "Use at least 6 characters."
                                    : " "}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="actions">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!canSubmit}
                                aria-busy={loading}
                            >
                                {loading ? "Creating account..." : "Create account"}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <footer className="footer">
                        Already have an account? <a href="/login">Login</a>
                    </footer>
                </div>
            </section>

            {/* Right: Image Panel */}
            <aside className="login-image" aria-hidden="true">
                <img
                    src={IMAGE_URL}
                    alt="Two models in a studio wearing classic winter coats"
                />
            </aside>
        </div>
    );
}

export default Register;