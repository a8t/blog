import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import SocialButtons from "./SocialButtons"

const MainBio = () => {
  const data = useStaticQuery(graphql`
    query MainBioQuery {
      avatar: file(absolutePath: { regex: "/waving.png/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
        }
      }
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
    <header className="mb-12 sm:mt-12 p-2 flex flex-col items-center sm:flex-row sm:space-x-4">
      <div className="w-48 sm:w-2/3">
        <StaticImage
          src="../images/waving.png"
          alt={author.name}
          placeholder="tracedSVG"
        />
      </div>
      <section className="max-w-lg flex flex-col py-4">
        <h1 className="text-3xl sm:text-5xl text-teal-700 font-black mb-4">
          Hi, I'm Andy.
        </h1>
        <section className="space-y-2">
          <p>
            I'm a socialist, software developer, and recovering physicist. I'm
            based in Toronto, Ontario, Canada. Here's more{" "}
            <Link to="/about-me">about me</Link>.
          </p>
          <p>
            This is my blog, where I post thoughts about politics, software, and
            more. The title of this blog is{" "}
            <a href="https://en.wikipedia.org/wiki/April_Theses">
              <strong className="font-black">april theses</strong>
            </a>
            , with which I share a set of initials and a birthday.
          </p>
        </section>
        <SocialButtons />
      </section>
    </header>
  )
}

export default MainBio
