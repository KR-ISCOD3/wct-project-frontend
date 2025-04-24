import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';  // Assuming authSlice is defined elsewhere
import courseReducer from './features/admin/courseSlice';  // Import the course slice
import studentReducer from './features/admin/studentSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,  // Add the course slice to the store
    student: studentReducer
  },
});

export default store;
