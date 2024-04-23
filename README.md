The file contains Front End as Client folder and Back End as Server folder

********************* In Server Folder *******************
In jwt.js file - authenticateToken function is for check authentication when we hit an API 
In otp.js file for OTP (One-Time Password) generation 
In Details-crudModel.js file contains Schema to store the users details

Node.js User Authentication and CRUD Operations
This repository contains Node.js code for user authentication using JWT (JSON Web Tokens), OTP (One-Time Password) generation and verification, as well as CRUD (Create, 
Read, Update, Delete) operations for user details.

Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/your-repository.git
Install dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory.
Add the following variables:
makefile
Copy code
PORT=4004
SECRET_KEY=qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM.,1234567890!@#$%^&*()
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
Usage
Authentication Middleware
The authenticateToken middleware verifies JWT tokens sent with requests to secure routes.

OTP Generation and Verification
OTP generation is handled by the generateOTP function using otp-generator and bcrypt.
OTP verification is integrated into the /getotp endpoint, verifying the OTP against a hashed version stored in memory.
CRUD Operations
User Registration: POST request to /userregister with user details including name, email, phone, address, city, state, country, and password. User passwords are hashed using bcrypt.
User Login: POST request to /userlogin generates an OTP and sends it via email for verification. Users are authenticated using JWT after successful OTP verification.
Update User Details: PUT request to /updateuser/:Id updates user details including name, email, phone, address, city, state, country, and password. Authentication is required using JWT.
Delete User: DELETE request to /deleteuser/:Id deletes user details by ID. Authentication is required using JWT.
Database Schema
The DetailsModel schema defines the structure for user details stored in MongoDB using Mongoose.

Technologies Used
Node.js
Express.js
JWT (JSON Web Tokens)
OTP (One-Time Password) generation and verification
MongoDB with Mongoose
Nodemailer for email sending
bcrypt for password hashing
multer for file uploads
Running the Application
Start MongoDB:
bash
Copy code
mongod
Start the server:
bash
Copy code
npm start
The server will run on http://localhost:4004 by default.
