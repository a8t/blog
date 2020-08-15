import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import _ from "lodash"

const SeeAll = ({ to }) => (
  <Link to={to} className="group hover:text-gray-900">
    <span className="group-hover:underline">See all</span>
    <span className="ml-3 no-underline">→</span>
  </Link>
)

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  const byType = _.toPairs(_.groupBy(posts, "node.fields.mdxNodeType"))

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="April heses" />
      <h1 className="text-5xl sm:text-6xl my-12 text-gray-500">april theses</h1>
      <section className="md:grid grid-cols-2">
        {byType.map(([type, nodes]) => (
          <section className="pb-8">
            <hr style={{ height: 1 }} className="mb-4" />
            <header className="text-sm text-gray-500 mb-8 flex sm:block">
              <span>
                Recent <span className="text-green-800">{type} </span>
                posts
              </span>
              <div className="text-sm text-gray-500 italic ml-auto sm:hidden">
                <SeeAll to={type} />
              </div>
            </header>
            {nodes.slice(0, 3).map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <article key={node.fields.slug} className="mb-12">
                  <header className="mb-3">
                    <small className="block text-xs mb-2 text-gray-500">
                      {node.frontmatter.date}
                    </small>
                    <h3 className="text-xl text-gray-600 hover:text-gray-400">
                      <Link to={node.fields.slug}>{title}</Link>
                    </h3>
                  </header>
                  <section>
                    <p
                      className="italic text-sm"
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </section>
                </article>
              )
            })}
            <footer className="text-sm text-gray-500 italic hidden sm:block">
              <SeeAll to={type} />
            </footer>
          </section>
        ))}
      </section>
      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            mdxNodeType
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
