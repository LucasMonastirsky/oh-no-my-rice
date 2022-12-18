import { useRef, useState } from "react"

export const timeToString = (time: number) => {
  const total_seconds = Math.floor(time / 1000)
  const hours = Math.floor(total_seconds / 3600)
  const minutes = Math.floor(total_seconds / 60 % 60)
  const seconds = Math.floor(total_seconds % 60)

  const f = (x: number) => x > 9 ? `${x}` : `0${x}`

  return `${f(hours)}:${f(minutes)}:${f(seconds)}`
}

type ReturnType<T> = [T, (value: T | ((prev: T)=>T))=>void, ()=>T]
export function useAsyncState<Type>(initial_value: Type): ReturnType<Type> {
  const [state, _setState] = useState(initial_value)
  const ref = useRef(state)
  const getState = () => ref.current
  const setState = (value: Type | ((prev: Type)=>Type)) => {
    if (typeof value === 'function') {
      const setter = value as (prev: Type)=>Type
      _setState(state => ref.current = setter(state))
    } else {
      _setState(value)
      ref.current = value
    }
  }
  return [state, setState, getState]
}
