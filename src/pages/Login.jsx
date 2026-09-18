import { useEffect, useRef, useState } from "react";
import "../pages/Login.css";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const googleButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
          width: 360,
          logo_alignment: "left",
        }
      );
    };

    if (window.google) {
      initializeGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          initializeGoogle();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);

      // Decode sementara untuk testing frontend
      const payload = JSON.parse(
        atob(response.credential.split(".")[1])
      );

      const user = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };

      console.log("Google User:", user);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Beritahu App.jsx bahwa login berhasil
      if (onLogin) {
        onLogin();
      }
      navigate("/");

    } catch (error) {
      console.error("Google login error:", error);
      alert("Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* ================= LEFT ================= */}

        <div className="login-left">

          <div className="left-content">

            <div className="logo-wrapper">

              <div className="logo-box">
                <img
                  src="/HTMLLOGO.png"
                  alt="ReMops Logo"
                />
              </div>

              <span>ReMops</span>

            </div>


            <div className="illustration">

              <div className="illustration-circle circle-one"></div>
              <div className="illustration-circle circle-two"></div>

              <div className="monitor-card">

                <div className="monitor-header">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="monitor-body">

                  <div className="monitor-line large"></div>
                  <div className="monitor-line medium"></div>
                  <div className="monitor-line small"></div>

                  <div className="monitor-chart">
                    <div className="chart-bar bar-1"></div>
                    <div className="chart-bar bar-2"></div>
                    <div className="chart-bar bar-3"></div>
                    <div className="chart-bar bar-4"></div>
                    <div className="chart-bar bar-5"></div>
                  </div>

                </div>

              </div>

            </div>


            <div className="welcome-text">

              <h1>
                Monitor smarter.
              </h1>

              <p>
                Manage and monitor your system
                from one centralized platform.
              </p>

            </div>

          </div>

        </div>


        {/* ================= RIGHT ================= */}

        <div className="login-right">

          <div className="form-container">

            <div className="mobile-logo">

              <div className="mobile-logo-box">
                <img
                  src="/logo.png"
                  alt="ReMops"
                />
              </div>

              <span>ReMops</span>

            </div>


            <div className="form-header">

              <span className="form-greeting">
                Hello!
              </span>

              <h2>
                Welcome back
              </h2>

              <p>
                We're glad to see you again.
                Please sign in to continue.
              </p>

            </div>


            <div className="google-section">

              <div className="google-label">
                Continue with your Google account
              </div>

              {loading ? (

                <div className="login-loading">
                  <div className="spinner"></div>
                  <span>Signing you in...</span>
                </div>

              ) : (

                <div
                  ref={googleButtonRef}
                  className="google-button"
                ></div>

              )}

            </div>


            <div className="google-only-note">
              Sign in securely with your Google account to continue.
            </div>

            <p className="copyright">
              © 2026 ReMops. All rights reserved.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;