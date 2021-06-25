import React from "react"

import Navbar from "./navbar"

const Layout = ({ location, title, children }) => {
  return (
    <div className="bg-cool-gray-50">
      <Navbar />
      <main className="container p-4 sm:p-6 mx-auto  lg:max-w-3xl">
        {children}
      </main>
    </div>
  )
}

export default Layout
