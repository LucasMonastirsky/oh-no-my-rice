import { StyleSheet } from 'react-native'
import { AppText, HorizontalView, Spacer } from '@src/components'
import Icon from '@src/components/Icon'
import { useEffect, useReducer, useState } from 'react'
import { timeToString } from '@src/utils/helpers'
import { Timer } from '@src/types'

type TimerStatus = 'active' | 'paused' | 'done'
type TimerProps = { timer: Timer, onPressRemove: () => any } 

const TimerItem = ({ timer: { name, duration }, onPressRemove }: TimerProps) => {
  const [end_time, setEndTime] = useState<number>()
  const [elapsed_time, setElapsedTime] = useState(0)
  const [, tick] = useReducer(x => ++x, 0)

  const status: TimerStatus =
    end_time === undefined ? 'paused' : end_time > Date.now() ? 'active' : 'done'

  useEffect(() => {
    const interval = setInterval(tick, 1000)

    return () => clearInterval(interval)
  }, [])

  const onPressStart = () => {
    setEndTime(Date.now() + duration - elapsed_time)
  }
  const onPressPause = () => {
    setElapsedTime(duration - (end_time! - Date.now()))
    setEndTime(undefined)
  }

  const onPressReset = () => {
    setEndTime(undefined)
    setElapsedTime(0)
  }

  const remaining_time = status === 'done' ? 0 : end_time ? end_time - Date.now() : duration - elapsed_time

  return (
    <HorizontalView style={css.container}>
      <AppText>{name}</AppText>
      <Spacer />
      <AppText>{timeToString(remaining_time)}</AppText>
      <Icon onPress={onPressReset} color='red' />
      {status === 'active' && <Icon onPress={onPressPause} color='yellow' />}
      {status === 'paused' && <Icon onPress={onPressStart} color='green' />}
      {status === 'done' && <Icon onPress={onPressRemove} color='red' />}
    </HorizontalView>
  )
}

const css = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
})

export default TimerItem
