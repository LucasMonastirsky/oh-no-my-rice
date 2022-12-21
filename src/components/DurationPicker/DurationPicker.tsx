import { useState } from 'react'

import { HorizontalDivider, HorizontalView } from ".."
import NumberPicker from "./components/NumberPicker"
import DEBUG from '@src/utils/debug'

const DurationPicker = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  DEBUG.log(`${hours}:${minutes}:${seconds}`)

  return (
    <HorizontalView>
      <NumberPicker onValueSettled={setHours} max={24} />
      <HorizontalDivider />
      <NumberPicker onValueSettled={setMinutes} />
      <HorizontalDivider />
      <NumberPicker onValueSettled={setSeconds} />
    </HorizontalView>
  )
}

export default DurationPicker
