
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Create from './pages/Create';
import JobDetails from './pages/JobDetails';
import Applicants from './pages/Applicants';
import './App.css';
import './fonts.css';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();
  
  if (!isLoggedIn) {
    // Redirect to login page if not logged in, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};


const AppContent = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname !== "/" && <NavBar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/job/:id" element={<JobDetails />} />
          <Route 
            path='/Create' 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Create />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/applicants/:jobId/:jobName" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Applicants />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};


export default App;