import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import _ from "lodash"

const ChordsIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All chords" />
      <h1 className="text-5xl sm:text-6xl my-12 text-gray-500">april theses</h1>
      <section className="pb-8">
        <hr style={{ height: 1 }} className="mb-4" />
        <header className="text-sm text-gray-500 mb-8 flex sm:block">
          <span>
            A collection of chord sheets for some of my favourite songs.
          </span>
        </header>
        {posts.map(({ node }) => {
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
      </section>
    </Layout>
  )
}

export default ChordsIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { mdxNodeType: { eq: "chords" } } }
    ) {
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
