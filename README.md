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

## Quick Start

### Backend

1. Create a MySQL database named `course_portal`.
2. Update credentials in `backend/src/main/resources/application.properties` if needed.
3. Start the API:

```bash
cd backend
mvn spring-boot:run
```

The backend runs at `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Default API Flow

- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Courses: `GET /api/courses`
- Admin course management: `POST|PUT|DELETE /api/courses`
- Enrollments: `POST /api/enrollments/{courseId}`
- Assignments: `POST /api/assignments/{courseId}/submit`
- Certificates: `POST /api/certificates/{courseId}/generate`

JWT tokens are returned on login and should be sent as `Authorization: Bearer <token>`.
