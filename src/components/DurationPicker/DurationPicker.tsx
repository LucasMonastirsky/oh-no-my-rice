import { useState } from 'react'

import { HorizontalDivider, HorizontalView } from ".."
import NumberPicker from "./components/NumberPicker"
import DEBUG from '@src/utils/debug'
import { useAsyncState } from '@src/utils/helpers'

type DurationPickerProps = { onValueSettled: (value: number) => any }
const DurationPicker = ({ onValueSettled }: DurationPickerProps) => {
  const [hours, setHours, getHours] = useAsyncState(0)
  const [minutes, setMinutes, getMinutes] = useAsyncState(0)
  const [seconds, setSeconds, getSeconds] = useAsyncState(0)

  const setValue = (value: number, type: 'h' | 'm' | 's') => {
    const setters = { 'h': setHours, 'm': setMinutes, 's': setSeconds }
    setters[type](value)
    onValueSettled(getHours() * 3600 + getMinutes() * 60 + getSeconds())
  }

  return (
    <HorizontalView>
      <NumberPicker onValueSettled={(x) => setValue(x, 'h')} max={24} />
      <HorizontalDivider />
      <NumberPicker onValueSettled={(x) => setValue(x, 'm')} />
      <HorizontalDivider />
      <NumberPicker onValueSettled={(x) => setValue(x, 's')} />
    </HorizontalView>
  )
}

export default DurationPicker
