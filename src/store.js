// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import courseReducer from "./features/admin/courseSlice";
import studentReducer from "./features/admin/studentSlice";
import instructorsReducer from "./features/admin/instructorSlice";
import searchReducer from "./features/search/searchSlice";
import buildingReducer from "./features/admin/buildingSlice";
import classReducer from "./features/teacher/classSlice";
import teacherStudentReducer from "./features/teacher/teacherStuSlice";
import attendanceReducer from "./features/teacher/attendanceSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    student: studentReducer,
    instructors: instructorsReducer,
    search: searchReducer,
    buildings: buildingReducer,
    classes: classReducer,
    teacherStu: teacherStudentReducer,
    attendance: attendanceReducer,
  },
});

export default store;
