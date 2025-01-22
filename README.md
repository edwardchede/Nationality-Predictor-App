Nationality Predictor App Deployment on S3 Using LocalStack

This guide walks you through the steps to deploy the Nationality-Predictor-App as a static website using LocalStack to emulate AWS S3.

# Table of Contents
Prerequisites
Step 1: Build the React Project
Step 2: Create Deployment Folder
Step 3: Configure Docker Compose
Step 4: Start LocalStack Container
Step 5: Create an S3 Bucket
Step 6: Upload Files to S3 Bucket
Step 7: Configure Bucket Policy
Step 8: Access the Deployed Website
Step 9: Clean Up

**Prerequisites**
Ensure you have the following installed:

Node.js and npm: To build your React app.
Docker: To run the LocalStack container.
LocalStack: Emulates AWS services locally.
awslocal CLI: A CLI for interacting with LocalStack (bundled with LocalStack).

**Step 1: Build the React Project**

After the build is successful, a dist/ folder will be created in your project directory. This folder contains your bundled application.

**Step 2: Create Deployment Folder**

Create a folder named my-site in the root of your project
Inside the my-site/ folder, create a file named policy.json with the following content:

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": ["arn:aws:s3:::my-site/*"]
        }
    ]
}

**Step 3: Configure Docker Compose**
In the root of your project, create a docker-compose.yml file with the following content:

version: "3.8"
services:
  localstack:
    container_name: stacky
    image: localstack/localstack
    ports:
      - "127.0.0.1:4566:4566"
      - "127.0.0.1:4510-4559:4510-4559"
    volumes:
      - ./my-site:/opt/code/localstack/my-site


**Step 4: Start LocalStack Container**
Start the LocalStack container in detached mode using:
'docker compose up -d '

Enter the LocalStack container:
'docker exec -it stacky bash'


Navigate to the my-site folder:
cd /opt/code/localstack/my-site

**Step 5: Create an S3 Bucket**
Create an S3 bucket:

' awslocal s3api create-bucket --bucket my-site '

Verify the bucket creation using:
' awslocal s3api list-buckets' 

**Step 6: Upload Files to S3 Bucket by first Navigating to the dist folder:**

cd dist
Set up the S3 bucket to serve the website:
'awslocal s3 website s3://my-site --index-document index.html'

Upload all files from the dist folder:
'cd .. '

awslocal s3 sync dist s3://my-site

**Step 7: Configure Bucket Policy**
Allow public access to the S3 bucket:
'awslocal s3api put-bucket-policy --bucket my-site --policy file://policy.json'

**Step 8: Access the Deployed Website**
Open your browser and navigate to the following URL:
http://my-site.s3.localhost.localstack.cloud:4566/index.html

**Step 9: Clean Up**
Exit the container:
'exit'
Stop and remove the LocalStack container:

'docker compose down'

***Additional Notes**
Ensure all commands are executed in the appropriate directory.
For troubleshooting, check the LocalStack logs or container status using:

docker logs stacky
docker ps