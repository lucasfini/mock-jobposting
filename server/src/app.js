const express = require('express');
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
// Configure AWS
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


 //------------------------- CREATE DYNAMO  --------------------------------- // 
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoDBRaw = new AWS.DynamoDB();
const s3 = new AWS.S3({
    logger: console,
    httpOptions: { timeout: 5000 }
  });
const TABLE_NAME = 'Applications';
const BUCKET_NAME = 'lucasmsubucket'
app.use(express.json());



 //------------------------- GET FILE INFORMATION   --------------------------------- // 
app.get('/api/files/:fileKey', async (req, res) => {
    const fileKey = decodeURIComponent(req.params.fileKey);
    
    console.log('Requested file key:', fileKey);
  
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Expires: 60
    };
  
    console.log('S3 params:', params);
    console.log('S3 Bucket Name:', process.env.S3_BUCKET_NAME);
  
    try {
      const headParams = { ...params };
      delete headParams.Expires;
      
    
      await s3.headObject(headParams).promise();
      
      const signedUrl = await s3.getSignedUrlPromise('getObject', params);
      console.log('Generated signed URL:', signedUrl);
      res.json({ signedUrl });
    } catch (error) {
      console.error('Error accessing S3 object:', error);
      if (error.code === 'NotFound') {
        res.status(404).json({ error: 'File not found in S3', details: error.message });
      } else if (error.code === 'AccessDenied') {
        res.status(403).json({ error: 'Access denied to S3 object', details: error.message });
      } else {
        res.status(500).json({ error: 'Failed to generate file URL', details: error.message });
      }
    }
});



 //------------------------- UPLOAD TOOL  --------------------------------- // 
  const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
        return cb(new Error('Only .pdf, .doc, .docx files are allowed'));
      }
      cb(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
  });
  

  
 //------------------------- POST FOR SUBMITTING APPLICATION  --------------------------------- // 
  app.post('/api/apply', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }]), async (req, res) => {
    try {
      const { name, email, jobId } = req.body;
      const resume = req.files['resume'][0];
      const coverLetter = req.files['coverLetter'][0];
  
      const applicationId = uuidv4();
      const timestamp = Date.now();
  
      const uploadFile = async (file, prefix) => {
        const fileExt = path.extname(file.originalname).toLowerCase();
        const fileName = `${prefix}_${applicationId}_${timestamp}${fileExt}`;
        
        await s3.upload({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `${prefix}/${fileName}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        }).promise();
  
        return `${prefix}/${fileName}`;
      };
  
      const resumeKey = await uploadFile(resume, 'resumes');
      const coverLetterKey = await uploadFile(coverLetter, 'coverletters');
  
      const params = {
        TableName: TABLE_NAME,
        Item: {
          applicationId: applicationId,
          jobId: jobId,
          name: name,
          email: email,
          resumeUrl: resumeKey,
          coverLetterUrl: coverLetterKey,
          appliedAt: new Date(timestamp).toISOString()
        }
      };
  
      await dynamoDB.put(params).promise();
  
      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ error: 'Failed to submit application', details: error.message });
    }
  });
  


 //------------------------- GET APPLICANTS FOR SPECIFIC JOB --------------------------------- // 
app.get('/api/applicants/:jobId', async (req, res) => {
    try {
      const { jobId } = req.params;
  
      const params = {
        TableName: 'Applications',
        IndexName: 'jobId-index',
        KeyConditionExpression: 'jobId = :jobId',
        ExpressionAttributeValues: {
          ':jobId': jobId
        }
      };
  
      const result = await dynamoDB.query(params).promise();
  
      res.status(200).json(result.Items);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      res.status(500).json({ error: 'Failed to fetch applicants', details: error.message });
    }
  });
  





 //------------------------- POST FOR LOGIN ENDPOINT  --------------------------------- // 
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const params = {
    TableName: 'AdminCredentials',
    Key: {
      username: username
    }
  };
  try {
    const result = await dynamoDB.get(params).promise();
    const user = result.Item;
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

 //------------------------- POST A LOGOUT ENDPOINT  --------------------------------- // 
app.post('/api/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
  });


 //------------------------- POST A JOB ENDPOINT  --------------------------------- // 
app.post('/api/jobs', async (req, res) => {
    const { jobName, category, deadline, description } = req.body;
  
    
    if (!jobName || !category || !deadline || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const jobId = uuidv4(); // Generate a unique ID for the job
    const currentDate = new Date().toISOString();
    const params = {
      TableName: 'Jobs',
      Item: {
        jobId: jobId,
        jobName: jobName,
        category: category,
        deadline: deadline,
        description: description,
        datePosted: currentDate,
        createdAt: currentDate
      }
    };
  
    try {
      await dynamoDB.put(params).promise();
      res.status(201).json({ message: 'Job created successfully', jobId: jobId });
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ error: 'Could not create job' });
    }
  });


  //------------------------- GET ALL JOBS --------------------------------- // 
app.get('/api/jobs', async (req, res) => {
    const params = {
      TableName: 'Jobs'
    };
  
    try {
      const data = await dynamoDB.scan(params).promise();
      res.json(data.Items);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ error: 'Could not fetch jobs', details: error.message });
    }
  });


  //------------------------- GET SPECIFIC JOB FROM JOB ID --------------------------------- // 
app.get('/api/jobs/:jobId', async (req, res) => {
    const { jobId } = req.params;
    const { datePosted } = req.query;

    const params = {
      TableName: 'Jobs',
      Key: {
        jobId: jobId,
        datePosted: datePosted
      }
    };
  
    try {
      const result = await dynamoDB.get(params).promise();
      
      if (result.Item) {
        res.json(result.Item);
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
      res.status(500).json({ error: 'Could not retrieve job details', details: error.message });
    }
  });
  

  //------------------------- DELETE JOB ENDPOINT--------------------------------- // 
  app.delete('/api/jobs/:jobId', async (req, res) => {
    const { jobId } = req.params;
    const { datePosted } = req.query;  
  
    if (!datePosted) {
      return res.status(400).json({ error: 'datePosted is required' });
    }
  
    const params = {
      TableName: 'Jobs',
      Key: {
        jobId: jobId,
        datePosted: datePosted
      }
    };
  
    try {
      await dynamoDB.delete(params).promise();
      res.json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Error deleting job:', error);
      res.status(500).json({ error: 'Could not delete job', details: error.message });
    }
  });




// ---------------------DELETE ALL APPLICANTS ------------------------------
app.delete('/api/applicants/all', async (req, res) => {
    try {
     
      const tableDescription = await dynamoDBRaw.describeTable({ TableName: TABLE_NAME }).promise();
      const keySchema = tableDescription.Table.KeySchema;
  
    
      const scanParams = {
        TableName: TABLE_NAME
      };
      const scanResult = await dynamoDB.scan(scanParams).promise();
      const items = scanResult.Items;
  
      
      for (const item of items) {
        if (item.resumeUrl) {
          await s3.deleteObject({ Bucket: BUCKET_NAME, Key: item.resumeUrl }).promise();
        }
        if (item.coverLetterUrl) {
          await s3.deleteObject({ Bucket: BUCKET_NAME, Key: item.coverLetterUrl }).promise();
        }
      }
  
    
      for (const item of items) {
        const deleteParams = {
          TableName: TABLE_NAME,
          Key: {}
        };
        
       
        for (const keyElement of keySchema) {
          deleteParams.Key[keyElement.AttributeName] = item[keyElement.AttributeName];
        }
  
        await dynamoDB.delete(deleteParams).promise();
      }
  
      res.json({ message: 'All applicants and their data have been deleted successfully.' });
    } catch (error) {
      console.error('Error deleting all applicants:', error);
      res.status(500).json({ error: 'Failed to delete all applicants', details: error.message });
    }
  });
















  //------------------------- LOGGING INFO----------------------------------

app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    next();
  });

  //----------------------------- SERVER RUNNING -----------------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});