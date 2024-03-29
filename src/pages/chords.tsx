import React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import _ from "lodash"
import Listing from "../components/listing"
import Header from "../components/header"

const ChordsIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All chords" />
      <section className="sm:flex flex-row-reverse items-end justify-between">
        <div className="hidden sm:block">
          <StaticImage
            src="../images/guitar.png"
            alt="Andy on guitar"
            placeholder="tracedSVG"
            width={200}
          />
        </div>

        <Header subtitle="chord charts" />
      </section>

      <section className="pb-8">
        <hr style={{ height: 1 }} className="mb-4" />
        <header className="text-sm text-gray-500 mb-8 flex sm:block">
          <span>
            A collection of chord charts for some of my favourite songs.
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
    avatar: file(absolutePath: { regex: "/guitar.png/" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
  }
`
