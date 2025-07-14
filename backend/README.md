<!-- # AI Learning Platform - Backend (Node.js + TypeScript + MongoDB)

This is the backend for a mini learning platform. It allows users to:
- Register
- Select categories and subcategories
- Send prompts to an AI (mocked)
- View their learning history

---

## 🚀 Technologies Used

- Node.js
- TypeScript
- Express
- MongoDB (with Mongoose)
- dotenv
- ts-node-dev

---

## 📂 Project Structure
src/
├── config/
├── controllers/
├── models/
├── routes/
├── seed/
└── index.ts

---

## 📦 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-learning-platform.git
cd ai-learning-platform/backend

### 2. Install dependencies
bash
Copy code
npm install

### 3. Create .env file
Create a .env file at the root:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai_learning
OPENAI_API_KEY=your_api_key_here
You can also use .env.example as reference.

### 4. Seed Categories (Optional)
bash
Copy code
npx ts-node src/seed/seedCategories.ts
### 5. Start Development Server
npm run dev
Server will start on http://localhost:5000.

📡 API Endpoints Summary
Method	Endpoint	Description
POST	/api/users	Create new user
GET	/api/users	Get all users
GET	/api/categories	Get all categories
GET	/api/categories/:id/subcategories	Get subcategories by category
POST	/api/prompts	Submit prompt and get mock response
GET	/api/prompts/:userId	Get user’s learning history

🧪 Mock AI
This version uses a mock AI response like:

📘 This is a mock lesson about: "Your prompt here"

To integrate with OpenAI, you can update the promptController.ts and add real API calls.

📦 Scripts
json
Copy code
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
}
📁 .gitignore
gitignore
Copy code
/node_modules
/dist
.env
.env.*
*.log
✍️ Author
Created as part of a full-stack practical assignment.
Contact: [your-email@example.com]
 -->
