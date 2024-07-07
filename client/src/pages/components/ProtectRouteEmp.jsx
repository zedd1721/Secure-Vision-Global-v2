import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function ProtectRouteEmp({element: EmpDash, ...rest}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async() => {
      const token = Cookies.get("emptoken");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/user/verify-user', { withCredentials: true });
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return isAuthenticated ? <EmpDash {...rest} /> : <Navigate to="/login" />
}

export default ProtectRouteEmp;
