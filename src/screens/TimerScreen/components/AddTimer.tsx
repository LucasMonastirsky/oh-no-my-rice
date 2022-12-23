import { HorizontalView, Spacer } from '@src/components'
import AppButton from '@src/components/AppButton'
import { Timer } from '@src/types'
import { TimerEditor } from './components'

import { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { Overlay } from 'react-native-elements'

type AddTimerProps = { active: boolean, addTimer: (timer: Timer) => any, onCancel: () => any }
export default ({ active, addTimer, onCancel }: AddTimerProps) => {
  const [timer, setTimer] = useState<Timer>({ name: '', duration: 0 })
  const { name, duration } = timer

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      onCancel()
      return false
    })
  }, [])

  const onConfirm = () => {
    if (name.length < 1 || duration < 1) {
      console.log('bad!')
    }
    else addTimer({ name, duration: duration * 1000 })
  }

  const changeTimer = (changes: Partial<Timer>) => {
    setTimer(prev => ({...prev, ...changes}))
  }

  return (
    <Overlay isVisible={active} onBackdropPress={onCancel}>
      <TimerEditor timer={timer} onChange={changeTimer} />
      <HorizontalView>
        <Spacer />
        <AppButton title="Create" onPress={onConfirm} />
      </HorizontalView>
    </Overlay>
  )
}
