import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else if (role === 'teacher') {
    // Special case for teachers
    if (location.pathname.startsWith("/teacher-dashboard")) {
      return <Outlet />;
    } else {
      return <Navigate to="/teacher-dashboard" replace />;
    }
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
