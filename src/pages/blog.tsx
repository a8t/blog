import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import _ from "lodash"
import Listing from "../components/listing"
import Header from "../components/header"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Header subtitle="blog" />
      <section className="pb-8">
        <hr style={{ height: 1 }} className="mb-4" />
        <header className="text-sm text-gray-500 mb-8 flex sm:block">
          <span>
            Some thoughts, usually reposted from my social media accounts.
          </span>
        </header>
        {posts.map(({ node }) => (
          <Listing
            to={node.fields.slug}
            title={node.frontmatter.title || node.fields.slug}
            date={node.frontmatter.date}
            content={node.frontmatter.description || node.excerpt}
          />
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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { mdxNodeType: { eq: "blog" } } }
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
