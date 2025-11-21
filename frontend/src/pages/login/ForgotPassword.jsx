import React, { useState } from "react";
import "./Login.css"; // reuse the same styles

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
// For Vite builds, importing is more robust:
// import IMAGE_URL from "../assets/login1.jpg";
const IMAGE_URL = "./src/assets/login1.jpg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const canSubmit = isEmailValid(email) && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // credentials: "include", // usually not needed here; uncomment if required
        body: JSON.stringify({ email }),
      });

      // Many backends return 200 even if the email doesn't exist (to avoid account enumeration)
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to send reset link");
      }

      setSuccessMsg(
        "If an account exists for that email, we’ve sent a password reset link."
      );
      setEmail("");
    } catch (err) {
      setErrorMsg(err.message || "Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-grid">
      {/* Left: Form Panel */}
      <section className="left-panel">
        <div className="form-wrap">
          <header>
            <h1 className="title">Forgot your password?</h1>
            <p className="subtitle">
              Enter your email and we’ll send you a link to reset it.
            </p>
          </header>

          {errorMsg ? <div className="error" role="alert">{errorMsg}</div> : null}
          {successMsg ? <div className="success" role="status">{successMsg}</div> : null}

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

            {/* Actions */}
            <div className="actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!canSubmit}
                aria-busy={loading}
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </div>

            {/* Footer */}
            <footer className="footer">
              Remembered your password? <a href="/login">Login</a>
            </footer>
          </form>
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

export default ForgotPassword;