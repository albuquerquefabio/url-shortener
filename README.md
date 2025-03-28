# URL Shortener

This project is a URL shortener application built using a monorepo structure powered by Nx. It includes both a backend and a frontend application.

## Why Nx and Monorepo?

Nx is a powerful tool for managing monorepos, which allows multiple projects to coexist in a single repository. This structure provides the following benefits:

- **Code Sharing**: Share code between the backend and frontend easily.
- **Consistency**: Enforce consistent tooling and configurations across projects.
- **Scalability**: Manage dependencies and build processes efficiently as the project grows.
- **Developer Productivity**: Nx provides tools like dependency graphs, affected commands, and caching to speed up development.

## Project Structure

- **apps/**: Contains the backend and frontend applications.

## Features

- URL Shortening
- Redirect Functionality
- Copy to Clipboard
- Theme Management
- Custom URL Slugs
- Visit Analytics
- User Authentication
- Rate Limiting
- URL Validation

### Feature Checklist

- [x] Build a web page with a form for entering a URL
- [x] When the form is submitted, return a shortened version of the URL
- [x] Save a record of the shortened URL to a database
- [x] Ensure the slug of the URL (abc123 in the screenshot above) is unique
- [x] When the shortened URL is accessed, redirect to the stored URL
- [x] If an invalid slug is accessed, display a 404 Not Found page

#### Extra:

- [x] Add support for accounts so people can view the URLs they created
- [x] Validate the URL provided is an actual URL
- [x] Display an error message if invalid
- [x] Make it easy to copy the shortened URL to the clipboard
- [x] Allow users to modify the slug of their URL
- [x] Track visits to the shortened URL
- [x] Add rate-limiting to prevent bad-actors from spamming the service

## Stacks Used

- React + SCSS + Ant Design
- Node.js + NestJS + TypeScript
- MongoDB
- Redis
- JWT
- Docker

## How to Run the Project

### Install Dependencies

Run the following command to install all dependencies:

```bash
yarn
```

### Run the Project in Development Mode

To start both the backend and frontend in development mode:

```bash
yarn start
```

### Build the Project

To build the frontend and backend applications:

```bash
yarn build:front
yarn build:back
```

## Running with Docker

### Run Only the Database

To start only the MongoDB database using Docker:

```bash
docker compose up -d mongodb
```

To start only the Redis database using Docker:

```bash
docker compose up -d redis
```

### Run the Project in Production Mode

To run the entire project (backend, frontend, Redis and database) in production mode using Docker:

```bash
docker compose up -d
```

## Accessing the Project

- Backend: [http://localhost:3000](http://localhost:3000)
- Frontend: [http://localhost:4200](http://localhost:4200)

# Screenshots

<img width="1073" alt="Screenshot 2025-03-22 at 01 58 46" src="https://github.com/user-attachments/assets/da3b2d2a-11e5-482b-8ac5-5aef11d2cc8a" />
<img width="1073" alt="Screenshot 2025-03-22 at 01 59 06" src="https://github.com/user-attachments/assets/4d9ba5eb-8671-470b-a008-979a5e8faa5a" />
<img width="1101" alt="Screenshot 2025-03-22 at 02 04 16" src="https://github.com/user-attachments/assets/be25870b-047d-43f2-aeff-5d367e0f0e3a" />
<img width="1101" alt="Screenshot 2025-03-22 at 03 34 46" src="https://github.com/user-attachments/assets/b78502cb-a2c8-4943-a405-d5412c9b6455" />

