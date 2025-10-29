# Project Tracker 

## ⚒️ Backend (Node.js + Express + PostgreSQL)

A simple `Node.js` + `TypeScript` + `Express` + `PostgreSQL` backend for tracking projects.
Includes authentication (JWT) and basic CRUD APIs for projects.

---


### ⚙️ Setup - BE

1. Clone repository:
   ```bash
   git clone https://github.com/RahafJ96/project-tracker.git
   cd project-tracker/backend
2. Install dependencies:
   ```bash
   npm install
3. Database with Docker:
   ```bash
   cd ../database
   docker compose up -d
4. Install dependencies:
   ```bash
   docker exec -i database-db-1 psql -U app -d project_tracker < schema.sql
---

### 🚀 Run the server
From `backend/`:
   ```bash
   npm run dev    # run in dev mode
   ```
Server should run on **http//:localhost:5000**

---

### 🧪 API Endpoints
#### Health
```bash
GET /health
```
#### Authentication
- `POST /auth/register` → create user
- `POST /auth/login` → copy `token` from response

Use the `Authorization: Bearer <token>` header in all project requests.

---

#### Projects
- `GET /projects` → list projects
- `POST /projects` → create new project
- `PUT /projects/:id` → update project
- `DELETE /projects/:id` → delete project
---


## 🖥️ Frontend (React + Vite + Tailwind CSS)

A simple `React.js` + `TypeScript` + `Vite` + `Tailwind CSS` frontend for tracking projects.
Includes 3 main Pages `Home` + `List of Projects` + `Login & Registeration`

---

### ⚙️ Set up
1. Install dependencies
   ```bash
   cd frontend
   npm install
   ```
2. Set environment variables
Create a `.env` file in `frontend/` with:
   ```bash
   API_URL=http://localhost:5000
   ```
3. Run the dev server
   ```bash
   npm run dev
   ```

---

## Database connection string (Render Postgres)
DATABASE_URL= `postgresql://project_tracker_db_5esk_user:axUSda38Tp4ELuOWgSY7tAXamzBbSeQY@dpg-d3uivtbe5dus739ntme0-a.oregon-postgres.render.com/project_tracker_db_5esk`

## Backend URL (API URL):
API_URL = `https://project-tracker-tfie.onrender.com/`

## Frontend URL:
FE_URL = `https://project-tracker-ra.netlify.app/`


## Live demo:
[Click here to view the live app](https://project-tracker-ra.netlify.app/)