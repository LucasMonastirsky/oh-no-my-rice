import { HorizontalView, Spacer } from '@src/components'
import AppButton from '@src/components/AppButton'
import { Timer } from '@src/types'
import { TimerEditor } from './components'

import { useEffect, useMemo, useState } from 'react'
import { BackHandler } from 'react-native'
import { Overlay } from 'react-native-elements'

type AddTimerProps = { active: boolean, addTimer: (timer: Timer) => any, onCancel: () => any }
export default ({ active, addTimer, onCancel }: AddTimerProps) => {
  const [timers, setTimers] = useState<Timer[]>([{ name: '', duration: 0 }])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      onCancel()
      return false
    })
  }, [])

  const onConfirm = () => {
    // if (name.length < 1 || duration < 1) {
    //   console.log('bad!')
    // }
    // else addTimer({ name, duration: duration * 1000 })
    addTimer(timers.reduce((prev, curr) => ({ ...prev, next_timer: curr })))
  }

  const changeTimer = (index: number, changes: Partial<Timer>) => {
    setTimers(prev => prev.map((x, i) => i === index ? {...x, ...changes} : x))
  }

  const chainTimer = () => {
    setTimers(prev => [...prev, { name: '', duration: 0 }])
  }

  const editors = useMemo(() =>
    timers.map((x, i) => <TimerEditor onChange={changes => changeTimer(i, changes)} />)
  , [timers.length])

  return (
    <Overlay isVisible={active} onBackdropPress={onCancel}>
      {editors}
      <HorizontalView>
        <Spacer />
        <AppButton title='Chain' onPress={chainTimer} />
        <AppButton title="Create" onPress={onConfirm} />
      </HorizontalView>
    </Overlay>
  )
}
