# Online Course Management Portal

A full-stack starter template for an Online Course Management Portal using React.js, Spring Boot, JWT authentication, role-based dashboards, and MySQL.

## Tech Stack

- **Frontend:** React.js, Vite, Bootstrap, React Router, Axios
- **Backend:** Spring Boot REST API, Spring Security, JWT, Spring Data JPA
- **Database:** MySQL

## Project Structure

```text
frontend/
  src/
    components/
    pages/
    services/
backend/
  src/main/java/com/onlinecourse/portal/
    config/
    controller/
    dto/
    entity/
    repository/
    service/
```

## Prerequisites

Install these before running the project locally:

- Java 17 or newer
- Maven 3.9 or newer
- Node.js 18 or newer with npm
- MySQL 8 or Docker Desktop / Docker Engine

## How to Run Locally

Run the stack in three terminals: one for MySQL, one for the Spring Boot API, and one for the React app.

### 1. Start MySQL

#### Option A: Use Docker Compose

From the repository root, run:

```bash
docker compose up -d mysql
```

This starts MySQL on `localhost:3306` with:

- Database: `course_portal`
- Username: `root`
- Password: `password`

To stop MySQL later:

```bash
docker compose down
```

To stop MySQL and delete the local database volume:

```bash
docker compose down -v
```

#### Option B: Use an existing MySQL installation

Create the database manually:

```sql
CREATE DATABASE course_portal;
```

Then update these environment variables before starting the backend if your credentials differ from the defaults:

```bash
export DB_URL="jdbc:mysql://localhost:3306/course_portal?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
export DB_USERNAME="root"
export DB_PASSWORD="password"
```

### 2. Run the Spring Boot backend

Open a new terminal and run:

```bash
cd backend
mvn spring-boot:run
```

The backend starts at:

```text
http://localhost:8080
```

Useful backend environment variables:

```bash
export JWT_SECRET="replace-with-a-long-random-secret-at-least-32-characters"
export JWT_EXPIRATION_MS="86400000"
```

The backend uses `spring.jpa.hibernate.ddl-auto=update`, so JPA can create/update the tables automatically. A matching MySQL reference schema is also provided in `backend/src/main/resources/schema.sql`.

### 3. Run the React frontend

Open another terminal and run:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend starts at:

```text
http://localhost:5173
```

The default frontend API URL is:

```text
http://localhost:8080/api
```

You can change it in `frontend/.env`:

```bash
VITE_API_URL=http://localhost:8080/api
```

## Verify the API

After the backend is running, you can test the authentication flow with curl.

### Register a student

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo Student","email":"student@example.com","password":"Password123","role":"STUDENT"}'
```

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"Password123"}'
```

Copy the returned `token` and use it as a bearer token for protected endpoints.

### List courses

```bash
curl http://localhost:8080/api/courses
```

### Add a course as Admin or Trainer

Register or login with role `ADMIN` or `TRAINER`, then run:

```bash
TOKEN="paste-jwt-token-here"

curl -X POST http://localhost:8080/api/courses \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Full Stack Java","description":"React, Spring Boot, and MySQL starter course","category":"Development","price":149,"materialUrl":"https://example.com/materials/full-stack-java.pdf"}'
```

## Default API Flow

- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Courses: `GET /api/courses`
- Admin/Trainer course management: `POST|PUT /api/courses`
- Admin course deletion: `DELETE /api/courses/{id}`
- Enrollments: `POST /api/enrollments/{courseId}`
- Assignments: `POST /api/assignments/{courseId}/submit`
- Certificates: `POST /api/certificates/{courseId}/generate`

JWT tokens are returned on register/login and should be sent as `Authorization: Bearer <token>`.

## Troubleshooting

### Backend cannot connect to MySQL

- Confirm MySQL is running on port `3306`.
- Confirm the `course_portal` database exists.
- Check `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`.

### Frontend cannot reach backend

- Confirm the backend is running at `http://localhost:8080`.
- Confirm `frontend/.env` contains `VITE_API_URL=http://localhost:8080/api`.
- Restart `npm run dev` after changing `.env` values.

### Dependency download fails

If `npm install` or `mvn spring-boot:run` fails with a registry or repository access error, retry on a network that allows access to `https://registry.npmjs.org` and `https://repo.maven.apache.org`.
