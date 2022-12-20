import { useEffect, useState } from "react"
import { GestureResponderEvent, View, ViewProps } from "react-native"
import { AppText } from '@src/components'
import { addLeadingZero, useAsyncState } from "@src/utils/helpers"
import { SlaveText } from './components'
import DEBUG from '@src/utils/debug'

type TouchStatus = 'inactive'|'active'|'recovering'
type NumberPickerProps = { initial_value?: number }
const NumberPicker = ({ initial_value }: NumberPickerProps) => {
  const [value, setValue] = useState(initial_value ?? 1)
  const [pos, setPos] = useState(initial_value ?? 0)

  const [touch_status, setTouchStatus] = useState<TouchStatus>('inactive')
  const [view_height, setViewHeight, getViewHeight] = useAsyncState(0)
  const [last_touch, setLastTouch, getLastTouch] = useAsyncState(0)

  const pos_mod = Math.round(pos % 3)
  const pos_cycle = Math.trunc(pos / 3)

  const container_props: ViewProps = {
    onLayout: (e) => {
      setViewHeight(e.nativeEvent.layout.height)
    },
    onStartShouldSetResponder: () => true,
    onResponderGrant: ({ nativeEvent }) => {
      DEBUG.log('touch start', 'touch')
      setLastTouch(nativeEvent.pageY)
      setTouchStatus('active')
    },
    onResponderMove: ({ nativeEvent: { pageY }}: GestureResponderEvent) => {
      const delta = last_touch - pageY
      setPos(pos => pos + delta / view_height)
      setLastTouch(pageY)
    },
    onResponderRelease: () => {
      // DEBUG.log(`touch end with ${steps} steps`, 'touch')
      setTouchStatus('inactive')
      // setValue(x => x + steps)
    }
  }

  DEBUG.log(`${pos.toFixed(1)} | ${pos_mod.toFixed(1)} | ${pos_cycle.toFixed(1)}`, 'touch')

  const text_items = [
    { offset: 0, value: 0 },
    { offset: 50 , value: 1 },
    { offset: 100, value: 2 },
  ].map((x, i) => {
    const magic = Math.trunc((Math.round(pos) + 1.5 - i) / 3)
    const offset = (i * 50) - (pos * 50) + (magic * 150)

    const debug = `${magic}|${Math.trunc(offset)}`

    return { offset, value: i + magic * 3, debug }
  })

  return (
    <View style={{overflow: 'visible', borderWidth: 1, borderColor: 'gray'}} {...container_props}>
      <AppText size='m' style={{ opacity: 0 }}>{addLeadingZero(value)}</AppText>
      {text_items.map((x, i) =>
        <SlaveText offset={x.offset} debug={x.debug} key={i}>{addLeadingZero(x.value)}</SlaveText>
      )}
    </View>
  )
}

export default NumberPicker
