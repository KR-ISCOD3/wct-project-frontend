import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE + "/students";

const getAuthToken = () => localStorage.getItem("token");

const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Fetch all students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const res = await axiosInstance.get("/");
    return res.data;
  }
);

// Add a student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData) => {
    const res = await axiosInstance.post("/", studentData);
    return res.data;
  }
);

// Get student by ID
export const fetchStudentById = createAsyncThunk(
  "students/fetchStudentById",
  async (id) => {
    const res = await axiosInstance.get(`/${id}`);
    return res.data;
  }
);

// Update student
export const updateStudent = createAsyncThunk(
  'teacherStu/updateStudent',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await axiosInstance.delete(`/${id}`);
    return id;
  }
);

export const fetchStudentsByClassId = createAsyncThunk(
  "students/fetchStudentsByClassId",
  async (classId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/class/${classId}`);
      console.log(res.data);
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Unknown error" });
    }
  }
);


const teacherStuSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    selectedStudent: null,
    fetchLoading: false,
    addLoading: false,
    error: null,
  },
  reducers: {
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchStudents.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addStudent.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.addLoading = false;
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.error.message;
      })

      // Fetch one
      .addCase(fetchStudentById.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.selectedStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.fetchLoading = false; 
        state.error = action.error.message;
      })

      // Update
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (st) => st.id === action.payload.id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (st) => st.id !== action.payload
        );
      })
      .addCase(fetchStudentsByClassId.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByClassId.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudentsByClassId.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload?.message || "Failed to fetch students";
      });
  },
});

export const { clearSelectedStudent } = teacherStuSlice.actions;

export default teacherStuSlice.reducer;
