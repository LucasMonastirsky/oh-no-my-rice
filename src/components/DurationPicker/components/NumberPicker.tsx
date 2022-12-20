import { useEffect, useState } from "react"
import { GestureResponderEvent, View, ViewProps } from "react-native"
import { AppText } from '@src/components'
import { addLeadingZero, limit, useAsyncState } from "@src/utils/helpers"
import { SlaveText } from './components'
import DEBUG from '@src/utils/debug'

const refresh_interval = 32
const deceleration = 1 / 1000

type TouchStatus = 'inactive' | 'active' | 'release'
type NumberPickerProps = { initial_value?: number, max?: number }
const NumberPicker = ({ initial_value, max = 60 }: NumberPickerProps) => {
  const [pos, setPos] = useState(initial_value ?? 0)

  const [touch_status, setTouchStatus, getTouchStatus] = useAsyncState<TouchStatus>('inactive')
  const [view_height, setViewHeight] = useState(0)
  const [last_touch, setLastTouch, getLastTouch] = useAsyncState(0)
  const [last_touch_date, setLastTouchDate, getLastTouchDate] = useAsyncState(Date.now())

  const [momentum, setMomentum, getMomentum] = useAsyncState(0)

  const move = (y: number) => setPos(prev => limit(prev + y, 0, max))

  useEffect(() => {
    const interval = setInterval(() => {
      if (getTouchStatus() === 'release') {
        move(getMomentum() * refresh_interval)
        setMomentum(prev => {
          const x = prev - deceleration * Math.sign(prev)
          if (Math.sign(prev) != Math.sign(x))
            return 0
          else return x
        })
      }
    }, refresh_interval)

    return () => clearInterval(interval)
  }, [])

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
      setLastTouchDate(Date.now())
      setTouchStatus('active')
    },
    onResponderMove: ({ nativeEvent: { pageY }}: GestureResponderEvent) => {
      const date = Date.now()
      const pos_delta = (last_touch - pageY) / view_height
      const time_delta = Date.now() - last_touch_date

      move(pos_delta)

      setMomentum(pos_delta / time_delta)

      setLastTouch(pageY)
      setLastTouchDate(date)
    },
    onResponderRelease: ({ nativeEvent: { pageY }}: GestureResponderEvent) => {
      setTouchStatus('release')
      DEBUG.log(`momentum: ${momentum}`)
    }
  }

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
    <View style={{overflow: 'hidden' }} {...container_props}>
      <AppText size='m' style={{ opacity: 0 }}>00</AppText>
      {text_items.map((x, i) =>
        <SlaveText
          offset={x.offset}
          debug={x.debug}
          key={i}
          opacity={x.value > max ? 0 : 1}
        >
          {addLeadingZero(x.value)}
        </SlaveText>
      )}
    </View>
  )
}

export default NumberPicker
