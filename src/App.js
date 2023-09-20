import GreenLightRedLight from "./Game";
import UserRegistrationForm from "./form";
import "./styles.css";
import { Routes, Route, Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return userData !== null ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserRegistrationForm />} />
        <Route
          path="/game"
          element={
            <AuthRoute>
              <GreenLightRedLight />
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
}
