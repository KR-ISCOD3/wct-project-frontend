// src/features/student/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL for student registration
const API_URL = 'http://127.0.0.1:8000/api/registercourse';

// If you need a token for auth (if required), you can do like this:
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Register student async thunk
export const registerStudent = createAsyncThunk(
    'student/registerStudent',
    async (studentData, { rejectWithValue }) => {
      try {
        console.log('Sending student data:', studentData); // Add this line
        const response = await axiosInstance.post('/', studentData);
        return response.data.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  );


// 🔥 Get all students async thunk (NEW)
export const getStudents = createAsyncThunk(
  'student/getStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/');
      return response.data; // Return all students array
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);


// Slice
const studentSlice = createSlice({
  name: 'student',
  initialState: {
    student: null,
    students: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
        state.success = true;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.success = false;
      })
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

// Export reducer
export default studentSlice.reducer;
