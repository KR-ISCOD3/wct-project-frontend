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
  },
});

export default store;
