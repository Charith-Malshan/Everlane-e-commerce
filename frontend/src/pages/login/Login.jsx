import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../api/authService";
import "./Login.css";

const IMAGE_URL = "./src/assets/login1.jpg";

function Login() {
    // ==========================================
    // State
    // ==========================================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    // ==========================================
    // Validation
    // ==========================================
    const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const canSubmit = isEmailValid(email) && password.length >= 6 && !loading;

    // ==========================================
    // Handle form submission
    // ==========================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);
        setErrorMsg("");

        try {
            // Call login API using authService
            const response = await authService.login({
                email: email.toLowerCase().trim(),
                password
            });

            // Check if login was successful
            if (response.success && response.data?.token) {
                // Store token based on remember preference
                authService.setToken(response.data.token, remember);

                // Redirect to dashboard
                navigate("/");
            } else {
                throw new Error(response.message || "Login failed");
            }

        } catch (error) {
            // Handle Axios errors
            if (error.response) {
                // Server responded with error status
                setErrorMsg(
                    error.response.data?.message ||
                    "Invalid email or password"
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
                        <h1 className="title">Welcome back!</h1>
                        <p className="subtitle">
                            Enter your credentials to access your account
                        </p>
                    </header>

                    {/* Error Message */}
                    {errorMsg && (
                        <div className="error" role="alert">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
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
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                            <div className="assistive">
                                {password !== "" && password.length < 6
                                    ? "Password must be at least 6 characters."
                                    : " "}
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="form-options">
                            <label className="remember">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    disabled={loading}
                                />
                                Remember for 30 days
                            </label>
                            <a href="/forgot-password" className="forgot-link">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <div className="actions">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!canSubmit}
                                aria-busy={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <footer className="footer">
                        Don&apos;t have an account?{" "}
                        <a href="/signup">Sign Up</a>
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

export default Login;