import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Applicants = () => {
  const { jobId, jobName } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/applicants/${jobId}`
      );
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to fetch applications. Please try again later.");
      setLoading(false);
    }
  };

    // DELETE ALL APPLICANTS
  const handleDeleteAll = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all applicants? This action cannot be undone."
      )
    ) {
      try {
        setLoading(true);
        await axios.delete("http://localhost:3001/api/applicants/all");
        alert("All applicants have been deleted successfully.");
        fetchApplications(); // Refresh the list
      } catch (error) {
        console.error("Error deleting all applicants:", error);
        let errorMessage = "Failed to delete all applicants. Please try again.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.details
        ) {
          errorMessage += ` Error: ${error.response.data.details}`;
        }
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const getSecureFileUrl = async (fileUrl) => {
    try {
      // Don't split the URL, use the full path
      const fileKey = fileUrl;
      console.log("Requesting secure URL for file key:", fileKey);
  
      const response = await axios.get(
        `http://localhost:3001/api/files/${encodeURIComponent(fileKey)}`
      );
      console.log("Received response:", response.data);
  
      return response.data.signedUrl;
    } catch (error) {
      console.error(
        "Error fetching file URL:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };

  const handleFileView = async (fileUrl, fileType) => {
    try {
      const secureUrl = await getSecureFileUrl(fileUrl);
      if (secureUrl) {
        window.open(secureUrl, "_blank");
      } else {
        throw new Error("Failed to get secure URL");
      }
    } catch (error) {
      console.error(`Error accessing ${fileType}:`, error);
      alert(
        `Failed to access the ${fileType}. Please try again or contact support.`
      );
    }
  };

  if (loading) {
    return <div>Loading applicants...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="applicants-title">View Applicants</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6 col-8">
          <h2 className="applicant-jobname">{jobName}</h2>
        </div>
        <div className="col-lg-6 col-4 d-flex justify-content-end">
          <button onClick={handleDeleteAll} className="applicant-delete mb-2">
            Delete All Applicants
          </button>
        </div>
      </div>
      {<hr className="jobs-divider" />}
      <div className="row mt-2">
        <div className="col-12">
          {applications.length === 0 ? (
            <p>No applications found for this job.</p>
          ) : (
            <ul className="mt-3">
              {applications.map((application) => (
                <li key={application.applicantId} className="list-group-item mt-3">
                  <div className="row">
                    <div className="col-lg-3 col-6 d-flex justify-content-start align-items-center">
                      <h3 className="applicant-name">{application.name}</h3>
                    </div>
                    <div className="col-lg-2 col-6 d-flex justify-content-start align-items-center ">
                      <h3 className="applicant-email">{application.email}</h3>
                    </div>
                    <div className="col-lg-2 col-6 d-flex align-items-center">
                      <button
                        onClick={() =>
                          handleFileView(application.resumeUrl, "resume")
                        }
                        className="applicant-butt w-100 "
                      >
                        View Resume
                      </button>
                    </div>
                    <div className="col-lg-2 col-6 d-flex align-items-center">
                      <button
                        onClick={() =>
                          handleFileView(
                            application.coverLetterUrl,
                            "cover letter"
                          )
                        }
                        className="applicant-butt w-100"
                      >
                        View Cover Letter
                      </button>
                    </div>
                    <div className="col-lg-3 col-12 d-flex align-items-center justify-content-center justify-content-lg-start">
                      <p className="applicant-date m-0 ">
                        Applied On:{" "}
                        {new Date(application.appliedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;
