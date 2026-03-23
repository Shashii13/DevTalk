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

## 🔐 Login Flow

- User enters email & password
- Backend validates credentials
- JWT token stored in cookies
- User redirected to home page
## 🧾 Signup Flow

- User registers with username, email & password
- Password is hashed before storing
- JWT token issued on successful signup
- Redirect to profile setup
## 👤 User API

- GET /api/user/current → fetch logged-in user
## 🔄 Session Handling

- Automatically fetch logged-in user on app load
- Maintains session using cookies





## 💬 Chat Feature

- Send & receive messages
- Display chat history
- Supports text and image messages

## 👤 Profile

- Update name and profile image
- Image uploaded using Cloudinary
- Real-time UI update after changes

## ✨ UI Improvements

- Auto-scroll to latest messages
- Loading indicators for better UX
- Improved empty states
- Smooth transitions and interactions