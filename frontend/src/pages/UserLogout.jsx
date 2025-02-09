import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserLogout = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const LogoutUser = () => {
      try {
        // Clear the token state and remove it from localStorage
        setToken("");
        localStorage.removeItem("token");
        console.log("User successfully logged out.");
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    };

    LogoutUser();
  }, [token]);

  return <Navigate to="/login" />;
};

export default UserLogout;
