import React, { ButtonHTMLAttributes } from "react"
import classNames from "classnames"

export default function ControlButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      role="button"
      {...props}
      className={classNames(
        props.disabled ? "text-gray-200" : "text-gray-500",

        "rounded-full",
        "border-4 border-transparent",
        "focus:border-teal-300"
      )}
      style={{ outline: "none" }}
    />
  )
}
