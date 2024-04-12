import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNavbar from './AppNavbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
        <AppNavbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout