import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return <>
    <Navbar/>
    <Outlet/>
  </>
}

export default AdminLayout;