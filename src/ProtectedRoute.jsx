import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'admin' || role == 'assistant') {
    return <Outlet />;
  } else if (role === 'teacher') {
    // If already on /teacher-dashboard or its children, allow access
    if (location.pathname.startsWith("/teacher-dashboard")) {
      return <Outlet />;
    } else {
      return <Navigate to="/teacher-dashboard" replace />;
    }
  }

  // Optional: handle unknown roles
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
