const AWS = require('aws-sdk');
require('dotenv').config({ path: '../.env' });

// Configure AWS
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create DynamoDB client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function verifyAdminUser() {
  const params = {
    TableName: 'AdminCredentials',
    Key: {
      username: 'Admin'
    }
  };

  try {
    const result = await dynamoDB.get(params).promise();
    
    if (result.Item) {
      console.log('Admin user found:');
      console.log('Username:', result.Item.username);
      console.log('Password hash exists:', !!result.Item.password);
    } else {
      console.log('Admin user not found in the database.');
    }
  } catch (error) {
    console.error('Error verifying admin user:', error);
  }
}

verifyAdminUser();