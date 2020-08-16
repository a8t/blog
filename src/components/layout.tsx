import React from "react"
import "./layout.css"

import Navbar from "./navbar"

const Layout = ({ location, title, children }) => {
  return (
    <>
      <Navbar />
      <main className="container p-4 sm:p-6 mx-auto  lg:max-w-xl">
        {children}
      </main>
    </>
  )
}

export default Layout
