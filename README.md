Stylework Lead Tracker — Backend

Backend API for the Stylework Junior Full Stack Engineer assignment.

Live API

Backend: https://stylework-backend.onrender.com

Health Check: https://stylework-backend.onrender.com/api/health

API Base URL: https://stylework-backend.onrender.com/api

Overview

This service provides the REST API for a simple Lead Tracker application.

Required Features

Create a lead

List leads

Search leads by name, email, or phone

Update lead status

Store lead creation time

Lead Fields

Field

Type

Description

id

integer

Unique lead ID

name

string

Lead name

email

string

Lead email

phone

string

Lead phone number

status

enum

NEW, CONTACTED, QUALIFIED, CONVERTED, LOST

createdAt

timestamp

Lead creation timestamp

Tech Stack

Node.js

Express

PostgreSQL

Neon PostgreSQL

Zod

CORS

Vitest / Supertest for testing

Render for deployment

Architecture

The backend follows a simple layered architecture:

Request
│
▼
Routes
│
▼
Controllers
│
▼
Services
│
▼
Repositories
│
▼
PostgreSQL

Project Structure

src/
├── config/
│ ├── database.js
│ └── env.js
├── controllers/
│ └── lead.controller.js
├── middleware/
│ ├── error.middleware.js
│ └── not-found.middleware.js
├── repositories/
│ └── lead.repository.js
├── routes/
│ └── lead.routes.js
├── services/
│ └── lead.service.js
├── validators/
│ └── lead.validator.js
├── app.js
└── server.js

migrations/
└── 001_create_leads.sql

tests/

API Endpoints

Health

GET /api/health

Example response:

{
"success": true,
"message": "Lead Tracker API is running"
}

Create Lead

POST /api/leads
Content-Type: application/json

Request:

{
"name": "Rahul Sharma",
"email": "rahul@example.com",
"phone": "9876543210"
}

List Leads

GET /api/leads

Search Leads

GET /api/leads?search=rahul

Search checks:

Name

Email

Phone

PostgreSQL ILIKE is used for case-insensitive partial matching.

Update Lead Status

PATCH /api/leads/:id/status
Content-Type: application/json

Request:

{
"status": "CONTACTED"
}

Allowed statuses:

NEW
CONTACTED
QUALIFIED
CONVERTED
LOST

Database

PostgreSQL is used as the primary database.

The production database is hosted on Neon.

The leads table contains:

id
name
email
phone
status
created_at

Indexes are added for:

created_at

status

The status column also has a database-level CHECK constraint so invalid statuses cannot be stored.

Local Setup

1. Clone the repository

git clone <BACKEND_REPOSITORY_URL>
cd stylework-lead-tracker-backend

2. Install dependencies

npm install

3. Configure environment variables

Create .env:

PORT=5000
NODE_ENV=development
DATABASE_URL=your_postgresql_connection_string
FRONTEND_URL=http://localhost:5173

Do not commit .env.

4. Create the database table

Run:

migrations/001_create_leads.sql

against your PostgreSQL database.

5. Start the server

Development:

npm run dev

Production-style local run:

npm start

The API will be available at:

http://localhost:5000

Scripts

npm run dev
npm start
npm test
npm run test:watch

Deployment

The backend is deployed as a Render Web Service.

Render Configuration

Build Command:
npm install

Start Command:
npm start

Environment variables:

NODE_ENV=production
DATABASE_URL=<Neon connection string>
FRONTEND_URL=<Vercel frontend URL>

Render provides the PORT environment variable in production, so the application listens on process.env.PORT.

The server binds to:

0.0.0.0

which allows Render to route traffic to the service.

CORS

The production backend allows requests from the deployed frontend through:

FRONTEND_URL=https://stylework-frontend-teal.vercel.app

The frontend uses:

VITE_API_URL=https://stylework-backend.onrender.com/api

Validation and Error Handling

Zod validates incoming request data before it reaches the service layer.

Examples of invalid input:

Missing name

Invalid email

Phone number that is too short/long

Invalid lead status

Invalid lead ID

The API returns structured JSON errors:

{
"success": false,
"message": "Validation failed"
}

Trade-offs

PostgreSQL instead of MongoDB

PostgreSQL provides:

Strong data consistency

Constraints

Indexing

Straightforward relational modelling

The assignment has a small data model, so a relational database keeps the implementation simple.

Layered architecture

The repository/service/controller separation adds some files for a small application, but makes responsibilities clear and keeps database logic out of HTTP controllers.

No authentication

Authentication was intentionally not implemented because it is outside the assignment requirements. Adding authentication would increase scope without contributing directly to the required Lead Tracker features.

No pagination in the API

The assignment only requires listing and searching leads. Pagination can be introduced when the dataset becomes large.

Future Improvements

Authentication and role-based access

Pagination and server-side sorting

Lead deletion/archive

Lead activity/history tracking

Duplicate lead detection

Rate limiting

API documentation with OpenAPI/Swagger

More comprehensive integration tests

CI/CD with automated tests before deployment

Testing

The project uses Vitest and Supertest for automated backend testing.

Recommended test coverage includes:

Health endpoint

Create lead validation

Successful lead creation

List leads

Search leads

Update status

Invalid status

Non-existent lead

Invalid lead ID

404 routes

Run:

npm test

Assignment Criteria Mapping

Criterion

Implementation

Working Product

REST API + deployed Render service

Code Quality

Layered architecture, validation, error handling

README

This document

AGENT.md

AI usage and engineering decisions documented

Git Commit Trail

Small feature-focused commits

Deployment

Render + Neon

Testing

Vitest/Supertest test suite

License

This project was created as part of the Stylework Junior Full Stack Engineer assignment.
