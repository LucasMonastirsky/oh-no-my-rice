import { HorizontalView, Spacer } from '@src/components'
import AppButton from '@src/components/AppButton'
import DurationPicker from '@src/components/DurationPicker/DurationPicker'
import { Timer } from '@src/types'
import { useEffect, useState } from 'react'
import { BackHandler, StyleSheet, Text, TextInput, View } from 'react-native'
import { Overlay } from 'react-native-elements'

type AddTimerProps = { active: boolean, addTimer: (timer: Timer) => any, onCancel: () => any }
export default ({ active, addTimer, onCancel }: AddTimerProps) => {
  const [name, setName] = useState('')

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      onCancel()
      return false
    })
  }, [])

  const onConfirm = () => {
    if (name.length < 1) {
      console.log('bad!')
    }
    else addTimer({ name, duration: 10000 })
  }

  return (
    <Overlay isVisible={active} onBackdropPress={onCancel}>
      <TextInput
        style={css.name_input}
        onChangeText={setName}
        value={name}
        autoFocus
        placeholder="Timer Name"
      />
      <DurationPicker />
      <HorizontalView>
        <Spacer />
        <AppButton title="Create" onPress={onConfirm} />
      </HorizontalView>
    </Overlay>
  )
}

const css = StyleSheet.create({
  name_input: {
    width: 250,
  },
})