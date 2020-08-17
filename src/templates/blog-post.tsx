import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import classNames from "classnames"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Separator from "../components/separator"

const BlogPostTemplate = ({ data: { post, site }, pageContext, location }) => {
  const siteTitle = site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header className="mb-4">
          <p className="my-4 block text-sm text-gray-500">
            {post.frontmatter.date}
          </p>
          <h1 className="text-4xl text-gray-900 font-extrabold leading-tight">
            {post.frontmatter.title}
          </h1>

          <p className="italic mb-8 mt-6 text-gray-500">
            {post.frontmatter.description}
          </p>
        </header>
        <hr className="mb-8 bg-gray-300" style={{ height: 1 }} />

        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <MDXProvider components={{ Separator }}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </div>

        <hr className="mb-8 bg-gray-300 mt-8" style={{ height: 1 }} />

        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul className="grid grid-cols-2 gap-2 list-none">
          {previous ? (
            <li className="h-full flex justify-end items-start">
              <Link
                to={previous.fields.slug}
                rel="prev"
                tabIndex={1}
                className={classNames(
                  "flex flex-col items-end",
                  "p-4 h-full",
                  "bg-cool-gray-50 hover:bg-cool-gray-100 focus:bg-cool-gray-100"
                )}
              >
                <span className="text-xs text-gray-400">Previous</span>
                <span className="text-md text-gray-700 text-right">
                  {previous.frontmatter.title}
                </span>
              </Link>
            </li>
          ) : (
            <div className="w-1/2" />
          )}
          {next && (
            <li className=" h-full">
              <Link
                to={next.fields.slug}
                rel="next"
                className={classNames(
                  "flex flex-col items-start",
                  "p-4 h-full",
                  "bg-cool-gray-50 hover:bg-cool-gray-100 focus:bg-cool-gray-100 "
                )}
              >
                <span className="text-xs text-gray-400">Next</span>
                <span className="text-md text-gray-700">
                  {next.frontmatter.title}
                </span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
