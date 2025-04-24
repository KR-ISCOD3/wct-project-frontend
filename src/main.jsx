import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Teacher from "./pages/Teacher.jsx";
import Student from "./pages/Student.jsx";
import Course from "./pages/Course.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Classes from "./pages/Classes.jsx";
import AccountTeacher from "./pages/AccountTeacher.jsx";
import Attendance from "./pages/Attendance.jsx";
import Certificate from "./pages/Certificate.jsx";
import TeacherDashboard from "./teacher/TeacherDashboard.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import TeacherDashboardHome from "./TeacherDashboardHome.jsx";
import PublicRoute from "./PublicRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>

        {/* Protected routes for all roles */}
        <Route path="/" element={<ProtectedRoute allowedRoles={['admin', 'assistant', 'teacher']} />}>
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />

            <Route path="teacher" element={<Teacher />} />
            
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="student" element={<Student />} />
            </Route>


            <Route path="course" element={<Course />} />
            <Route path="class" element={<Classes />} />
            <Route path="account" element={<AccountTeacher />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="certificate" element={<Certificate />} />
          </Route>

          {/* Teacher dashboard layout */}
          <Route path="teacher-dashboard" element={<TeacherDashboardHome />}>
            <Route index element={<TeacherDashboard />} />
          </Route>

        </Route>

        {/* Public Routes */}
        <Route path="*" element={<NotFound />} />

        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

      </Routes>

      </BrowserRouter>
    </Provider>
  </StrictMode>
);
