import { useState, useEffect } from "react"

export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}
