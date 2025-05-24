import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE + '/buildings';

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

// Fetch buildings (no need to filter; backend already does it)
export const fetchBuildings = createAsyncThunk('buildings/fetchBuildings', async () => {
  const response = await axiosInstance.get('/');
  return response.data;
});

// Add building
export const addBuilding = createAsyncThunk('buildings/addBuilding', async (building) => {
  const response = await axiosInstance.post('/', building);
  return response.data;
});

// Delete (mark as deleted)
export const deleteBuilding = createAsyncThunk('buildings/deleteBuilding', async (id) => {
  await axiosInstance.delete(`/${id}`);
  return id;
});

export const updateBuilding = createAsyncThunk('buildings/updateBuilding', async ({ id, buildingName, roomNumber }) => {
    const response = await axiosInstance.put(`/${id}`, {
        buildingName,
        roomNumber
    });
    return response.data;
});

const buildingSlice = createSlice({
  name: 'buildings',
  initialState: {
    buildings: [],
    fetchLoading: false,
    addLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch buildings
      .addCase(fetchBuildings.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.buildings = action.payload;
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message;
      })

      // Add building
      .addCase(addBuilding.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addBuilding.fulfilled, (state, action) => {
        state.addLoading = false;
        state.buildings.push(action.payload);
      })
      .addCase(addBuilding.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.error.message;
      })

      // Delete building (soft delete)
      .addCase(deleteBuilding.fulfilled, (state, action) => {
        const id = action.payload;
        state.buildings = state.buildings.filter(building => building.id !== id);
      })

      // Update building
      .addCase(updateBuilding.fulfilled, (state, action) => {
        const index = state.buildings.findIndex(building => building.id === action.payload.id);
        if (index !== -1) {
          state.buildings[index] = action.payload;
        }
      });
  },
});

export default buildingSlice.reducer;
