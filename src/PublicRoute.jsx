import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If logged in, redirect to home (or dashboard)
  if (token) {
    return <Navigate to="/" replace />;
  }

  // If not logged in, show the public page
  return children;
};

export default PublicRoute;
