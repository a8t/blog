import React from "react"
import { Link, graphql } from "gatsby"
import _ from "lodash"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Listing from "../components/listing"
import Header from "../components/header"

const SeeAll = ({ to }) => (
  <Link
    to={to}
    className="group text-sm text-gray-500 hover:text-gray-900 italic"
  >
    <span className="group-hover:underline">See all</span>
    <span className="ml-3 no-underline">→</span>
  </Link>
)

const Homepage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { blogPosts, chordPosts } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="April Theses" />
      <Header />

      <section className="md:grid grid-cols-2">
        {[
          ["chords", chordPosts],
          ["blog", blogPosts],
        ].map(([type, { nodes }]) => (
          <section className="pb-8">
            <hr style={{ height: 1 }} className="mb-4" />
            <header className="text-sm text-gray-500 mb-8 flex sm:block">
              <span>
                Recent{" "}
                <Link to={type} className="font-bold">
                  {type}{" "}
                </Link>
                posts
              </span>
              <div className="ml-auto sm:hidden">
                <SeeAll to={type} />
              </div>
            </header>
            {nodes.slice(0, 3).map(node => (
              <Listing
                to={node.fields.slug}
                title={node.frontmatter.title || node.fields.slug}
                date={node.frontmatter.date}
                content={node.frontmatter.description || node.excerpt}
              />
            ))}
            <footer className="hidden sm:block">
              <SeeAll to={type} />
            </footer>
          </section>
        ))}
      </section>
      <Bio />
    </Layout>
  )
}

export default Homepage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    blogPosts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { mdxNodeType: { eq: "blog" } } }
      limit: 1000
    ) {
      nodes {
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

    chordPosts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { mdxNodeType: { eq: "chords" } } }
      limit: 1000
    ) {
      nodes {
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
`
