import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Separator from "../components/separator"
import PrevNext from "../components/PrevNext"
import CategoriesList from "../components/CategoriesList"

const BlogPostTemplate = ({ data: { post, site }, pageContext, location }) => {
  const siteTitle = site.siteMetadata.title
  const { previous, next } = pageContext

  const { categories } = post.frontmatter

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header className="mb-4">
          <p className="my-4 block text-sm text-gray-500">
            <Link to="/">april theses</Link> /{" "}
            <Link to="/blog">blog posts</Link>
            {categories && <CategoriesList categories={categories} />} •{" "}
            {post.frontmatter.date}
          </p>
          <h1 className="text-4xl text-teal-700 font-extrabold leading-tight">
            {post.frontmatter.title}
          </h1>

          <p className="italic mb-8 mt-6 text-gray-500">
            {post.frontmatter.description}
          </p>
        </header>
        <hr className="mb-8 bg-gray-300" style={{ height: 1 }} />

        <div className="prose prose-sm sm:prose lg:prose-lg">
          <MDXProvider components={{ Separator }}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </div>

        <hr className="mb-8 bg-gray-300 mt-8" style={{ height: 1 }} />

        <footer>
          <Bio />
        </footer>
      </article>

      <PrevNext
        previous={{
          slug: previous?.fields.slug,
          title: previous?.frontmatter.title,
        }}
        next={{ slug: next?.fields.slug, title: next?.frontmatter.title }}
      />
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
        categories
      }
    }
  }
`
