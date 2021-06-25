import Typography from "typography"
import theme from "typography-theme-parnassus"

theme.overrideThemeStyles = () => {
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

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
