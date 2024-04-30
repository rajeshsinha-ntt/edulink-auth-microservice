# Edulink E-Learning Platform - Auth Microservice :books::rocket:

Welcome to the Auth Microservice of Edulink, an e-learning platform built using Nest.js and TypeScript.

## Overview

This microservice handles authentication-related functionalities within the Edulink platform, providing endpoints for managing user authentication and authorization.

## Features

Generate token
Refresh token
Reset password
Health endpoint for checking the application's health status

## Installation

To install and run the Auth Microservice locally, follow these steps:
Clone the repository:

```bash
git clone https://github.com/rajeshsinha-ntt/edulink-auth-microservice.git
```

Navigate to the project directory:

```bash
cd EduLink-auth-microservice
```

Install dependencies:

```bash
npm install
```

Set up environment variables (if necessary).
Start the server:

```bash
npm run start
```

## API Documentation

### Health Endpoint

**URL:** `/api/health`
**Method:** `GET`
**Description:** Returns the health information of the application.
**Query Parameters:**
`dependency-health` (optional): If set to `true`, includes health information of external dependencies in the response.

## Usage

Make HTTP requests to the specified endpoints to interact with the Auth Microservice. Refer to the API documentation for detailed information on available endpoints and their usage.
