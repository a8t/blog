import React from "react"
import { Link } from "gatsby"

export default function Header({ title = "april theses", subtitle = null }) {
  if (subtitle) {
    return (
      <header className="my-12">
        <h1 className="text-md mb-2">
          <Link to="/">{title}</Link> /
        </h1>
        <h2 className="text-5xl sm:text-6xl text-gray-500 page-header">
          {subtitle}
        </h2>
      </header>
    )
  }

  return (
    <header className="my-12">
      <h1 className="text-md text-gray-500 page-header">{title}</h1>
    </header>
  )
}
