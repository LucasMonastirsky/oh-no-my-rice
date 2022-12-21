import { useEffect, useState } from "react"
import { View, ViewProps, ViewStyle } from "react-native"
import { AppText } from '@src/components'
import { limit, useAsyncState } from "@src/utils/helpers"
import { SlaveText } from './components'

const refresh_interval = 32
const deceleration = 1 / 1000

type TouchEvent = { y: number, date: number }
type TouchStatus = 'inactive' | 'active' | 'release'
type NumberPickerProps = { initial_value?: number, onValueSettled?: (value: number) => any, max?: number }
const NumberPicker = ({ initial_value, onValueSettled, max = 60 }: NumberPickerProps) => {
  const [view_height, setViewHeight] = useState(0)
  const [last_touch, setLastTouch] = useState<TouchEvent>({ y: 0, date: Date.now() })

  const [, setTouchStatus, getTouchStatus] = useAsyncState<TouchStatus>('inactive')
  const [pos, setPos, getPos] = useAsyncState(initial_value ?? 0)
  const [, setMomentum, getMomentum] = useAsyncState(0)

  const move = (y: number) => setPos(prev => limit(prev + y, 0, max))
  const createTouchEvent = (pageY: number) => ({ y: pageY / view_height, date: Date.now() })

  useEffect(() => {
    const interval = setInterval(() => {
      if (getTouchStatus() === 'release') {
        move(getMomentum() * refresh_interval)
        setMomentum(prev => {
          const x = prev - deceleration * Math.sign(prev)
          if (Math.sign(prev) != Math.sign(x)) {
            setTouchStatus('inactive')
            onValueSettled?.(Math.round(getPos()))
            return 0
          }
          else return x
        })
      }
    }, refresh_interval)

    return () => clearInterval(interval)
  }, [])

  const container_props: ViewProps = {
    onLayout: ({ nativeEvent: { layout }}) => {
      setViewHeight(layout.height)
    },
    onStartShouldSetResponder: () => true,
    onResponderGrant: ({ nativeEvent: { pageY } }) => {
      setLastTouch(createTouchEvent(pageY))
      setTouchStatus('active')
    },
    onResponderMove: ({ nativeEvent: { pageY }}) => {
      const new_touch = createTouchEvent(pageY)
      const pos_delta = last_touch.y - new_touch.y
      const time_delta = new_touch.date - last_touch.date

      move(pos_delta)
      setMomentum(pos_delta / time_delta)
      setLastTouch(new_touch)
    },
    onResponderRelease: () => {
      setTouchStatus('release')
    }
  }

  const text_items = new Array(3).fill(undefined).map((x, i) => {
    const magic = Math.trunc((Math.round(pos) + 1.5 - i) / 3)
    const value = i + magic * 3

    return <SlaveText {...{
      offset: (i * 50) - (pos * 50) + (magic * 150),
      value,
      diff: 1 - Math.abs(pos - value),
      hidden: value > max,
      key: i,
    }} />
  })

  return (
    <View style={{overflow: 'hidden'}} {...container_props}>
      <AppText size='m' style={{ opacity: 0 }}>00</AppText>
      {text_items}
      {/* <Text style={{position: 'absolute', left: '50%'}}>{pos.toFixed(1)}</Text> */}
    </View>
  )
}

const debug_style: ViewStyle = {
  overflow: 'visible',
  borderWidth: 1,
  borderColor: 'black',
  borderStyle: 'dashed',
}

export default NumberPicker
