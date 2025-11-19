# Blog-Platform
📝 Blog Platform – CRUD Application

A full-stack Blog Platform that allows users to create, read, update, and delete blog posts. Built with modern web technologies and deployed online for public use.

🔗 Live Demo:
👉 https://blog-platform-project-1.onrender.com/

✨ Features
📝 Blog Features (CRUD)

Create new blog posts

Read/view all blogs

Update existing posts

Delete posts permanently

🔐 Authentication (if included)

User Signup / Login

JWT authentication

Protected routes for creating/editing/deleting blogs

🎨 UI Features

Clean and responsive UI

User-friendly blog editor

Blogs displayed with date & author info

🛠️ Tech Stack
Frontend

React / HTML / CSS

Axios

Tailwind / Custom CSS

Backend

Node.js

Express.js

Database

MongoDB

Mongoose

📁 Project Structure
Blog-Platform/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── App.jsx
│
└── README.md

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform

🔧 Backend Setup
Install dependencies:
cd backend
npm install

Create .env file:
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_secret_key
PORT=5000

Start backend:
npm start

🎨 Frontend Setup
Install dependencies:
cd ../frontend
npm install

Start frontend:
npm run dev

📌 API Endpoints Summary
Blog Routes
Method	Route	Description
GET	/api/blogs	Get all blogs
GET	/api/blogs/:id	Get single blog
POST	/api/blogs	Create blog
PUT	/api/blogs/:id	Update blog
DELETE	/api/blogs/:id	Delete blog
Auth Routes (if used)
Method	Route	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login user
🌐 Deployment

The project is deployed using Render.com

🔗 Live Demo:
👉 https://blog-platform-project-1.onrender.com/

🎯 Future Enhancements

Admin dashboard

Image uploads for blogs

Rich text editor

Comments system

User profiles

🤝 Contributing

Pull requests are welcome!
For major changes, open an issue first to discuss.

📄 License

This project is licensed under the MIT License.
