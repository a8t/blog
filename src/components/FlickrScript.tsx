import React, { useEffect } from "react"

export default function FlickScript() {
  useEffect(() => {
    const script = document.createElement("script")

    script.src = "//embedr.flickr.com/assets/client-code.js"
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return null
}
