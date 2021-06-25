import classNames from "classnames"
import { Link } from "gatsby"
import React from "react"

interface Article {
  title?: string
  slug?: string
}

const PrevNext = ({ previous, next }: { previous: Article; next: Article }) => (
  <nav className="grid grid-cols-2 gap-2 list-none">
    {previous.slug ? (
      <div className="h-full flex justify-end items-start">
        <Link
          to={previous.slug}
          rel="prev"
          tabIndex={1}
          className={classNames(
            "flex flex-col items-end",
            "p-4 h-full w-full",
            "no-underline",
            "bg-cool-gray-100 hover:shadow-outline-teal focus:shadow-outline-teal"
          )}
        >
          <span className="text-xs text-gray-400">Previous</span>
          <span className="text-md text-gray-700 text-right">
            {previous.title}
          </span>
        </Link>
      </div>
    ) : (
      <div className="w-1/2" />
    )}
    {next.slug && (
      <div className=" h-full">
        <Link
          to={next.slug}
          rel="next"
          className={classNames(
            "flex flex-col items-start",
            "p-4 h-full w-full",
            "no-underline",
            "bg-cool-gray-100 hover:shadow-outline-teal focus:shadow-outline-teal"
          )}
        >
          <span className="text-xs text-gray-400">Next</span>
          <span className="text-md text-gray-700">{next.title}</span>
        </Link>
      </div>
    )}
  </nav>
)

export default PrevNext
