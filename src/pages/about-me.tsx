import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import _ from "lodash"
import Listing from "../components/listing"
import Header from "../components/header"
import SocialButtons from "../components/SocialButtons"
import Separator from "../components/separator"

const MainBio = ({ data }) => {
  const { author } = data.site.siteMetadata

  return (
    <header className="mb-12 flex flex-col-reverse sm:flex-row sm:space-x-4 items-center sm:items-end relative">
      <section className="max-w-lg flex flex-col ">
        <div className="prose prose-sm sm:prose">
          <MDXProvider components={{ hr: Separator }}>
            <MDXRenderer>{data.post.body}</MDXRenderer>
          </MDXProvider>
        </div>
        <SocialButtons />
      </section>
      <div className="w-48 pb-12 sm:sticky sm:bottom-0">
        <StaticImage
          src="../images/waving.png"
          alt={author.name}
          placeholder="tracedSVG"
        />
      </div>
    </header>
  )
}

const AboutMe = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About me" />
      <Header subtitle="about me" />
      <MainBio data={data} />
    </Layout>
  )
}

export default AboutMe

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }

    post: mdx(fileAbsolutePath: { regex: "/about-me/" }) {
      body
    }
  }
`
