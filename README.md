# AI Learning Platform - 
AI-powered learning platform built with Node.js, React, TypeScript and MongoDB. Users can submit prompts by topic and receive AI-generated lessons with full learning history tracking.

## Backend 
 This is the Node.js + TypeScript + MongoDB backend for an AI-driven learning platform.

## Frontend 
 This is the React + Redux + TypeScript  frontend for an AI-driven learning platform.

---

## Features

- Category & Sub-Category selection
- AI-generated lessons (via OpenAI or Gemini)
- Prompt history per user
- User registration with phone
- JWT-based authentication
- Role-based authorization (ADMIN / USER)
- Input validation with express-validator
- Configurable via `.env`
- Clean architecture (controllers, services, models, middlewares)

---

## Project Structure
### Backend
<pre>
backend/
├── src/
│   ├── controllers/ authController.ts, categoryController.ts,promptController.ts,userController.ts
│   ├── services/ validationService.ts, categoryService.ts,promptService.ts,userService.ts
│   ├── models/ Category.ts, Prompt.ts ,SubCategories.ts , User.ts
│   ├── routes/ categoryRoutes.ts,promptRoutes.ts,userRoutes.ts
│   ├── validators/ promptValidator.ts, userValidator.ts
│   ├── middlewares/ authMiddleWare.ts, erroHendler.ts , roleMiddleware.ts , validateRequest.ts
│   ├── config/ config.ts, db.ts
│   └── utils/ apiResponse.ts , AppError.ts , jwt.ts
├── .env
├── package.json
└── tsconfig.json
</pre>
---

## Technologies

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- OpenAI or Google Gemini
- JWT Authentication
- Express-validator

---

## Authentication & Authorization

- All users are registered as USER by default.
- A single ADMIN is defined via .env:

  ADMIN_USERNAME=admin
  ADMIN_PASSWORD=secret123

- Login returns a JWT token.
- Use the token in Authorization: Bearer <token> header.

---

## API Endpoints

| Method | Endpoint                              | Description                            | Auth        |
|--------|---------------------------------------|----------------------------------------|-------------|
| POST   | /api/users                            | Register user (name, phone)            |  No auth  |
| GET    | /api/users                            | List all users                         |  ADMIN     |
| POST   | /api/auth/login                       | Login as admin                         |  No auth  |
| GET    | /api/categories                       | Get all categories                     |  No auth  |
| GET    | /api/categories/:id/subcategories     | Get subcategories by category          |  No auth  |
| POST   | /api/prompts                          | Submit new prompt                      |  USER      |
| GET    | /api/prompts/:userId                  | Get user’s prompt history              |  USER      |

---

## Environment Variables

Create a `.env` file based on the following structure in the backend directory:
<pre>
PORT=5000  
MONGODB_URI=mongodb://localhost:27017/ai_learning  
OPENAI_API_KEY=your_openai_key  //if you won't support openai key  it will run with a mock prompts.
JWT_SECRET=your_jwt_secret  
ADMIN_USERNAME=admin  
ADMIN_PASSWORD=secret123
</pre>

Create a `.env` file based on the following structure in the frontend directory:
<pre>
REACT_APP_API_BASE_URL=http://localhost:5000/api
</pre>
---

## Run Locally

1. Clone the project: 
   ```git clone https://github.com/YehuditOutmazgin/ai-learning-platform```
2. Enter to project directory: 
   ```cd ai-learning-platform```
---
### Run Backend
1. Enter the backend directory:
   ```cd backend```

2. Install dependencies:
   ```npm install```

3. Start the server:
   ```npm run dev```

Make sure MongoDB is running locally on port 27017.
---
### Run Backend
1. Enter the backend directory:
   ```cd frontend```

2. Install dependencies:
   ```npm install```

3. Start the server:
   ```npm start```
   
---

## Sample Login Request

POST /api/auth/login  
Content-Type: application/json

for admin:
<pre>
{
  "name": "admin",
  "phone": "secret123"
}
</pre>
Response:
<pre>
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1..."
  }
}
</pre>
---

for user:
<pre>
{
  "name": "hadasa",
  "phone": "025555555"
}
</pre>
Response:
<pre>
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1...",
    "userId":"6f556f..."
  }
}
</pre>
---

## License

This project is part of a technical evaluation. Not for commercial use.


