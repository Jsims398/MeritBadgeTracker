"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const target = e.target as HTMLAnchorElement;
    target.innerHTML =
      '<div class="spinner-border spinner-border-sm me-2" role="status"></div>Connecting...';
    target.style.pointerEvents = "none";
    setIsLoading(true);

    setTimeout(() => {
      alert(
        "Google Auth integration will be set up with Supabase! This is just a demo design."
      );
      target.style.pointerEvents = "auto";
      setIsLoading(false);
    }, 2000);
  };

  const navigateToScouts = () => {
    window.location.href = "/scouts";
  };

  return (
    <>
      {/* top Section with Login */}
      <section className="top-section">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="top-content text-center">
                <h1 className="display-4 fw-bold mb-4">
                  Scout Merit Badge Tracker
                </h1>
                <div className="auth-card">
                  <h3 className="h4 text-center mb-4 text-dark">
                    Welcome Back!
                  </h3>

                  <a
                    href="#"
                    className="login-prompt"
                    onClick={handleGoogleSignIn}
                  >
                    Continue with Google
                  </a>

                  <div className="text-center mt-4">
                    <small className="text-muted">
                      <i className="fas fa-lock me-1"></i>
                      Secure authentication for scout leaders and counselors
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="section-title display-5">
                Why Choose Our Tracker?
              </h2>
              <p className="section-subtitle">
                Everything you need to manage merit badge progress efficiently
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div
                className="feature-card text-center clickable-card"
                onClick={navigateToScouts}
                style={{ cursor: "pointer" }}
              >
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h5 className="fw-bold mb-3">Scout Management</h5>
                <p className="text-muted">
                  Easily register and manage all your scouts in one centralized
                  system with detailed profiles and progress tracking.
                </p>
                <div className="mt-3">
                  <small className="text-primary fw-semibold">
                    <i className="fas fa-arrow-right me-1"></i>
                    Click to manage scouts
                  </small>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center">
                <div className="feature-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <h5 className="fw-bold mb-3">Progress Tracking</h5>
                <p className="text-muted">
                  Track completion of merit badge requirements with detailed
                  notes, dates, and counselor signatures.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center">
                <div className="feature-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <h5 className="fw-bold mb-3">Merit Badge Library</h5>
                <p className="text-muted">
                  Complete database of merit badges with all requirements,
                  making it easy to guide scouts through their journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h6>
                <i className="fas fa-award me-2"></i>Scout Merit Badge Tracker
              </h6>
              <p className="mb-0 small text-muted">
                Empowering scouts to achieve their goals
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-muted">
                Built for scout leaders, by scout leaders
              </small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
