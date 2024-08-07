import React, { useState } from "react";
import axios from "axios";
const uuidv4 = require('uuid');
const Create = () => {
  const [jobName, setJobName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [categories] = useState([
    "Information Technology (IT)",
    "Healthcare",
    "Finance",
    "Education",
    "Engineering",
    "Marketing",
    "Human Resources (HR)",
    "Sales",
    "Arts & Design",
    "Operations & Logistics",
  ]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);


    // POST REQUEST TO CREATE A JOB
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post('http://localhost:3001/api/jobs', {
        jobName,
        category: selectedCategory,
        deadline,
        description
      });

      setSuccessMessage('Job created successfully!');
      window.location.href = "/jobs";
      // Clear form fields
      setJobName("");
      setSelectedCategory(categories[0]);
      setDeadline("");
      setDescription("");
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while creating the job');
    }
  };

  return (
    <div className="container text-center mt-5 create-container  mb-5">
      <div className="row p-5 login-background ">
        <div className="col-12   ">
          <div className="row">
            <div className="col-12   ">
              <img
                src="/images/suitcase.png"
                alt="MSU Logo"
                className="img-fluid  mr-4"
                style={{ height: "125px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-4">
              <p className="login-text">Create Position</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 mt-2">
                <input
                  className="create-name"
                  type="text"
                  id="jobName"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  placeholder="Job Name"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-2">
                <div className="dropdown">
                  <button
                    className="create-dropdown dropdown-toggle"
                    type="button"
                    id="categoryDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedCategory}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="categoryDropdown"
                  >
                    {categories.map((category, index) => (
                      <li key={index}>
                        <button
                          className="dropdown-item"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="row  d-flex justify-content-center">
                <div className="col-12 mt-2 create-DeadlineContainer   ">
                <label htmlFor="deadline" className="create-deadlineLabel">Deadline:</label>
                 <input 
                   type="date" 
                   id="deadline" 
                   className="create-deadlineDate"
                   value={deadline}
                   onChange={(e) => setDeadline(e.target.value)}
                   required
                 />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-2 ">
                    <textarea 
                      className="create-textarea" 
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                </div>
            </div>
            
            <div className="row">
              <div className="col-12 mt-4">
                <button className="login-button" type="submit">
                  Create Job
                </button>
              </div>
            </div>
          </form>

          {error && <p className="badge text-bg-danger mt-2">{error}</p>}
          {successMessage && <p className="badge text-bg-success mt-2">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Create;