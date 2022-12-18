import { marginMedium } from "@src/constants/styles"
import { StyleSheet, TouchableOpacity, View } from "react-native"

type FloatingButtonProps = { onPress: () => any }
const FloatingButton = ({ onPress }: FloatingButtonProps) => (
  <View style={css.container}>
    <TouchableOpacity style={css.button} {...{onPress}} />
  </View>
)

const size = 100
const css = StyleSheet.create({
  container: {
    padding: marginMedium,
    position: 'absolute',
    height: size,
    width: size,
    bottom: 0,
    right: 0,
  },
  button: {
    borderRadius: size / 2,
    backgroundColor: 'green',
    flex: 1,
  },
})

export default FloatingButton
