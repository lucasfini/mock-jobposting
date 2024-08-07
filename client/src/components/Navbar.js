import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove token from local storage
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-lg-2 col-12 justify-content-center d-flex justify-content-lg-start">
          <img
            src="/images/msu-logo.png"
            alt="MSU Logo"
            className="img-fluid  mr-4"
            style={{ height: "80px", marginRight: "16px" }}
          />
        </div>
        <div className="col-lg-7 col-12 d-flex text-center align-items-center justify-content-center">
          <span className="nav-title">AVAILABLE JOBS (MOCK WEBSITE)</span>
        </div>

        <div className="col-lg-3 col-12 d-flex align-items-center justify-content-lg-end justify-content-center">
          <div className="row">
            <nav>
              <div className="col-4 d-flex justify-content-end">
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                  style={{ outline: "none", textDecoration: "none" }}
                >
                  Home
                </Link>
              </div>
              <div className="col-4 d-flex justify-content-start ">
                <Link
                  to="/jobs"
                  className={location.pathname === "/jobs" ? "active" : ""}
                  style={{ textDecoration: "none" }}
                >
                  Jobs
                </Link>
              </div>
              <div className="col-4 d-flex align-items-end">
                {isLoggedIn ? (
                  <button
                    onClick={handleSignOut}
                    className="nav-Signout"
                    
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className={location.pathname === "/login" ? "active nav-Signout" : "nav-Signout"}
                    style={{ outline: "none", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
