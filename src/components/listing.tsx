import React from "react"
import { Link } from "gatsby"

export default function Listing({ date, to, title, content }): JSX.Element {
  return (
    <article className="mb-12">
      <header className="mb-3">
        <small className="block text-xs mb-2 text-gray-500">{date}</small>
        <h3 className="text-xl text-gray-600 hover:text-gray-400 font-extrabold leading-tight">
          <Link to={to}>{title}</Link>
        </h3>
      </header>
      <section>
        <p
          className="italic text-sm"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </section>
    </article>
  )
}
