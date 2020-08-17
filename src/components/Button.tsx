import React, { ButtonHTMLAttributes } from "react"
import { useButton } from "@react-aria/button"

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  let ref = React.useRef()
  let { buttonProps } = useButton(props, ref)
  let { children } = props

  return (
    <button {...buttonProps} ref={ref} className={props.className}>
      {children}
    </button>
  )
}
