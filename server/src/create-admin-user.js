const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });


console.log('Region:', process.env.AWS_DEFAULT_REGION);
console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY);


// Configure AWS
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create DynamoDB client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function createAdminUser() {
  const username = 'Admin';
  const password = 'Test112294';

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const params = {
    TableName: 'AdminCredentials',
    Item: {
      username: username,
      password: hashedPassword
    }
  };

  try {
    await dynamoDB.put(params).promise();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();