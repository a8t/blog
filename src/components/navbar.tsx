import React, { useState } from "react"
import {
  FaPencilAlt,
  FaMusic,
  FaPersonBooth,
  FaUser,
  FaEnvelope,
} from "react-icons/fa"

import Hat from "./hat"
import { Link } from "gatsby"

const NavbarLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="no-underline text-base leading-6 font-medium text-teal-500 hover:text-teal-600 focus:outline-none focus:text-teal-700 transition ease-in-out duration-100"
      activeClassName="font-extrabold"
      partiallyActive
    >
      {children}
    </Link>
  )
}

const MobileNavbarLink = ({ to, children, icon }) => {
  return (
    <Link
      to={to}
      className="-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
    >
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-teal-700 text-white">
        {icon({ width: 24 })}
      </div>
      <div className="text-base leading-6 font-medium text-gray-900">
        {children}
      </div>
    </Link>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <div className="relative top-0 z-10">
        <div className="container m-auto flex justify-between items-center px-4 py-4 sm:px-6 sm:justify-start md:space-x-10">
          <div className="lg:w-0 flex-1">
            <Link to="/" className="flex">
              <Hat className="w-12" />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <NavbarLink to="/about-me">About me</NavbarLink>
            <NavbarLink to="/blog">Blog</NavbarLink>
            <NavbarLink to="/chords">Chord charts</NavbarLink>
            <NavbarLink to="/contact">Contact</NavbarLink>
          </nav>
        </div>
        {/*
      Mobile menu, show/hide based on mobile menu state.
  
      Entering: "duration-200 ease-out"
  From: "opacity-0 scale-95"
  To: "opacity-100 scale-100"
      Leaving: "duration-100 ease-in"
  From: "opacity-100 scale-100"
  To: "opacity-0 scale-95"
    */}
        {isMenuOpen && (
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg">
              <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5 space-y-6">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="flex">
                      <Hat className="w-12" />
                    </Link>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <nav className="grid grid-cols-1 gap-7">
                      <MobileNavbarLink icon={FaUser} to="/about-me">
                        About me
                      </MobileNavbarLink>
                      <MobileNavbarLink icon={FaPencilAlt} to="/blog">
                        Blog
                      </MobileNavbarLink>
                      <MobileNavbarLink icon={FaMusic} to="/chords">
                        Chords
                      </MobileNavbarLink>
                      <MobileNavbarLink icon={FaEnvelope} to="/contact">
                        Contact
                      </MobileNavbarLink>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    </>
  )
}
