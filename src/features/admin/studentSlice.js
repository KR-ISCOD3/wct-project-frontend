// src/features/student/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use environment variable for API base URL
const API_URL = import.meta.env.VITE_API_BASE + '/registercourse';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
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

export const registerStudent = createAsyncThunk(
  'student/registerStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      console.log('Sending student data:', studentData);
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

export const getStudents = createAsyncThunk(
  'student/getStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/');
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudents = createAsyncThunk(
  'student/updateStudents',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const disableStudent = createAsyncThunk(
  'student/disableStudent',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/${id}`);
      return { id };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const markAsPrinted = createAsyncThunk(
  'student/markAsPrinted',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/${id}/print`);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

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
      })
      .addCase(updateStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.student = action.payload;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(disableStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disableStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index].status = 'disabled';
        }
      })
      .addCase(disableStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(markAsPrinted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsPrinted.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(markAsPrinted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default studentSlice.reducer;
