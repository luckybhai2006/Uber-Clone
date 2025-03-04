import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CaptainLogout = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const LogoutCaptain = () => {
      try {
        // Clear the token state and remove it from localStorage
        setToken("");
        localStorage.removeItem("token");
        // console.log("Captain successfully logged out.");
        toast.success("Captain successfully logged out.");
      } catch (error) {
        toast.error("Error during logout:", error.message);
      }
    };

    LogoutCaptain();
  }, [token]);

  return <Navigate to="/captain-login" />;
};

export default CaptainLogout;
