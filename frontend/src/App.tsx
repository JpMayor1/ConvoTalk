import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/useAuthStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import bg from "./assets/bg.png";

function App() {
  const authUser = useAuthStore((state) => state.authUser);
  return (
    <div
      className="bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Routes>
        <Route
          path="/*"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
