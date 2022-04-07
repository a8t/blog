import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import _ from "lodash"
import Header from "../components/header"
import { Github, LinkedIn, Mail, Twitter } from "../components/icons"

const Contact = ({ data }) => {
  const { author } = data.site.siteMetadata

  return (
    <header className="mb-12 flex flex-col-reverse sm:flex-row sm:space-x-4 items-center sm:items-end relative">
      <section className="max-w-lg flex flex-col ">
        <div className="prose prose-sm sm:prose">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                icon: <LinkedIn />,
                url: "https://linkedin.com/in/a8t",
                label: "a8t",
                type: "LinkedIn",
              },
              {
                icon: <Github />,
                url: "https://github.com/a8t",
                label: "a8t",
                type: "Github",
              },
              {
                icon: <Twitter />,
                url: "https://twitter.com/SixthHead",
                label: "@SixthHead",
                type: "Twitter",
              },
              {
                icon: <Mail />,
                url: "mailto:hello@andytran.ca",
                label: "hello@andytran.ca",
                type: "Email",
              },
            ].map(({ icon, url, label, type }) => (
              <a href={url} className="no-underline flex items-center group">
                <div className="flex flex-col items-center w-24 p-3 rounded-md bg-white border border-gray-200 group-hover:bg-teal-50 transition-all duration-100">
                  {type}
                  <div className="w-6 mt-2">{icon}</div>
                </div>
                <div className="ml-2">{label}</div>
              </a>
            ))}
          </section>
        </div>
      </section>
    </header>
  )
}

const ContactPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Contact" />
      <Header subtitle="contact me" />
      <Contact data={data} />
    </Layout>
  )
}

export default ContactPage

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
  }
`
