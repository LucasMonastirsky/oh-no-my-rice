import { useState } from "react"
import { GestureResponderEvent, View, ViewProps } from "react-native"
import { AppText } from '@src/components'
import { addLeadingZero } from "@src/utils/helpers"
import { SlaveText } from './components'
import DEBUG from '@src/utils/debug'

type NumberPickerProps = { initial_value?: number }
const NumberPicker = ({ initial_value }: NumberPickerProps) => {
  const [value, setValue] = useState(initial_value ?? 1)

  const [touching, setTouching] = useState(false)
  const [view_height, setViewHeight] = useState(0)
  const [touch_start, setTouchStart] = useState(0)
  const [touch_move, setTouchMove] = useState(0)

  const touch_delta = touch_start - touch_move
  const module = touch_delta % view_height
  const steps = touch_delta / view_height
  const step_module = Math.trunc(steps) % 3
  const cycle_count = Math.trunc(steps / 3)

  // note: cycle needs to be relative to starting position and count from there
  // i don't think it can be done via just math

  const container_props: ViewProps = {
    onLayout: (e) => {
      setViewHeight(e.nativeEvent.layout.height)
    },
    onStartShouldSetResponder: () => true,
    onResponderGrant: ({ nativeEvent }) => {
      DEBUG.log('touch start', 'touch')
      setTouching(true)
      setTouchStart(nativeEvent.pageY)
    },
    onResponderMove: (evt: GestureResponderEvent) => {
      DEBUG.log(`${steps.toFixed(1)} | ${step_module} | ${cycle_count}`, 'touch')
      setTouchMove(evt.nativeEvent.pageY)
    },
    onResponderRelease: () => {
      DEBUG.log('touch end', 'touch')
      setTouching(false)
    }
  }

  const text_items = [
    { offset: -50, value: 0 },
    { offset: 0 , value: 1 },
    { offset: 50, value: 2 },
  ].map((x, i) => ({
    offset: -50 + 50 * i + (step_module > i ? 150 : 0) + 150 * cycle_count,
    value: i,
  }))

  return (
    <View style={{overflow: 'hidden'}} {...container_props}>
      <AppText size='m' style={{ opacity: 0 }}>{addLeadingZero(value)}</AppText>
      {text_items.map(x =>
        <SlaveText offset={x.offset - touch_delta}>{addLeadingZero(x.value)}</SlaveText>
      )}
    </View>
  )
}

export default NumberPicker
