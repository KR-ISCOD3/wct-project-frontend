// src/features/admin/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/courses';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axiosInstance.get('/');
  console.log(response.data); // for debugging

  // ✅ extract the array from the `data` property
  return response.data.data;
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
        state.courses = state.courses.filter(course => course.id !== action.payload);
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
