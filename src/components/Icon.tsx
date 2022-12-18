import { textMain } from '@src/constants/colors'
import { marginMedium } from '@src/constants/styles'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

type IconProps = { onPress?: () => any, color?: string }

const Icon = ({ onPress, color }: IconProps) => {
  return <View style={css.container}>
    <TouchableOpacity style={[css.background, { backgroundColor: color || textMain }]} onPress={onPress} />  
  </View>
}

const css = StyleSheet.create({
  container: {
    aspectRatio: 1,
    padding: marginMedium,
  },
  background: {
    flex: 1,
  },
})

export default Icon