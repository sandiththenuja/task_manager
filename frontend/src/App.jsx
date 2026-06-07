import { useContext, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Outlet, Navigate} from 'react-router-dom'
import AdminDashboard from './pages/admin/AdminDashboard'
import Dashboard from './pages/user/Dashboard'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import PrivateRoute from './routes/PrivateRoute'
import ManageTasks from './pages/Admin/manageTasks'
import CreateTask from './pages/Admin/CreateTask'
import ManageUsers from './pages/Admin/ManageUsers'
import MyTasks from './pages/user/MyTasks'
import ViewTaskDetails from './pages/user/ViewTaskDetails'
import UserProvider, { UserContext } from './context/userContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            {/* Admin routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} /> }>
              <Route path='/admin/dashboard' element={<AdminDashboard />} />
              <Route path='/admin/tasks' element={<ManageTasks />} />
              <Route path='/admin/create-task' element={<CreateTask />} />
              <Route path='/admin/users' element={<ManageUsers />} />
            </Route>

            {/* user routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path='/user/dashboard' element={<Dashboard />} />
              <Route path='/user/my-tasks' element={<MyTasks />} />
              <Route path='/user/task-details:id' element={<ViewTaskDetails />} />
            </Route>

            {/* Default route */}
            <Route path='/' element={<Root />} />

          </Routes>
        </Router>
      </div>
      </UserProvider>
    </>
  )
}

export default App

const Root = () => {
  const {user, loading} = useContext(UserContext)

  if (loading) return <Outlet />

  if (!user){
    return <Navigate to='/login' />
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />
}