import React, { useContext, useState } from "react"
import { Chord, Interval } from "@tonaljs/tonal"
import ControlButton from "./ControlButton"
import { FaTimesCircle, FaMinusCircle, FaPlusCircle } from "react-icons/fa"

const TransposeContext = React.createContext({
  semitones: 0,
  reset: () => null,
  increment: () => null,
  decrement: () => null,
})

const useTransposeContext = () => useContext(TransposeContext)

export function TransposeProvider({ children }) {
  const [semitones, setSemitones] = useState(0)
  const reset = () => setSemitones(0)
  const increment = () => setSemitones((semitones + 1) % 12)
  const decrement = () => setSemitones((semitones - 1) % 12)
  return (
    <TransposeContext.Provider
      value={{ semitones, reset, increment, decrement }}
    >
      {children}
    </TransposeContext.Provider>
  )
}

export function TransposeControl() {
  const { semitones, reset, increment, decrement } = useTransposeContext()

  const isUnison = semitones === 0

  return (
    <div className="flex space-x-2 items-center">
      <span className="text-gray-500 text-sm">Transpose</span>

      <ControlButton onClick={reset} disabled={isUnison}>
        <FaTimesCircle className="w-8 h-8" />
      </ControlButton>
      <ControlButton onClick={decrement}>
        <FaMinusCircle className="w-8 h-8" />
      </ControlButton>
      <div className="text-md w-6 text-center">{semitones}</div>
      <ControlButton onClick={increment}>
        <FaPlusCircle className="w-8 h-8" />
      </ControlButton>
    </div>
  )
}

export function Chords({ children }) {
  const { semitones } = useTransposeContext()

  const chords = children.replace(/\w+/g, chord =>
    Chord.transpose(chord, Interval.fromSemitones(semitones))
  )
  return (
    <span
      className="
        block font-mono whitespace-pre text-green-700 
        mt-2 text-xs
        sm:mt-4 sm:text-md
      "
    >
      {chords}
    </span>
  )
}

export function Lyrics({ children }) {
  return (
    <span
      className="
        block font-mono 
        text-xs
        sm:text-md
      "
    >
      {children}
    </span>
  )
}

export function Section({ children }) {
  return (
    <span className="block font-mono mt-12 text-xl text-gray-900">
      {children}
    </span>
  )
}
