import React from "react"
import { Link } from "gatsby"
import { FaFolder } from "react-icons/fa"

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
    <article className="mb-12">
      <header className="mb-3">
        <small className="block text-xs mb-2 text-gray-500">
          {date}
          {categories ? <Categories categories={categories} /> : null}
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

const Categories = ({ categories }) => {
  return (
    <span>
      {" "}
      • <FaFolder className="inline mr-0.5 opacity-60" />{" "}
      {categories.map(category => (
        <Link to={`categories/${category}`}>{category}</Link>
      ))}
    </span>
  )
}
