# Donation Platform for any NGO
## Description
A generic website designed to fit the purpose of any NGO, which serves as a template for what a platform for an NGO would look like. Features include,
- authentication for admins
- admin control for managing donations - pending and completed orders view
- sending reminders for pending donations
- minimal human interaction for donations management
- responsive design for mobile phones - making it accessible from any device

## Technology used
- React - Frontend
- Express and Node.js - Middleware
- MongoDB - Backend

## Setup Instructions
### Frontend
- Step 1: Clone repo using `git clone https://github.com/yash-seth/Donation-Platform.git`
- Step 2: Navigate to the folder and run `npm i` to install all required dependencies
- Step 3: Run the frontend using `npm start`
     
### Backend
- Step 1: Clone repo using `git clone https://github.com/yash-seth/Donation-Platform.git`
- Step 2: Navigate to the folder and run `npm i` to install all required dependencies
- Step 3: Run the backend using `nodemon index.js`
      
### Database
- Step 1: Assign a MongoDB cluster
- Step 2: Using mongoose library, set the Database connection for the middleware
- Step 3: Generate connection string to connect to the database
     
### Setting up the environment variables
#### Frontend
- Step 1: Setup EmailJS and auth0 accounts to generate the required *secret keys*
- Step 2: Follow the _.env.sample_ to setup the environment variables
     
#### Backend
- Step 1: Setup MongoDB cluster to generate the required *connection string*
- Step 2: Follow the _.env.sample_ to setup the environment variables

## Demo
The platform has been hosted for demo purposes- https://donation-platform-zeta.vercel.app/

> **_NOTE:_** For the purpose of the demo, any user can become an admin by signing up. In practice, we can enforce user management rules, to ensure only the admins 
are able to login and access the donations dashboard.

## Samples
### Homepage
![image](https://github.com/yash-seth/Donation-Platform/assets/71393551/fb83b3a9-4846-4cdc-b9c2-be17ec23a340)

### Donations - User view
![image](https://github.com/yash-seth/Donation-Platform/assets/71393551/053f44c5-9c88-485d-8b6e-e3a41cf55054)

### Authentication:
![image](https://github.com/yash-seth/Donation-Platform/assets/71393551/92771eb9-f06c-470a-8094-f6ff41656290)

### Donations - Admin view
#### Pending Orders
![image](https://github.com/yash-seth/Donation-Platform/assets/71393551/19cc7452-9cb6-4143-bad5-d427c453c8bd)
#### Completed Orders
![image](https://github.com/yash-seth/Donation-Platform/assets/71393551/f347f1fd-d2b6-4d3f-aea4-07e77de58004)



