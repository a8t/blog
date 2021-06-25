import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Github, LinkedIn, Mail, Twitter } from "./icons"

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
            I'm a socialist and a software developer. I'm based in Toronto,
            Ontario, Canada. This is my blog, where I post thoughts about
            politics, software, and more.
          </p>
          <p>
            The title of this blog is{" "}
            <a href="https://en.wikipedia.org/wiki/April_Theses">
              <strong className="font-black">april theses</strong>
            </a>
            , with which I share a set of initials and a birthday.
          </p>
        </section>
        <section className="max-w-lg mt-2 text-gray-600 flex space-x-4">
          {[
            {
              icon: <LinkedIn />,
              url: "https://linkedin.com/in/a8t",
              label: "Linkedin",
            },
            {
              icon: <Github />,
              url: "https://github.com/a8t",
              label: "Github",
            },
            {
              icon: <Twitter />,
              url: "https://twitter.com/SixthHead",
              label: "Twitter",
            },
            {
              icon: <Mail />,
              url: "mailto:hello@andytran.ca",
              label: "Email",
            },
          ].map(({ icon, url, label }) => (
            <a
              href={url}
              className="no-underline flex flex-col items-center group"
            >
              <div className="mb-px text-xxs opacity-0 group-hover:opacity-100  transition-all duration-150">
                {label}
              </div>
              <div className="w-12 p-3 rounded-full bg-white border border-gray-200 group-hover:bg-teal-50 transition-all duration-100">
                {icon}
              </div>
            </a>
          ))}
        </section>
      </section>
    </header>
  )
}

export default MainBio
