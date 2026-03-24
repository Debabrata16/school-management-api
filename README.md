# **School Management API**

This is a Node.js API application built using the **Express.js** framework and **MySQL** database to manage school data. It allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

---

## **Features**

- **Add School API**: Allows adding new schools with their name, address, latitude, and longitude.
- **List Schools API**: Fetches all schools from the database and sorts them based on proximity to a user-specified latitude and longitude.

---

## **Table of Contents**

1. [Installation](#installation)
2. [API Endpoints](#api-endpoints)
   - [Add School](#add-school)
   - [List Schools](#list-schools)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Deployment](#deployment)
6. [Testing](#testing)
7. [License](#license)

---

## **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/school-management-api.git
  
2. Navigate to the project directory:

   ```bash
   cd school-management-api

3.Install dependencies:

    ```bash
    npm install

Set up a .env file in the root directory with the following variables (replace with your own values):

DB_HOST=caboose.proxy.rlwy.net
DB_PORT=43148
DB_USER=root
DB_PASSWORD=Zv************
DB_NAME=school_management
PORT=5000

Run the application:

npm run dev
API Endpoints
Add School
Endpoint: /addSchool
Method: POST
Description: Adds a new school to the database.


Deployment

This application can be deployed on services like:

Render: For hosting the Node.js app.
Railway: For hosting MySQL.

Make sure to set up environment variables on the deployment platform to match the values in your .env file.

Testing
Postman:
Import the Postman Collection and run tests for the API endpoints.
Command Line:
You can test the API endpoints directly using curl or Postman by sending GET or POST requests.
