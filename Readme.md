# Backend Development Assignment, MONTER

**Name: Shraman Paul**
**Date: 26/06/2024**

## Introduction

This documentation provides a detailed overview of the backend development assignment. The API provides all the functionalities for user registration, OTP verification, user information update, user login, and admin functionalities to manage users. Each endpoint is documented with request and response examples.

## Prerequisites

- Node.js
- MongoDB
- Postman for testing APIs

## Environment Setup
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
    ```
    npm install
    ```
4. Create a `.env` file in the root directory and add the following environment variables
    ```
    MONGO_URI=<mongodb_connection_string>
    PORT=5000
    JWT_SECRET=supersecretkey123!@
    EMAIL=<your_emailaddress>
    EMAIL_PASSWORD=<your_password>
    ```

5. Start the server
    ```
    node app.js
    ```
## API Endpoints
**Screenshots of the API calls from Postman Detailed View Link: <https://docs.google.com/document/d/1ji92RuOLRGdni0JK4tpYfqYuvgIoVN85br1XZ9JpZF8/edit?usp=sharing>**

### 1. User Registration and OTP Verification

**URL:** `/api/auth/register`
**Method:** `POST`

**URL:** `/api/auth/validate-otp`
**Method:** `POST`

### 2. User Information Update

**URL:** `/api/auth/update-info`
**Method:** `PUT`

### 3. User Login

**URL:** `/api/auth/login`
**Method:** `POST`

### 4. User Info

**URL:** `/api/auth/user-info`
**Method:** `GET`
**Headers:** `x-auth-token: <JWT Token>`

### 5. Update User Info

**URL:** `/api/auth/update-field`
**Method:** `PATCH`
**Headers:** `x-auth-token: <JWT Token>`

### 6. Admin Registration and Login

**URL:** `/api/admin/register`
**Method:** `POST`

**URL:** `/api/admin/login`
**Method:** `POST`

### 7. Admin views all registered Users

**URL:** `/api/admin/users`
**Method:** `GET`
**Headers:** `x-auth-token: <JWT Token>`

### 8. Admin Viewing and Deleting specific Users

**URL:** `/api/admin/user/:username`
**Method:** `GET`
**Headers:** `x-auth-token: <JWT Token>`

**URL:** `/api/admin/user/:username`
**Method:** `DELETE`
**Headers:** `x-auth-token: <JWT Token>`

## MONGODB SCHEMA

### 1. USERS

```json
{
  "email": {
    "type": "String",
    "required": true,
    "unique": true
  },
  "username": {
    "type": "String",
    "required": true,
    "unique": true
  },
  "password": {
    "type": "String",
    "required": true
  },
  "isActive": {
    "type": "Boolean",
    "default": false
  },
  "location": "String",
  "age": "Number",
  "work": "String",
  "dob": "Date",
  "description": "String"
}, { "timestamps": true }
```

### 2.ADMINS
```json
{
  "email": {
    "type": "String",
    "required": true,
    "unique": true
  },
  "username": {
    "type": "String",
    "required": true,
    "unique": true
  },
  "password": {
    "type": "String",
    "required": true
  },
  "timestamps": true
}
```

### 3. OTP
```json
{
 "email": {
        "type": "String",
        "required": true,
    },
    "otp": {
        "type": "String",
        "required": true,
    },
    "createdAt": {
        "type": "Date",
        "default": "Date.now",
        "index": { 
          "expires": 180
           },
    }
}
```

**Screenshots of the API calls from Postman Detailed View Link: <https://docs.google.com/document/d/1ji92RuOLRGdni0JK4tpYfqYuvgIoVN85br1XZ9JpZF8/edit?usp=sharing>**