// Redux slice (features/teacher/classSlice.js)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE + '/classes';

const getAuthToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async () => {
  const res = await axiosInstance.get('/');
  return res.data;
});

export const addClass = createAsyncThunk('classes/addClass', async (classData) => {
  const res = await axiosInstance.post('/', classData);
  return res.data;
});

export const deleteClass = createAsyncThunk('classes/deleteClass', async (id) => {
  await axiosInstance.delete(`/${id}`);
  return id;
});

export const updateClass = createAsyncThunk(
  'classes/updateClass',
  async ({ id, updatedData }) => {
    const res = await axiosInstance.put(`/${id}`, updatedData);
    return res.data;
  }
);

export const fetchClassesById = createAsyncThunk(
  'classes/fetchClassesById',
  async (teacherId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/teacher/${teacherId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const classSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: [],
    fetchLoading: false,
    addLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message;
      })
      .addCase(addClass.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.addLoading = false;
        state.classes.push(action.payload);
      })
      .addCase(addClass.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter(cls => cls.id !== action.payload);
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const index = state.classes.findIndex(cls => cls.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      })
      .addCase(fetchClassesById.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchClassesById.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClassesById.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message;
      });
  },
});

export default classSlice.reducer;