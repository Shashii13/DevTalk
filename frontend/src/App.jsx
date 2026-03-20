import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import getCurrentUser from "./customHooks/getCurrentUser";
function App() {
  getCurrentUser();
  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <h1>Home</h1> : <Navigate to="/login" />}
      />
      <Route
  path="/signup"
  element={!userData ? <SignUp /> : <Navigate to="/profile" />}
/>
    </Routes>
  );
}

export default App;