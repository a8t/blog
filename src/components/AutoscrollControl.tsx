import React, { useState, useEffect, ButtonHTMLAttributes } from "react"
import { FaPlusCircle, FaMinusCircle, FaStopCircle } from "react-icons/fa"
import classNames from "classnames"

const ControlButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      role="button"
      {...props}
      className={classNames(
        { "text-gray-200": props.disabled },
        "rounded-full",
        "border-4 border-transparent",
        "focus:border-teal-300"
      )}
      style={{ outline: "none" }}
    />
  )
}

export default function AutoscrollControll() {
  const [scrollAmount, setScrollMultiplier] = useState(0)
  const isStationary = scrollAmount === 0

  const stopScroll = () => setScrollMultiplier(0)
  const increment = () => setScrollMultiplier(scrollAmount + 1)
  const decrement = () => setScrollMultiplier(scrollAmount - 1)

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      window.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      })
    }, 60)

    return () => {
      clearInterval(scrollInterval)
    }
  }, [scrollAmount])

  return (
    <div className="flex fixed right-4 bottom-4 sm:right-11 sm:bottom-11 space-x-4 items-center">
      <ControlButton onClick={stopScroll} disabled={isStationary}>
        <FaStopCircle className="w-8 h-8" />
      </ControlButton>
      <ControlButton onClick={decrement} disabled={isStationary}>
        <FaMinusCircle className="w-8 h-8" />
      </ControlButton>
      <div className="text-3xl">{scrollAmount}</div>
      <ControlButton onClick={increment} disabled={scrollAmount > 9}>
        <FaPlusCircle className="w-8 h-8" />
      </ControlButton>
    </div>
  )
}
