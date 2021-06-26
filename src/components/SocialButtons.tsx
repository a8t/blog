import React from "react"
import { Github, LinkedIn, Mail, Twitter } from "./icons"

export default function SocialButtons() {
  return (
    <section className="max-w-lg mt-2 flex space-x-4">
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
        <a href={url} className="no-underline flex flex-col items-center group">
          <div className="mb-px text-xxs opacity-0 group-hover:opacity-100  transition-all duration-150">
            {label}
          </div>
          <div className="w-12 p-3 rounded-full bg-white border border-gray-200 group-hover:bg-teal-50 transition-all duration-100">
            {icon}
          </div>
        </a>
      ))}
    </section>
  )
}
