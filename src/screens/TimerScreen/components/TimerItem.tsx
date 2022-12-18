import { StyleSheet } from 'react-native'
import { AppText, HorizontalView, Spacer } from '@src/components'
import Icon from '@src/components/Icon'
import { useEffect, useReducer, useState } from 'react'
import { timeToString, useAsyncState } from '@src/utils/helpers'

type TimerProps = { duration: number } 

const TimerItem = ({ duration }: TimerProps) => {
  const [end_time, setEndTime, getEndTime] = useAsyncState<number | null>(null)
  const [elapsed_time, setElapsedTime] = useState(0)
  const [, tick] = useReducer(x => ++x, 0)

  const getIsActive = () => getEndTime() != null 

  useEffect(() => {
    const interval = setInterval(tick, 1000)

    return () => clearInterval(interval)
  }, [])

  const onPressStart = () => {
    setEndTime(Date.now() + duration - elapsed_time)
  }
  const onPressPause = () => {
    setElapsedTime(duration - (end_time! - Date.now()))
    setEndTime(null)
  }

  const remaining_time = end_time ? end_time - Date.now() : duration - elapsed_time

  return (
    <HorizontalView style={css.container}>
      <AppText>Timer Name</AppText>
      <Spacer />
      <AppText>{timeToString(remaining_time)}</AppText>
      <Icon onPress={tick} color='yellow' />
      {getIsActive()
        ? <Icon onPress={onPressPause} color='red' />
        : <Icon onPress={onPressStart} color='green' />
      }
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
