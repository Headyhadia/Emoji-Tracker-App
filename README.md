## Project overview

This repository contains a full-stack Emoji Tracker Application with a Django REST API (backend) and a React + Vite frontend. The two projects live inside the same root folder but run independently during development.

**Quick facts**

- React dev server: `http://localhost:5173`
- Django dev server: `http://127.0.0.1:8000`

---

## Folder structure (important parts)

```
root/
  backend/        # Django project (manage.py here)
    .env.example    # environment variables used here
    requirements.txt   # pip requirements (see below)
  frontend/       # React app (package.json here)
    src/            # React source (inside frontend)
      api/
        api.js
      components/
        Tracker/
        DefaultEmoji/
        Navbar/
      App.jsx
      App.css
```

## Local setup

# Backend

1. Create and activate a virtual environment

```bash
python -m venv .venv
# windows
.venv\Scripts\activate
```

2. Install Python dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Create (or apply) DB migrations and run the server:

```bash
cd backend
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

4. Confirm the API works: open `http://127.0.0.1:8000/api/emojis/` in your browser

5. ### Seed Data (Development)

This project includes a custom Django management command to seed emoji entries for the last 30 days.

Run:

```bash
python manage.py seed_30_days_emojis
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

2. Open `http://localhost:5173/`.

---
