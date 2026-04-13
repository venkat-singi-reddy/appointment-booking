# HealthCarePlus — Appointment Booking Application

A full-stack healthcare appointment booking platform built with Spring Boot (Java 21) + React + PostgreSQL, deployable on Heroku.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Spring Boot 3.4.x, Java 21, JPA     |
| Database   | PostgreSQL (H2 for local dev)        |
| Frontend   | React 19, Bootstrap 5.3, React Router 7 |
| Build      | Maven 3.9, npm 10                   |
| Deploy     | Heroku (single dyno)                |
| CI/CD      | GitHub Actions                      |

---

## Features

- 🏥 Healthcare provider themed landing page
- 👨‍⚕️ Doctor listing with specializations, filtering & search
- 📅 Multi-step appointment booking form
- 📋 View & cancel appointments by email lookup
- 🔌 REST API with full CRUD for Appointments, Doctors, Patients
- 🔒 CORS-configured backend, validation & error handling
- 🚀 Auto-deploy to Heroku on push to `main`

---

## Local Development

### Prerequisites
- Java 21
- Maven 3.9+
- Node.js 20+
- npm 10+

### Backend

```bash
cd backend
mvn spring-boot:run
```

Runs at http://localhost:8080 with H2 in-memory database.
H2 Console available at: http://localhost:8080/h2-console

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs at http://localhost:3000 (proxied to port 8080).

---

## API Reference

### Doctors
| Method | Endpoint                                | Description              |
|--------|-----------------------------------------|--------------------------|
| GET    | `/api/doctors`                          | List all doctors         |
| GET    | `/api/doctors/available`                | List available doctors   |
| GET    | `/api/doctors/{id}`                     | Get doctor by ID         |
| GET    | `/api/doctors/specialization/{spec}`    | Filter by specialization |
| GET    | `/api/doctors/search?name=`             | Search by name           |
| POST   | `/api/doctors`                          | Create doctor            |
| PUT    | `/api/doctors/{id}`                     | Update doctor            |
| DELETE | `/api/doctors/{id}`                     | Delete doctor            |

### Patients
| Method | Endpoint                        | Description                    |
|--------|---------------------------------|--------------------------------|
| GET    | `/api/patients`                 | List all patients              |
| GET    | `/api/patients/{id}`            | Get patient by ID              |
| GET    | `/api/patients/email/{email}`   | Get patient by email           |
| POST   | `/api/patients`                 | Create or find patient         |
| PUT    | `/api/patients/{id}`            | Update patient                 |

### Appointments
| Method | Endpoint                                    | Description                    |
|--------|---------------------------------------------|--------------------------------|
| GET    | `/api/appointments`                         | List all appointments          |
| GET    | `/api/appointments/{id}`                    | Get appointment by ID          |
| GET    | `/api/appointments/patient/{id}`            | Get by patient ID              |
| GET    | `/api/appointments/patient/email/{email}`   | Get by patient email           |
| GET    | `/api/appointments/doctor/{id}`             | Get by doctor ID               |
| POST   | `/api/appointments`                         | Book appointment               |
| PUT    | `/api/appointments/{id}/status?status=`     | Update status                  |
| DELETE | `/api/appointments/{id}/cancel`             | Cancel appointment             |

---

## Heroku Deployment

This project uses a monorepo structure with both backend and frontend. The root `pom.xml` handles building both:
1. The backend Java/Spring Boot application (from `backend/` directory)
2. The frontend React application (from `frontend/` directory) using frontend-maven-plugin
3. The frontend build is copied to `target/classes/static/` to be served by Spring Boot

### Setup Secrets in GitHub

Navigate to **Settings → Secrets → Actions** and add:

| Secret Name       | Value                         |
|-------------------|-------------------------------|
| `HEROKU_API_KEY`  | Your Heroku API key           |
| `HEROKU_APP_NAME` | Your Heroku app name          |
| `HEROKU_EMAIL`    | Your Heroku account email     |

### Manual Deploy

```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:essential-0
heroku config:set SPRING_PROFILES_ACTIVE=prod
git push heroku main
```

**Note:** Heroku auto-detects the Java buildpack by finding `pom.xml` at the repository root. The build process will:
- Install Node.js and npm using frontend-maven-plugin
- Build the React frontend (`npm install` && `npm run build`)
- Build the Spring Boot backend
- Package everything into a single JAR file

### Environment Variables on Heroku

| Variable                | Description                                      |
|-------------------------|--------------------------------------------------|
| `DATABASE_URL`          | Auto-set by Heroku Postgres addon                |
| `SPRING_PROFILES_ACTIVE`| Set to `prod` to use PostgreSQL                  |
| `PORT`                  | Auto-set by Heroku                               |

---

## Project Structure

```
appointment-booking/
├── backend/                         # Spring Boot application
│   ├── src/main/java/com/healthcare/appointmentbooking/
│   │   ├── config/                  # CORS, exception handler, data init
│   │   ├── controller/              # REST controllers
│   │   ├── dto/                     # Request/Response DTOs
│   │   ├── model/                   # JPA entities
│   │   ├── repository/              # Spring Data JPA repositories
│   │   └── service/                 # Business logic
│   └── pom.xml
├── frontend/                        # React application
│   ├── src/
│   │   ├── components/              # Navbar, Footer, DoctorCard, ServiceCard
│   │   ├── pages/                   # Home, Doctors, BookAppointment, MyAppointments
│   │   └── services/api.js          # Axios API client
│   └── package.json
├── .github/workflows/
│   ├── ci.yml                       # CI: test + build on push/PR
│   └── deploy.yml                   # CD: deploy to Heroku on main push
├── Procfile                         # Heroku process definition
├── system.properties                # Heroku Java version
└── .gitignore
```
