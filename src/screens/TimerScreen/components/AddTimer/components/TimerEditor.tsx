import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { DurationPicker } from '@src/components'
import { Timer } from '@src/types'

type TimerEditorProps = { onChange: (changes: Partial<Timer>) => any }
const TimerEditor = ({ onChange }: TimerEditorProps) => {
  const [name, setName] = useState('')
  return <>
    <TextInput
      style={css.name_input}
      onChangeText={text => { setName(text); onChange({ name: text })}}
      value={name}
      autoFocus
      placeholder="Timer Name"
    />
    <DurationPicker onValueSettled={duration => onChange({ duration: duration * 1000 })} />
  </>
}

const css = StyleSheet.create({
  name_input: {
    width: 250,
  }
})

export default TimerEditor
