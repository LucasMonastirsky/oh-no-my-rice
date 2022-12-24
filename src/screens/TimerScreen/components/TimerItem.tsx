import { StyleSheet } from 'react-native'
import { AppText, HorizontalView, Spacer } from '@src/components'
import AppIcon from '@src/components/AppIcon'
import { useEffect, useReducer, useState } from 'react'
import { timeToString } from '@src/utils/helpers'
import { Timer } from '@src/types'

type TimerStatus = 'active' | 'paused' | 'done'
type TimerProps = {
  timer: Timer,
  onPressRemove: (name: string) => any,
  onDone: () => any,
} 
const TimerItem = ({ timer, onPressRemove, onDone }: TimerProps) => {
  const [end_time, setEndTime] = useState<number>()
  const [elapsed_time, setElapsedTime] = useState(0)
  const [, tick] = useReducer(x => ++x, 0)

  const status: TimerStatus =
    end_time === undefined ? 'paused' : end_time > Date.now() ? 'active' : 'done'

  useEffect(() => {
    const interval = setInterval(tick, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (status === 'done') onDone()
  }, [status])

  const onPressStart = () => {
    setEndTime(Date.now() + timer.duration - elapsed_time)
  }
  const onPressPause = () => {
    setElapsedTime(timer.duration - (end_time! - Date.now()))
    setEndTime(undefined)
  }

  const onPressReset = () => {
    setEndTime(undefined)
    setElapsedTime(0)
  }

  const onPressNext = () => {
    console.log('ding!!', timer.next_timer)
  }

  const remaining_time = status === 'done' ? 0 : end_time ? end_time - Date.now() : timer.duration - elapsed_time

  return (
    <HorizontalView style={css.container}>
      <AppText>{timer.name}</AppText>
      <Spacer />
      <AppText>{timeToString(remaining_time)}</AppText>
      <AppIcon onPress={() => onPressRemove(timer.name)} color='red' />
      <AppIcon onPress={onPressReset} color='blue' />
      {status === 'active' && <AppIcon onPress={onPressPause} color='yellow' />}
      {status === 'paused' && <AppIcon onPress={onPressStart} color='green' />}
      {status === 'done' && timer.next_timer && <AppIcon onPress={onPressNext} color='pink' />}
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
