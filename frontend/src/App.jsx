import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

function App() {
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
    </Routes>
  );
}

export default App;