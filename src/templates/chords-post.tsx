import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Chords, Lyrics, Section } from "../components/chords"
import AutoscrollControll from "../components/AutoscrollControl"

const ChordsPostTemplate = ({
  data: { post, site },
  pageContext,
  location,
}) => {
  const siteTitle = site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <AutoscrollControll />

      <article>
        <header className="mb-4">
          <p className="my-4 block text-sm text-gray-500">
            {post.frontmatter.date}
          </p>
          <h1 className="text-4xl text-gray-900">{post.frontmatter.title}</h1>
        </header>
        <hr className="mb-8 bg-gray-300" style={{ height: 1 }} />

        <MDXProvider components={{ Chords, Lyrics, Section }}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>

        <hr className="my-8 bg-gray-300" style={{ height: 1 }} />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li className="w-1/2 h-full flex justify-end items-start">
            {previous && (
              <Link
                to={previous.fields.slug}
                rel="prev"
                tabIndex={1}
                className="flex items-center hover:bg-cool-gray-50 focus:bg-cool-gray-50 p-4"
              >
                <span className="mr-3">←</span>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">Previous</span>
                  <span className="text-md text-gray-700">
                    {previous.frontmatter.title}
                  </span>
                </div>
              </Link>
            )}
          </li>
          <li className="w-1/2 h-full">
            {next && (
              <Link
                to={next.fields.slug}
                rel="next"
                className="flex items-center hover:bg-cool-gray-50 focus:bg-cool-gray-50 p-4"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Next</span>
                  <span className="text-md text-gray-700">
                    {next.frontmatter.title}{" "}
                  </span>
                </div>
                <span className="ml-3">→</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default ChordsPostTemplate

export const pageQuery = graphql`
  query ChordsPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    post: mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
