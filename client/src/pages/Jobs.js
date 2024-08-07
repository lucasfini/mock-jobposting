import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/jobs");
        setJobs(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleCheckboxChange = (jobId) => {
    setSelectedJobId(jobId === selectedJobId ? null : jobId);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);


    // DELETE REQUEST TO REMOVE JOBS
  const handleDelete = async () => {
    if (!selectedJobId) {
      alert("Please select a job to delete.");
      return;
    }

    const jobToDelete = jobs.find((job) => job.jobId === selectedJobId);
    if (!jobToDelete) {
      alert("Selected job not found.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3001/api/jobs/${selectedJobId}?datePosted=${jobToDelete.datePosted}`
      );
      setJobs(jobs.filter((job) => job.jobId !== selectedJobId));
      setSelectedJobId(null);
      alert("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  
  const handleViewApplicants = (jobId,jobName) => {
    navigate(`/applicants/${jobId}/${jobName}`);
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          {isLoggedIn ? (
            <div className="row">
              <div className="col-lg-8 col-12 d-flex justify-content-center justify-content-lg-start">
                <label className="jobs-title">Available Positions</label>
              </div>

              <div className="col-lg-2 d-flex col-12  justify-content-end">
                <button
                  className="jobs-delete w-100"
                  onClick={handleDelete}
                  disabled={!selectedJobId}
                >
                  Delete
                </button>
              </div>
            
              <div className="col-lg-2 d-flex mt-2 mt-lg-0  justify-content-end">
                <Link
                  to="/Create"
                  className="jobs-create  align-items-center d-flex justify-content-center w-100"
                  style={{ outline: "none", textDecoration: "none" }}
                >
                  Create
                </Link>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-6">
                <label className="jobs-title">Available Positions</label>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-12 mt-5">
              <ul className="jobs-list">
                {jobs.map((job, index) => (
                  <li
                    style={{ textDecoration: "none" }}
                    key={index}
                    className="jobs-item"
                  >
                    <div className="row">
                      <div className="col-lg-6 col-12 col-md-6 d-flex align-items-center">
                        <Link
                          to={`/job/${
                            job.jobId
                          }?datePosted=${encodeURIComponent(job.datePosted)}`}
                          className="jobs-jobName"
                          style={{ textDecoration: "none", }}
                        >
                          {job.jobName}
                        </Link>
                        {isLoggedIn && (
                          <button 
                          className="jobs-viewApp ms-3"
                          onClick={() => handleViewApplicants(job.jobId, job.jobName)}
                        >
                          View Applicants
                        </button>
                        )}
                      </div>
                      <div className="col-lg-5 col-12 col-md-5 ">
                        <div className="row">
                          <div className="row ">
                            <div className=" col-12 d-flex justify-content-lg-end  justify-content-start ">
                              <p className="jobs-category m-0">
                                {" "}
                                {job.category}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className=" col-12 d-flex  justify-content-lg-end   justify-content-start  ">
                              <p className="jobs-location">Hamilton/ON</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isLoggedIn && (
                        <div className="col-12 col-lg-1 col-md-1  d-flex align-items-center justify-content-center">
                          <input
                            className="jobs-checkbox"
                            type="checkbox"
                            checked={selectedJobId === job.jobId}
                            onChange={() => handleCheckboxChange(job.jobId)}
                            aria-label={`Select ${job.jobName}`}
                          />
                        </div>
                      )}
                    </div>

                    {<hr className="jobs-divider" />}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
