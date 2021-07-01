import React from "react"
import { Link, graphql } from "gatsby"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query CategoriesPageBySlug($category: String!) {
    site {
      siteMetadata {
        title
      }
    }

    category: allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`

const CategoryListing = function ({ date, to, title, content }): JSX.Element {
  return (
    <article className="mb-12">
      <header className="mb-1">
        <small className="block text-xs mb-1 text-gray-500">{date}</small>
        <h3 className="text-md text-gray-600 hover:text-gray-400 font-extrabold leading-tight">
          <Link to={to}>{title}</Link>
        </h3>
      </header>
      <section>
        <p
          className="italic text-xs"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </section>
    </article>
  )
}

const CategoriesPageTemplate = ({ data, pageContext, location }) => {
  const { category: categoryName } = pageContext
  const { site, category } = data

  const siteTitle = site.siteMetadata.title

  const { totalCount, edges } = category

  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } in category "${categoryName}"`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`${categoryName}`} description="Post categories" />
      <p className="my-4 block text-sm text-gray-500">
        <Link to="/">april theses</Link> /{" "}
        <Link to="/categories">categories</Link> / {categoryName}
      </p>
      <h1 className="text-teal-700 text-2xl">{categoryHeader}</h1>

      <ul className="my-8">
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug} className="mb-8">
              <CategoryListing
                to={slug}
                title={title}
                date={node.frontmatter.date}
                content={node.frontmatter.description || node.excerpt}
              />
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default CategoriesPageTemplate

CategoriesPageTemplate.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
