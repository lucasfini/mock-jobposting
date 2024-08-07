import React from "react";

const Home = () => {
  const introText = `Welcome to the 
  showcase of my mock website. For this project, 
  I aimed to demonstrate my full-stack capabilities, 
  highlighting not only backend functionality 
  but also the ability to manage both authorized and unauthorized users. 
  To achieve this, I developed a fully functioning job posting application.  
  I centered most of my design efforts on this static homepage, 
  the core backend and utility features are all concentrated on the job posting application of this website. 
  I hope you find it engaging, and I appreciate the opportunity to share my work with you.
`;

  const introText2 = " Thank you,";

  const text20 = `For the front end, I've chosen React as my framework. React leverages HTML, JavaScript, and CSS to create efficient, well-rounded projects. To streamline layouts and enhance visual appeal, I've integrated the Bootstrap library, which provides prebuilt grid systems and components. This allows for quick rendering of HTML visuals, enabling me to focus on adding functionality through JavaScript.`;
  const text21 = `JavaScript plays a crucial role in connecting the front end with the backend. It enables features like calling endpoints and relaying information. For example, when you click the sign-in button on the login page, a handleSubmit function triggers a POST request to the backend. The backend then communicates with DynamoDB, an AWS service, to verify the credentials. If they are valid, a success message is returned, which is then relayed back to the front end, allowing the user to log in.`;
  const text22 = `CSS is used to enhance the visual design, ensuring that text, buttons, and overall color and typography stay consistent with the theme.`;

  const text30 = `The backend of this project was built using Express, a Node.js framework ideal for developing web and mobile applications. It manages several key functions, including logging in and out, deleting posts and jobs, retrieving jobs and individual job details, creating jobs, retrieving applications, submitting applications, and viewing resumes or cover letters.`;
  const text31 = `For cloud integration, I utilized AWS services in two primary ways. DynamoDB, a high-performance serverless database platform, stores key information such as admin credentials, applicant details, and job listings across separate tables. Additionally, S3, a scalable cloud storage service, is used to create a bucket for storing files like resumes and cover letters. This setup allows the admin to easily access any applicant's information for any job.`;
  const text32 = `To ensure security, encryption practices are applied throughout the system. Bcrypt is used to hash the admin passwords, while Multer facilitates file uploads. Together, these tools create a secure and efficient backend that supports the overall functionality of the application.`;

  return (
    <div className="container-flush home ">
      <div className="home-container">
        <div className="home-background"></div>
        <div className="home-content">
          {/* Your existing content here */}
          <div className="row ">
            <div className="col-lg-5 col-12  ">
              <div className="row">
                <div className="col-12  d-flex align-items-center justify-content-lg-end justify-content-center">
                  <h1 className="home-hello barlow-bold">HELLO</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-lg-end justify-content-center">
                  <h1 className="home-judges barlow-bold">JUDGES</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-sm-12 p-sm-5 p-md-0  offset-lg-1 d-flex flex-column justify-content-center    col-12 ">
              <p className="home-intro barlow-bold">{introText} </p>
              <p className=" barlow-bold home-intro2 m-0">{introText2} </p>
              <p className=" barlow-bold home-intro2 ">{"Lucas"} </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 d-flex justify-content-center">
              <button
                className="home-but barlow-light"
                onClick={() => (window.location.href = "/jobs")}
              >
                Go to Mock website
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row  home-images align-items-center justify-content-center ">
          <div className="col-lg-4 col-12 col-md-12  p-0 ">
            <img
              src="/images/image 10.png"
              alt="MSU Logo"
              className="home-img  w-100"
              style={{ height: "220px" }}
            />
          </div>
          <div className="col-lg-4 col-12 col-md-6 p-0">
            <img
              src="/images/image 11.png"
              alt="MSU Logo"
              className="home-img  w-100"
              style={{ height: "220px" }}
            />
          </div>
          <div className="col-lg-4 col-12 col-md-6 p-0">
            <img
              src="/images/image 12.png"
              alt="MSU Logo"
              className="home-img  w-100"
              style={{ height: "220px" }}
            />
          </div>
        </div>
        <div className="row align-items-center justify-content-center ">
          <div className="col-lg-4 col-12 col-md-12 p-0">
            <img
              src="/images/image 9.png"
              alt="MSU Logo"
              className="home-img  w-100"
              style={{ height: "220px" }}
            />
          </div>
          <div className="col-lg-4 col-12 col-md-6 p-0">
            <img
              src="/images/image 13.png"
              alt="MSU Logo"
              className="home-img  w-100"
              style={{ height: "220px" }}
            />
          </div>
          <div className="col-lg-4 col-12 col-md-6 p-0">
            <img
              src="/images/image 14.png"
              alt="MSU Logo"
              className=" home-img  w-100"
              style={{ height: "220px" }}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-5">
          <div className="col-10 ">
            <label className="home-label barlow-bold">Front End</label>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6 col-12 ">
            <div className="row">
              <div className="col-12">
                <p className="  barlow-bold home-intro3">{text20}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="home-intro3  barlow-bold">{text21}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="home-intro3  barlow-bold">{text22}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-lg-12 d-flex justify-content-center align-items-center">
                    <label className="home-example barlow-thin">
                      JavaScript Example
                    </label>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-12">
                    <img
                      src="/images/image 16.png"
                      alt="MSU Logo"
                      className=" home-img  w-100"
                      style={{ height: "275px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="col-12">
                    <img
                      src="/images/image 15.png"
                      alt="MSU Logo"
                      className=" home-img  w-100"
                      style={{ height: "200px" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <label className="home-example barlow-thin">
                      CSS Example
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-12">
                    <img
                      src="/images/image 18.png"
                      alt="MSU Logo"
                      className=" home-img  w-100"
                      style={{ height: "200px" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <label className="home-example barlow-thin">
                      HTML Example
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-5">
          {" "}
          {<hr className="home-divider mt-3" />}
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-10 ">
            <label className="home-label barlow-bold">Back End</label>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6 col-12 ">
            <div className="row">
              <div className="col-12">
                <p className="  barlow-bold home-intro3">{text30}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="home-intro3  barlow-bold">{text31}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="home-intro3  barlow-bold">{text32}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <label className="home-example barlow-thin">
                      Backend (Express) Example
                    </label>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-12">
                    <img
                      src="/images/image 19.png"
                      alt="MSU Logo"
                      className=" home-img  w-100"
                      style={{ height: "275px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="row mt-4">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <label className="home-example barlow-thin">
                      Amazon S3 Example
                    </label>
                  </div>
                </div>
                <div className="row mt-2 justify-content-center">
                  <div className="col-8">
                    <img
                      src="/images/image 20.png"
                      alt="MSU Logo"
                      className=" home-img  w-100"
                      style={{ height: "100px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <label className="home-example barlow-thin">
                      Amazon DynamoDB Example
                    </label>
                  </div>
                </div>
                <div className="row mt-2 justify-content-center">
                  <div className="col-6">
                    <img
                      src="/images/image 21.png"
                      alt="MSU Logo"
                      className=" home-img  w-100"
                      style={{ height: "100px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-5">
          {" "}
          {<hr className="home-divider mt-3" />}
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-10 ">
            <label className="home-label barlow-bold">Project Stucture</label>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
          <img
          src="/images/Frame 6.png"
          alt="MSU Logo"
          className="home-img w-100"
        />
          </div>
        </div>
        <div className="row ">
          <div className="col-12 d-flex justify-content-center">
            <button
              className="home-but barlow-light"
              onClick={() => (window.location.href = "/jobs")}
            >
              Go to Mock website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
