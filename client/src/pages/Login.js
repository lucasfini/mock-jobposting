import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  // POST REQUEST TO CALL /api/login IN BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/login", { username, password });
      console.log(username, password)
      const { token } = response.data;

    
      localStorage.setItem("token", token);

 
      window.location.href = "/jobs";
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container text-center mt-5 login-container">
      <div className="row p-5 login-background ">
        <div className="col-12   ">
          <div className="row">
            <div className="col-12   ">
              <img
                src="/images/MSU.png"
                alt="MSU Logo"
                className="img-fluid  mr-4"
                style={{ height: "125px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-4">
              <p className="login-text">Employee Sign In</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 mt-4">
                <input
                    className='login-input'
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-2">
                <input
                 className='login-input'
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-4">
              <button className='login-button' type="submit">Sign In</button>
              </div>
            </div>
          </form>

          {error && <p className="badge text-bg-danger mt-3">{error}</p>}
        </div>
      </div>
     <div className ='row'>
        <div className="col-12">
            <label className="mt-3 p-0"><strong>Use Credentials</strong></label>
            <p className="m-0 mt-2 p-0">Username: Admin</p>
            <p className="m-0 p-0">Password: Test112294 </p>
        </div>
     </div>
    </div>
  );
};

export default Login;
