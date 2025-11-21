import React, { useState } from "react";
import "./Register.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const IMAGE_URL = "./src/assets/login1.jpg"; // same image as Login

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isPasswordValid = (val) => val.length >= 6;

  const canSubmit =
    name.trim().length > 0 &&
    isEmailValid(email) &&
    isPasswordValid(password) &&
    password === confirm &&
    !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // keep if backend sets httpOnly cookies
        body: JSON.stringify({ name: name.trim(), email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create account");
      }

      // Optional: store token if backend returns it
      if (data?.token) {
        try {
          localStorage.setItem("token", data.token);
          localStorage.setItem(
            "token_expiry",
            String(Date.now() + 30 * 24 * 60 * 60 * 1000)
          );
        } catch { }
      }

      // Go to your app after successful signup
      window.location.assign("/dashboard");
    } catch (err) {
      setErrorMsg(err.message || "Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="login-grid">
      {/* Left: Form Panel */}
      <section className="left-panel">
        <div className="form-wrap">
          <header>
            <h2 className="title">Create your account</h2>
            <p className="subtitle">Enter your details to get started</p>
          </header>

          {errorMsg ? (
            <div className="error" role="alert">{errorMsg}</div>
          ) : null}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name" className="label">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="input"
                placeholder="Enter your name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                required
              />
              <div className="assistive">
                {password !== "" && !isPasswordValid(password)
                  ? "Use at least 6 characters."
                  : " "}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirm" className="label">
                Confirm password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                className="input"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                aria-invalid={confirm !== "" && confirm !== password}
                aria-describedby="confirm-help"
                required
              />
              <div id="confirm-help" className="assistive">
                {confirm !== "" && confirm !== password
                  ? "Passwords do not match."
                  : " "}
              </div>
            </div>

            {/* Actions */}
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

            {/* Separator */}
            <div className="separator" aria-hidden="true">
              <span>Or</span>
            </div>

            {/* Google Sign-up */}
            <button
              type="button"
              className="btn-google"
              onClick={handleGoogleSignIn}
            >
              <img
                className="google-icon"
                alt="Google logo"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
              Continue with Google
            </button>
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