import React, { useState } from "react";
import "./Login.css";

// Use your API base URL (Vite or CRA) or fallback to "/api"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
// Optional: replace with your own asset
const IMAGE_URL =
  "./src/assets/login1.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const canSubmit = isEmailValid(email) && password.length >= 6 && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // if your backend sets httpOnly cookies; otherwise remove
        body: JSON.stringify({ email, password, remember }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to log in");
      }

      // If your backend returns a token (JWT) in the response:
      if (data?.token) {
        try {
          if (remember) {
            localStorage.setItem("token", data.token);
            localStorage.setItem(
              "token_expiry",
              String(Date.now() + 30 * 24 * 60 * 60 * 1000)
            );
          } else {
            sessionStorage.setItem("token", data.token);
          }
        } catch {}
      }

      // Navigate to your app after login
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
            <h1 className="title">Welcome back!</h1>
            <p className="subtitle">
              Enter your credentials to access your account
            </p>
          </header>

          {errorMsg ? <div className="error" role="alert">{errorMsg}</div> : null}

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
                {email !== "" && !isEmailValid(email) ? "Please enter a valid email." : " "}
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Forgot Password (right-aligned) */}
            <div className="right-align">
              <a className="link" href="/forgot-password">
                forgot password?
              </a>
            </div>

            {/* Actions */}
            <div className="actions">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember for 30 days
              </label>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={!canSubmit}
                aria-busy={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Separator */}
            <div className="separator" aria-hidden="true">
              <span>Or</span>
            </div>

            {/* Google Sign-in */}
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
              Sign in with Google
            </button>
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