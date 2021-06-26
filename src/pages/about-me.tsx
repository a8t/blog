import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import _ from "lodash"
import Listing from "../components/listing"
import Header from "../components/header"
import SocialButtons from "../components/SocialButtons"
import { StaticImage } from "gatsby-plugin-image"

const MainBio = ({ data }) => {
  const { author } = data.site.siteMetadata
  return (
    <header className="mb-12 flex flex-col sm:flex-row sm:space-x-4 items-center">
      <section className="max-w-lg flex flex-col items-center sm:items-start">
        <section className="space-y-2">
          <p>Hello. I'm Andy Tran.</p>
          <p>
            {" "}
            I am Vietnamese, born and raised near Toronto, Ontario, Canada. My
            parents arrived here in Canada in the 80s. My father was a{" "}
            <a href="https://en.wikipedia.org/wiki/Vietnamese_boat_people">
              Boat Person
            </a>{" "}
            who first came as a refugee. (Yes,{" "}
            <Link to="/blog/2018/06/18/my-father/">it's complicated</Link>.)
          </p>
          <p>
            I went to university to study physics. I decided quickly that I
            would not like to be a physicist. After I graduated, I followed a
            path that I didn't really expect I'd take, which was to follow my
            father's footsteps and pursue software development.
          </p>
          <p>
            Since 2017, I have worked at a few small companies as a full-stack
            software developer. I've learned a lot about both handling technical
            projects and working with software teams. I've managed databases,
            built mobile apps, maintained REST and GraphQL APIs, and more.
          </p>

          <hr style={{ height: 1 }} className="my-8" />

          <p>
            Along the way, I got involved with the Philippine{" "}
            <a href="https://en.wikipedia.org/wiki/National_Democracy_(Philippines)">
              National Democratic Movement
            </a>{" "}
            as a member of{" "}
            <a href="https://anakbayantoronto.org">Anakbayan Toronto</a>. I had
            the opportunity to visit the Philippines in 2019 as part of an
            Exposure trip, the goal of which is to integrate with the
            progressive mass organizations in the Philippines and learn from
            them. Without exaggeration, I can easily say that this experience
            changed my life.
          </p>
          <p>
            I am now a member of the{" "}
            <a href="https://cpso.pw">
              Canada-Philippines Solidarity Organization
            </a>
            , which was founded in November 2020. I intend to continue raising
            awareness and building support for the Philippine ND movement until
            its victory.
          </p>
        </section>
        <SocialButtons />
      </section>
      <div className="w-48 sm:w-2/3 ">
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
  }
`
