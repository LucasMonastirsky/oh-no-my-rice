import FloatingButton from '@src/components/FloatingButton'
import { Timer } from '@src/types'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AddTimer, TimerItem } from './components'

import Sound from 'react-native-sound' // TODO: add iOS sounds

Sound.setCategory('Alarm')
const test_sound = new Sound('timer_off.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log(`sound error:`, error)
    return
  }
})

const TimerScreen = () => {
  const [adding, setAdding] = useState(false)
  const [timers, setTimers] = useState<Timer[]>([])

  const onTimerDone = () => {
    test_sound.stop(() => test_sound.play())
  }

  const addTimer = (timer: Timer) => {
    setTimers(x => [...x, {...timer}])
    setAdding(false)
  }

  const removeTimer = (name: string) => {
    setTimers(list => list.filter(x => x.name !== name))
  }
  const onPressAdd = () => { setAdding(true) }

  return (
    <View style={css.container}>
      {timers.map(x => <TimerItem timer={x} onPressRemove={removeTimer} onDone={onTimerDone} />)}
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
