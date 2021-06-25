/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div className="flex mt-12 mb-16 max-w-md mx-auto">
      <div className="w-96">
        <StaticImage
          src="../images/profile-pic.png"
          alt={author.name}
          placeholder="tracedSVG"
        />
      </div>
      <p className="text-gray-500 ml-4">
        Written by{" "}
        <a href="mailto:me@andytran.ca">
          <strong>{author.name}</strong>
        </a>
        . All thoughts posted here are mine, and are not indicative of positions
        held by any organization or group I affiliate with.
      </p>
    </div>
  )
}

export default Bio
