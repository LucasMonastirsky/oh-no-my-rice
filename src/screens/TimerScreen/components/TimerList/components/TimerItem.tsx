import { StyleSheet } from 'react-native'
import { AppText, HorizontalView, Spacer } from '@src/components'
import AppIcon from '@src/components/AppIcon'
import { useEffect, useReducer, useState, forwardRef, useImperativeHandle } from 'react'
import { timeToString } from '@src/utils/helpers'
import { Timer } from '@src/types'
import DEBUG from '@src/utils/debug'

type TimerStatus = 'active' | 'paused' | 'done'
export type TimerRef = { reset: Function }
type TimerProps = {
  parent_timer: Timer,
  onPressRemove: (name: string) => any,
  onDone: () => any,
} 
const TimerItem = forwardRef(({ parent_timer, onPressRemove, onDone }: TimerProps, ref) => {
  const [end_time, setEndTime] = useState<number>()
  const [elapsed_time, setElapsedTime] = useState(0)
  const [taken_steps, setTakenSteps] = useState(0)
  const [current_timer, setCurrentTimer] = useState(parent_timer)
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

  useEffect(() => {
    let x = parent_timer
    for (let i = 0; i < taken_steps; i++) {
      if (!x.next_timer) DEBUG.error(`tried to call undefined next_timer`)
      else x = x.next_timer!
    }
    setCurrentTimer(x)
    setElapsedTime(0)
    setEndTime(undefined)
  }, [taken_steps])

  const onPressStart = () => {
    setEndTime(Date.now() + current_timer.duration - elapsed_time)
  }
  const onPressPause = () => {
    setElapsedTime(current_timer.duration - (end_time! - Date.now()))
    setEndTime(undefined)
  }

  const onPressReset = () => {
    console.log('onPressReset')
    setEndTime(undefined)
    setElapsedTime(0)
  }

  const onPressSkip = () => {
    setEndTime(Date.now() + 1)
  }

  const onPressNext = () => {
    setTakenSteps(prev => ++prev)
  }

  const remaining_time = status === 'done'
    ? 0 : end_time
    ? end_time - Date.now() : current_timer.duration - elapsed_time

  useImperativeHandle(ref, () => ({ reset: onPressReset }))

  return (
    <HorizontalView style={css.container}>
      <AppText>{current_timer.name}</AppText>
      <Spacer />
      <AppText>{timeToString(remaining_time)}</AppText>
      <AppIcon onPress={() => onPressRemove(parent_timer.name)} color='red' />
      {status === 'done'
        ? <AppIcon onPress={onPressReset} color='blue' />
        : <AppIcon onPress={onPressSkip} color='orange' />
      }
      {status === 'active' && <AppIcon onPress={onPressPause} color='yellow' />}
      {status === 'paused' && <AppIcon onPress={onPressStart} color='green' />}
      {status === 'done' && current_timer.next_timer && <AppIcon onPress={onPressNext} color='pink' />}
    </HorizontalView>
  )
})

const css = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
})

export default TimerItem
