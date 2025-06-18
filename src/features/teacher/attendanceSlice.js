import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Setup base URL for attendance
const API_URL = import.meta.env.VITE_API_BASE + "/attendance";

// Auth token getter
const getAuthToken = () => localStorage.getItem("token");

// Axios instance
const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Async thunk to submit attendance
export const submitAttendance = createAsyncThunk(
  "attendance/submit",
  async (attendanceData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/store", attendanceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Async thunk to fetch attendance summary by class ID
export const fetchAttendanceByClass = createAsyncThunk(
  "attendance/fetchByClass",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/class/${classId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Attendance slice
const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
    classAttendance: {}, // new
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(submitAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
  
      // 👉 Handling fetchAttendanceByClass
      .addCase(fetchAttendanceByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classAttendance = action.payload;
      })
      .addCase(fetchAttendanceByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  }
  
});

export default attendanceSlice.reducer;
