import React, { useEffect } from 'react'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import SideBarTeacher from './components/SideBarTeacher'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './features/auth/authSlice'  // Adjust path based on where your slice is located

function TeacherDashboardHome() {
  const dispatch = useDispatch()

  // Get the user data from the Redux store
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)

  // Fetch user data when the component mounts
  useEffect(() => {
    dispatch(getUser())  // This will call the getUser async thunk to fetch the user data
  }, [dispatch])

  // Log user data and any potential error
  useEffect(() => {
    if (user) {
      console.log("Fetched User Data:", user)
    }
    if (error) {
      console.log("Error fetching user:", error)
    }
  }, [user, error])

  return (
    <>
      {/* form-for teacher */}
      <NotFound />
      <div className="container-fluid p-0 d-none d-xl-flex">
        <SideBarTeacher />
        <main className="col-10">
          <Header />
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default TeacherDashboardHome;
