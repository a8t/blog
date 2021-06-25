import React, { useState, useRef } from "react"
import { useClickAway } from "react-use"
import classNames from "classnames"
import { FaTimes, FaCogs } from "react-icons/fa"
import Button from "./Button"

export default function ControlMenu({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  const ref = useRef(null)
  useClickAway(ref, () => setIsOpen(false))

  return (
    <>
      <div
        ref={ref}
        className={classNames(
          "fixed right-4 bottom-4 sm:right-11 sm:bottom-11",
          "flex flex-col space-y-2 items-end",
          "border-2 border-gray-200 border-opacity-50 lg:border-none rounded-md",
          "px-4 sm:px-8 pt-2 sm:pt-4 pb-8 lg:pb-6 bg-gray-100 shadow-2xl  lg:shadow-none ",
          "z-20",
          { hidden: !isOpen }
        )}
      >
        <Button className="lg:hidden" onClick={() => setIsOpen(false)}>
          <FaTimes className="w-3 h-3 absolute bottom-3 right-3 text-gray-400" />
        </Button>
        {children}
      </div>
      <Button
        onClick={() => setIsOpen(true)}
        className={classNames(
          "fixed right-4 bottom-4 sm:right-11 sm:bottom-11",
          "flex flex-col space-y-2 items-end",
          "p-4 bg-gray-50 shadow-md",
          "lg:hidden"
        )}
      >
        <FaCogs className="w-8 h-8 text-gray-400" />
      </Button>
    </>
  )
}