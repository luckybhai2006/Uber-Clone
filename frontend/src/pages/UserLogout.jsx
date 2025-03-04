import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogout = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const LogoutUser = () => {
      try {
        // Clear the token state and remove it from localStorage
        setToken("");
        localStorage.removeItem("token");
        toast.success("User successfully logged out.");
      } catch (error) {
        toast.error("Error during logout:", error.message);
      }
    };

    LogoutUser();
  }, [token]);

  return <Navigate to="/login" />;
};

export default UserLogout;
