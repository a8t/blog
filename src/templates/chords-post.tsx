import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Chords,
  Lyrics,
  Section,
  TransposeProvider,
  TransposeControl,
} from "../components/chords"
import AutoscrollControl from "../components/AutoscrollControl"
import ControlMenu from "../components/ControlMenu"
import PrevNext from "../components/PrevNext"

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

      <article>
        <header className="mb-4">
          <p className="my-4 block text-sm text-gray-500">
            <Link to="/">april theses</Link> /{" "}
            <Link to="/chords">chord charts</Link> • {post.frontmatter.date}
          </p>
          <h1 className="text-4xl text-teal-700">{post.frontmatter.title}</h1>
        </header>
        <hr className="mb-8 bg-gray-300" style={{ height: 1 }} />

        <TransposeProvider>
          <ControlMenu>
            <AutoscrollControl />
            <TransposeControl />
          </ControlMenu>
          <MDXProvider components={{ Chords, Lyrics, Section }}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </TransposeProvider>

        <hr className="my-8 bg-gray-300" style={{ height: 1 }} />
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
