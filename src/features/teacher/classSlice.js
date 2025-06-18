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
// Inside classSlice.js

export const fetchClassSummary = createAsyncThunk(
  'classes/fetchClassSummary',
  async (teacherId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/teacher/${teacherId}/summary`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updateClassStatus = createAsyncThunk(
  'classes/updateClassStatus',
  async ({ id, status_class }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/${id}/status`, { status_class });
      return { id, status_class: res.data.status_class };
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
    summary: {
      total_students: 0,
      total_classes: 0,
      progress_classes: 0,
      pre_end_classes: 0,
    },
    summaryLoading: false,
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
      }).addCase(fetchClassSummary.pending, (state) => {
        state.summaryLoading = true;
        state.error = null;
      })
      .addCase(fetchClassSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchClassSummary.rejected, (state, action) => {
        state.summaryLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateClassStatus.fulfilled, (state, action) => {
        const index = state.classes.findIndex(cls => cls.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      });   
  },
});

export default classSlice.reducer;