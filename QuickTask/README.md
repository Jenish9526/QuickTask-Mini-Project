# QuickTask – A Personal Task Manager

A full-stack MERN web application built as the capstone mini project for the
Full Stack Web Development Internship (CE0318) by **Jenish Dobariya (IU2441230218)**,
Institute of Technology and Engineering, Indus University.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, React Router v6, Axios  |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB + Mongoose                |
| Auth       | JWT + Bcrypt.js                   |

---

## Project Structure

```
QuickTask/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # register / login logic
│   │   └── taskController.js      # CRUD for tasks
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── models/
│   │   ├── User.js                # Mongoose User schema
│   │   └── Task.js                # Mongoose Task schema
│   ├── routes/
│   │   ├── authRoutes.js          # POST /api/auth/register|login
│   │   └── taskRoutes.js          # GET/POST/PUT/DELETE /api/tasks
│   ├── .env.example               # Environment variable template
│   ├── package.json
│   └── server.js                  # Express app entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── api/
        │   └── axiosInstance.js   # Axios with JWT interceptors
        ├── components/
        │   ├── PrivateRoute.js    # Auth-protected route wrapper
        │   ├── TaskCard.js        # Single task card UI
        │   └── TaskModal.js       # Create / Edit task modal
        ├── context/
        │   └── AuthContext.js     # Global auth state (Context API)
        ├── pages/
        │   ├── Login.js           # Login page
        │   ├── Register.js        # Registration page
        │   └── Dashboard.js       # Kanban board dashboard
        ├── App.js                 # Routes definition
        └── index.js               # React entry point
```

---

## API Endpoints

### Auth (Public)
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| POST   | /api/auth/register    | Register new user  |
| POST   | /api/auth/login       | Login & get JWT    |

### Tasks (Protected — requires `Authorization: Bearer <token>`)
| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | /api/tasks        | Get all tasks for user       |
| POST   | /api/tasks        | Create a new task            |
| GET    | /api/tasks/:id    | Get single task              |
| PUT    | /api/tasks/:id    | Update task                  |
| DELETE | /api/tasks/:id    | Delete task                  |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm

---

### 1. Clone / Download the project

```bash
cd QuickTask
```

---

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/quicktask
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
```

Start the backend server:
```bash
npm run dev      # with nodemon (auto-reload)
# or
npm start        # production
```

The API will run at: **http://localhost:5000**

---

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm start
```

The React app will run at: **http://localhost:3000**

> The `"proxy": "http://localhost:5000"` in `frontend/package.json` forwards
> all `/api` calls to the backend automatically during development.

---

## Features

- **User Registration & Login** with JWT authentication
- **Secure password hashing** using Bcrypt
- **Three-column Kanban board** — To-Do / In Progress / Done
- **Create, Edit, Delete tasks** via modal form
- **Priority levels** — High (red), Medium (orange), Low (blue)
- **Due dates** with date picker
- **Protected routes** — dashboard only accessible when logged in
- **Auto logout** on token expiry (401 interceptor)
- **Fully responsive** — adapts to mobile, tablet, desktop

---

## Author

**Jenish Dobariya**
IU2441230218 | B.Tech CSE-C, Sem-4
Institute of Technology and Engineering, Indus University, Ahmedabad
