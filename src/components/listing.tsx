import React from "react"
import { Link } from "gatsby"
import CategoriesList from "./CategoriesList"

export default function Listing({
  date,
  to,
  title,
  content,
  categories,
}: {
  date: string
  to: string
  title: string
  content: string
  categories?: string[]
}) {
  return (
    <article className="mb-12 md:mb-4 md:h-44 md:bg-cool-gray-100 md:p-4 rounded-sm">
      <header className="mb-3">
        <small className="block text-xs mb-2 text-gray-500">
          {date}
          {categories ? <CategoriesList categories={categories} /> : null}
        </small>
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
