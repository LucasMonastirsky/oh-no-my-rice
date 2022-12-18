import FloatingButton from '@src/components/FloatingButton'
import { Timer } from '@src/types'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AddTimer, TimerItem } from './components'

const mockInitialTimers: Timer[] = [
  { name: 'Potatoes', duration: 3600000 },
  { name: 'Spinach', duration: 60000 },
  { name: 'ur ex', duration: 2000 },
]

const TimerScreen = () => {
  const [adding, setAdding] = useState(false)
  const [timers, setTimers] = useState(mockInitialTimers)

  const addTimer = (timer: Timer) => {
    setTimers(x => [...x, {...timer, duration: 10000}])
    setAdding(false)
  }

  const removeTimer = (name: string) => {
    setTimers(list => list.filter(x => x.name !== name))
  }
  const onPressAdd = () => { setAdding(true) }

  return (
    <View style={css.container}>
      {timers.map(x => <TimerItem timer={x} onPressRemove={removeTimer} />)}
      <FloatingButton onPress={onPressAdd} />
      <AddTimer active={adding} {...{addTimer}} onCancel={() => setAdding(false)} />
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default TimerScreen
