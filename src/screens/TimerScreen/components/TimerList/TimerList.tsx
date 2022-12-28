import { createRef, forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { View } from 'react-native'

import { Timer } from "@src/types"
import { TimerItem } from './components'
import { TimerRef } from './components/TimerItem'

export type TimerListRef = { reset: Function }
type TimerListProps = { timers: Timer[], removeTimer: (index: number) => any, onTimerDone: () => any }
const TimerList = forwardRef(({ timers, removeTimer, onTimerDone }: TimerListProps, ref) => {
  const timer_refs = useMemo(() => timers.map(_ => createRef<TimerRef>()), [timers])

  useImperativeHandle(ref, () => ({
    reset: () => timer_refs.forEach(x => x.current!.reset())
  }))

  return <View>
    {timers.map((x, i) => <TimerItem
      parent_timer={x}
      onPressRemove={() => removeTimer(i)}
      onDone={onTimerDone}
      ref={timer_refs[i]}
    />)}
  </View>  
})

export default TimerList
