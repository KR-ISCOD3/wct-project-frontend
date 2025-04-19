import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to register a user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", userData);
      console.log(response.data);

      const token = response.data.data.token;
      const role = response.data.data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      return { token, role };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      const errorDetails = err.response?.data?.errors || null;
      return rejectWithValue({ message: errorMessage, details: errorDetails });
    }
  }
);

// ✅ Async thunk to login a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", credentials);
      console.log(response.data);

      const token = response.data.data.token;
      const role = response.data.data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      return { token, role };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      const errorDetails = err.response?.data?.errors || null;
      return rejectWithValue({ message: errorMessage, details: errorDetails });
    }
  }
);

// ✅ Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      return null;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

// ✅ Async thunk to get user data
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("User data fetched:", response.data); // Log the fetched data
      return response.data; // Return the user data
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Fetching user failed";
      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ Initial state
const initialState = {
  user: [],
  loading: false,
  error: null,
  success: false,
};

// ✅ Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // 🔹 Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // 🔹 Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.success = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })

      // 🔹 Get user data
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user";
      });
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
