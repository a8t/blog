import React, { useState, useEffect } from "react"
import { FaPlusCircle, FaMinusCircle, FaStopCircle } from "react-icons/fa"
import ControlButton from "./ControlButton"

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

    if (isStationary) {
      clearInterval(scrollInterval)
    }

    return () => {
      clearInterval(scrollInterval)
    }
  }, [scrollAmount])

  return (
    <div className="flex fixed right-4 bottom-4 sm:right-11 sm:bottom-11 space-x-4 items-center">
      <span className="text-gray-500 text-sm">Autoscroll</span>
      <ControlButton onClick={stopScroll} disabled={isStationary}>
        <FaStopCircle className="w-8 h-8" />
      </ControlButton>
      <ControlButton onClick={decrement} disabled={isStationary}>
        <FaMinusCircle className="w-8 h-8" />
      </ControlButton>
      <div className="text-xl w-8 text-center">{scrollAmount}</div>
      <ControlButton onClick={increment} disabled={scrollAmount > 9}>
        <FaPlusCircle className="w-8 h-8" />
      </ControlButton>
    </div>
  )
}
