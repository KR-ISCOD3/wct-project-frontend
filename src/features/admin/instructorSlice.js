// src/features/admin/instructorsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthToken = () => localStorage.getItem('token');

// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE;

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/instructors`,
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

// Async thunk to fetch all instructors
export const fetchInstructors = createAsyncThunk(
  'instructors/fetchInstructors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch a single instructor by ID
export const fetchInstructorById = createAsyncThunk(
  'instructors/fetchInstructorById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to "soft delete" (disable) an instructor by updating status
export const deleteInstructor = createAsyncThunk(
  'instructors/deleteInstructor',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/${id}`);
      return response.data; // updated instructor data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const instructorsSlice = createSlice({
  name: 'instructors',
  initialState: {
    instructors: [],
    instructor: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearInstructor: (state) => {
      state.instructor = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.loading = false;
        // Keep only active instructors
        state.instructors = action.payload.filter(
          (inst) => inst.deleted_status === 'active'
        );
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInstructorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorById.fulfilled, (state, action) => {
        state.loading = false;
        state.instructor = action.payload;
      })
      .addCase(fetchInstructorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteInstructor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInstructor.fulfilled, (state, action) => {
        state.loading = false;
        const updatedInstructor = action.payload;
        
        // Update or remove inactive instructors
        state.instructors = state.instructors
          .map((inst) => inst.id === updatedInstructor.id ? updatedInstructor : inst)
          .filter((inst) => inst.deleted_status === 'active');

        // Update currently selected instructor if it matches
        if (state.instructor && state.instructor.id === updatedInstructor.id) {
          state.instructor = updatedInstructor;
        }
      })
      .addCase(deleteInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInstructor } = instructorsSlice.actions;
export default instructorsSlice.reducer;
