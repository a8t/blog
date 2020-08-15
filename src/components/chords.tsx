import React from "react"

export function Chords({ children }) {
  return (
    <span
      className="
        block font-mono whitespace-pre text-green-700 
        mt-2 text-xs
        sm:mt-4 sm:text-md
      "
    >
      {children}
    </span>
  )
}

export function Lyrics({ children }) {
  return (
    <span
      className="
        block font-mono 
        text-xs
        sm:text-md
      "
    >
      {children}
    </span>
  )
}

export function Section({ children }) {
  return (
    <span className="block font-mono mt-12 text-xl text-gray-900">
      {children}
    </span>
  )
}
