import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const datePosted = searchParams.get("datePosted");

        if (!datePosted) {
          throw new Error("datePosted is missing from the URL");
        }

        const response = await axios.get(
          `http://localhost:3001/api/jobs/${id}?datePosted=${datePosted}`
        );
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to fetch job details. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, location.search]);


    // POST REQUEST TO SUBMIT APPLICATION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);
    formData.append("jobId", id);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Application submitted successfully!");
        // Reset form fields
        setName("");
        setEmail("");
        setResume(null);
        setCoverLetter(null);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <label className="details-title">Job Details</label>
            </div>
          </div>
          <div className="row mt-5 ">
            <div className="col-8">
              <p className="details-name m-0">{job.jobName}</p>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-8">
              <p className="details-category m-0">{job.category}</p>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-8">
              <p className="details-location">Hamilton/ON</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 mt-1">
              <label className="details-label">Description:</label>
            </div>
            <div className="col-lg-8 col-12 mt-3">
              <p className="details-description">{job.description}</p>
            </div>
          </div>
          <div className="row mt-0">
            <div className="col-12 mt-1">
              <label className="details-label2">Deadline:</label>
            </div>
            <div className="col-8">
              <p className="details-deadLine">{job.deadline}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row details-applyBox mb-5">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-12">
                <label className="details-applyLabel">Apply:</label>
                <div className="row mt-3">
                  <div className="col-lg-6 col-12 d-flex align-items-center">
                    <input
                      className="details-appName"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-4  col-12 mt-4 mt-lg-0">
                    <div className="col-12 details-container d-flex align-items-center">
                      <label
                        htmlFor="resume"
                        className="details-resumeLabel me-3"
                      >
                        Resume:
                      </label>
                      <input
                        type="file"
                        id="resume"
                        className="details-resumeFile"
                        onChange={(e) => setResume(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-lg-6 col-12 mt-4 mt-lg-0 ">
                    <input
                      className="details-appEmail"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-5 col-12 mt-4 mt-lg-0">
                    <div className=" details-container d-flex align-items-center">
                      <label
                        htmlFor="coverletter"
                        className="details-coverLetterLabel me-3"
                      >
                        Cover Letter:
                      </label>
                      <input
                        type="file"
                        id="coverletter"
                        className="details-coverLetterFile"
                        onChange={(e) => setCoverLetter(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-7 col-12 d-flex justify-content-end">
                <button type="submit" className="details-applyBut">
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
