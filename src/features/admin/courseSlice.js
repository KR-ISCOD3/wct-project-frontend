// src/features/admin/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use VITE_API_BASE from .env
const API_URL = import.meta.env.VITE_API_BASE + '/courses';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axiosInstance.get('/');
  // console.log(response.data); // for debugging

  // Only keep courses where status is "enabled"
  const enabledCourses = response.data.data.filter(course => course.status === 'enabled');

  return enabledCourses;
});

export const addCourse = createAsyncThunk('courses/addCourse', async (course) => {
  const response = await axiosInstance.post('/', course);
  return response.data.data;
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (id) => {
  await axiosInstance.delete(`/${id}`);
  return id;
});

export const updateCourse = createAsyncThunk('courses/updateCourse', async ({ id, course }) => {
  const response = await axiosInstance.put(`/${id}`, course);
  return response.data.data;
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.courses.findIndex(course => course.id === id);
        if (index !== -1) {
          state.courses[index].status = 'disabled'; // just mark disabled
        }
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      });
  },
});

export default courseSlice.reducer;
