
# AI Learning Platform

AI-powered learning platform built with Node.js, React, TypeScript, and MongoDB. Users can submit prompts by topic and receive AI-generated lessons with full learning history tracking.

---

##  Features

- Category & Sub-category selection
- AI-generated lessons (via OpenAI or Gemini)
- Prompt history per user
- User registration with phone number
- JWT-based authentication
- Role-based authorization (ADMIN / USER)
- Input validation with express-validator
- Configurable via `.env`
- Clean modular architecture (controllers, services, models, middleware)
- Docker + Docker Compose support for easy setup

---

##  Tech Stack

- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose
- **Frontend:** React, TypeScript, Redux, Axios, CSS
- **AI Integration:** OpenAI API (or local mock)
- **Authentication:** JWT + dotenv + express-validator

---

##  Project Structure

### Backend

```
backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   ├── config/
│   ├── app.ts
│   └── index.ts
├── .env
├── .dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   ├── components/
│   ├── components/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── shared/
│   │   └── shared/
│   ├── redux/
│   │   ├── slices/
│   │   └──store.tsx
│   ├── api/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── index.tsx
│   └── App.tsx
├── .env
├── package.json
├── package.json
└── tsconfig.json

```

---

##  Authentication & Authorization

- All users are registered as USER by default.
- A single ADMIN is defined via `.env`.  example:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secret123
```
- Login returns a JWT token.
- Use `Authorization: Bearer <token>` in headers for protected routes.

---

##  API Endpoints (Backend)


| Method | Endpoint                                      | Description                                      | Auth               |
|--------|-----------------------------------------------|--------------------------------------------------|--------------------|
| POST   | /api/auth/login                               | Login as user or admin                           | Public             |
| POST   | /api/auth/signup                              | Register a new user                              | Public             |
| GET    | /api/users                                    | Get all users                                    | Admin only         |
| POST   | /api/users                                    | Create a new user                                | Public             |
| PUT    | /api/users/:userId                            | Update a user                                    | Admin only         |
| DELETE | /api/users/:userId                            | Delete a user                                    | Admin only         |
| GET    | /api/categories/categories                    | Get all categories                               | User/Admin         |
| GET    | /api/categories/subcategories                 | Get all subcategories                            | User/Admin         |
| GET    | /api/categories/:categoryId/subcategories     | Get subcategories by category ID                 | User/Admin         |
| POST   | /api/categories/addCategory                   | Add a new category                               | Admin only         |
| POST   | /api/categories/addSubcategory                | Add a new subcategory                            | Admin only         |
| PUT    | /api/categories/category/:categoryId          | Update a category by ID                          | Admin only         |
| DELETE | /api/categories/category/:categoryId          | Delete a category by ID                          | Admin only         |
| PUT    | /api/categories/subcategory/:subCategoryId    | Update a subcategory by ID                       | Admin only         |
| DELETE | /api/categories/subcategory/:subCategoryId    | Delete a subcategory by ID                       | Admin only         |
| POST   | /api/prompts                                  | Submit a new prompt                              | User only          |
| GET    | /api/prompts/get/:userId                      | Get prompt history for a specific user           | Admin/User (self)  |
| GET    | /api/prompts/users                            | Get all user prompts                             | Admin only         |
| PUT    | /api/prompts/:promptId                        | Update a specific prompt                         | User/Admin         |
| DELETE | /api/prompts/:promptId                        | Delete a specific prompt                         | User/Admin         |


---

##  Environment Variables

### Backend `.env` Example:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai_learning
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secret123
```

### Frontend `.env` Example:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

---

##  Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/YehuditOutmazgin/ai-learning-platform
cd ai-learning-platform
```

### 2. Docker (Recommended)
```bash
docker-compose up --build
```
> This will start MongoDB and the backend server.

### 3. Run Frontend
In another terminal:
```bash
cd frontend
npm install
npm start
```

---

##  Manual Setup (without Docker)

### Backend
```bash
cd backend
npm install
npm run dev
```
> Ensure MongoDB is running on port 27017

### Frontend
```bash
cd frontend
npm install
npm start
```

---

##  Sample Login Request

**Admin Login:**  
```json
{
  "name": "admin",
  "phone": "secret123"
}
```

**User Login:**  
```json
{
  "name": "hadasa",
  "phone": "025555555"
}
```

---