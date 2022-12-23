import { StyleSheet, TextInput } from 'react-native'

import { DurationPicker } from '@src/components'
import { Timer } from '@src/types'

type TimerEditorProps = { timer: Timer, onChange: (changes: Partial<Timer>) => any }
const TimerEditor = ({ timer, onChange }: TimerEditorProps) => {
  return <>
    <TextInput
      style={css.name_input}
      onChangeText={text => onChange({ name: text })}
      value={timer.name}
      autoFocus
      placeholder="Timer Name"
    />
    <DurationPicker onValueSettled={duration => onChange({ duration })} />
  </>
}

const css = StyleSheet.create({
  name_input: {
    width: 250,
  }
})

export default TimerEditor
