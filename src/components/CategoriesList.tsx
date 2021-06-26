import { Link } from "gatsby"
import React from "react"
import { FaFolder } from "react-icons/fa"

const CategoriesList = ({ categories }) => (
  <span>
    {" "}
    • <FaFolder className="inline opacity-60" />{" "}
    {categories.map((category, index, arr) => (
      <span>
        <Link to={`/categories/${category}`} className="ml-0.5">
          {category}
        </Link>
        {index === arr.length - 1 ? "" : ", "}
      </span>
    ))}
  </span>
)

export default CategoriesList
