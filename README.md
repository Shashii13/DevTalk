## 📦 Frontend Setup

```bash
cd frontend
npm install
npm run dev

## 🎨 Styling

This project uses Tailwind CSS for fast and responsive UI development.
## 🗂 State Management

Redux Toolkit is used to manage:
- User authentication state
- Messages
- Online users

## 🗄 Database

MongoDB is used to store:
- User data
- Messages
- Conversations

## 🔐 Authentication

- Password hashing using bcrypt
- JWT-based authentication
- Secure cookie storage
## 🔗 API Routes (Auth)

- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/logout