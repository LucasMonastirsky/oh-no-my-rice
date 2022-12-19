import { useState } from "react"
import { StyleSheet, TextStyle, View } from "react-native"
import { AppText, HorizontalView } from '@src/components'
import { addLeadingZero } from "@src/utils/helpers"

type NumberPickerProps = { initial_value?: number }
const NumberPicker = ({ initial_value }: NumberPickerProps) => {
  const [value, setValue] = useState(initial_value ?? 1)

  type SlaveTextProps = { children: string, offset: number }
  const SlaveText = ({ children, offset }: SlaveTextProps) => {
    const style: TextStyle = { position: 'absolute', top: offset + '%', opacity: 0.5 }
  
    return (
      <AppText {...{style}}>{children}</AppText>
    )
  }

  return (
    <View style={{overflow: 'hidden'}}>
      <SlaveText offset={-50}>{addLeadingZero(value - 1)}</SlaveText>
      <AppText size='m'>{addLeadingZero(value)}</AppText>
      <SlaveText offset={50}>{addLeadingZero(value + 1)}</SlaveText>
    </View>
  )
}

export default NumberPicker
