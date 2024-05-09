import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import EmployeeCreate from './components/EmployeeCreate'
import Dashboard from './components/Dashboard'
import EmployeeUpdate from './components/EmpolyeeUpdate'
import Register from './components/Registre'
import Protected from './components/Protected'
import EmployeeLists from './components/EmployeeLists'
import Logout from './components/Logout'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' index  element={<HomePage/>} />
      <Route path='/login'  element={<LoginPage/>} />
     
      <Route path='/register'  element={<Register/>} />
      <Route element={<Protected/>}>
      <Route path='/dashboard'  element={<Dashboard/>} />
      <Route path='/dashboard/employeeCreate'  element={<EmployeeCreate/>} />
      <Route path='/dashboard/employeeUpdate/:id'  element={<EmployeeUpdate/>} />
      <Route path='/dashboard/employeeLists'  element={<EmployeeLists/>} />
      <Route path='/logout'  element={<Logout/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
