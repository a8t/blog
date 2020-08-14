import React from "react"
import { Link } from "gatsby"
import "./layout.css"

import { rhythm, scale } from "../utils/typography"
import Header from "./header"

const Layout = ({ location, title, children }) => {
  const header =
    location.pathname === "/" ? (
      <h1
        style={{
          ...scale(1.5),
          marginTop: 0,
        }}
        className="mb-8"
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    ) : (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )

  return (
    <>
      <Header />

      <div>
        {/* <header style={{ display: "flex", alignItems: "flex-end" }}>
        {header} <Link to="about">about</Link>
      </header> */}
        <main
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
