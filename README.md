# BroGroup — Backend API

A simple backend API that provides:
- User authentication: register and login
- Posts resource: create, read (list + getById), update, delete (CRUD)

This README uses Node.js/Express + MongoDB (Mongoose) style examples for requests and environment configuration, but the API contract and instructions are generic and can be adapted to other stacks (e.g., Express + PostgreSQL, Rails, Django).

## Table of contents
- [Features](#features)
- [Tech stack (example)](#tech-stack-example)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone and install](#clone-and-install)
  - [Environment variables](#environment-variables)
  - [Run](#run)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
    - [Register — POST /api/auth/register](#register---post-apiauthregister)
    - [Login — POST /api/auth/login](#login---post-apiauthlogin)
  - [Posts](#posts)
    - [List posts — GET /api/posts](#list-posts---get-apiposts)
    - [Get post by id — GET /api/posts/:id](#get-post-by-id---get-apipostsid)
    - [Create post — POST /api/posts](#create-post---post-apiposts)
    - [Update post — PUT /api/posts/:id](#update-post---put-apipostsid)
    - [Delete post — DELETE /api/posts/:id](#delete-post---delete-apipostsid)
- [Authentication details](#authentication-details)
- [Error handling](#error-handling)
- [Database and migrations](#database-and-migrations)
- [Testing](#testing)
- [Docker (optional)](#docker-optional)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- User registration with hashed passwords
- Login with JWT access tokens
- Posts endpoints: list, create, read (by id), update, delete
- Authorization required for create/update/delete (token in Authorization header)
- JSON request/response API

## Tech stack (example)
- Node.js (>=14)
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for auth
- bcrypt for password hashing
- (Optional) Jest / Supertest for tests

## Getting started

### Prerequisites
- Node.js and npm/yarn
- MongoDB (local or URI to a hosted instance)
- Git

### Clone and install
```bash
git clone https://github.com/Abdulaziz-developer1/BroGroup.git
cd BroGroup
# install dependencies (npm or yarn)
npm install
# or
yarn
```

### Environment variables
Create a `.env` file in the project root. Example variables:

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/brogroup
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

Adjust the variables for your environment (production secrets must be stored securely).

### Run
Development:
```bash
npm run dev
# or
yarn dev
```

Production:
```bash
npm start
```

Run tests (if provided):
```bash
npm test
```

## API Reference

Base URL (example): http://localhost:3000/api

All endpoints accept and return JSON. Protected endpoints require Authorization: Bearer <token> header.

### Authentication

Register and login endpoints return a JWT token on success.

#### Register — POST /api/auth/register
Request:
- Content-Type: application/json
- Body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}
```

Response (201 Created):
```json
{
  "user": {
    "id": "64f8a2b...",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

Common errors:
- 400 Bad Request — missing or invalid fields
- 409 Conflict — email already exists

#### Login — POST /api/auth/login
Request:
```json
{
  "email": "jane@example.com",
  "password": "securepassword"
}
```

Response (200 OK):
```json
{
  "user": {
    "id": "64f8a2b...",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

Errors:
- 400 Bad Request — missing fields
- 401 Unauthorized — invalid credentials

### Posts

Post resource with basic fields: id, title, content, authorId, createdAt, updatedAt. Adjust to your schema as needed.

#### List posts — GET /api/posts
Query params (optional): page, limit, q (search), sort
Response (200 OK):
```json
{
  "data
