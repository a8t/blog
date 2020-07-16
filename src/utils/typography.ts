import Typography from "typography"
import oceanBeach from "typography-theme-ocean-beach"

oceanBeach.overrideThemeStyles = () => {
  return {
    a: {
      boxShadow: `none`,
      textDecoration: "underline",
      backgroundImage: "none",
      textDecorationColor: "#950451",
    },
    "a:hover": {
      boxShadow: `none`,
      textDecoration: "none",
    },
  }
}

const typography = new Typography(oceanBeach)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
