import { fontSizeMedium, marginMedium } from '@src/constants/styles'
import { textMain } from '@src/constants/colors'
import { StyleSheet, Text } from 'react-native'

type AppTextProps = { children: string }

const AppText = ({ children }: AppTextProps) => (
  <Text style={css.text}>{children}</Text>
)

const css = StyleSheet.create({
  text: {
    color: textMain,
    fontSize: fontSizeMedium,
    padding: marginMedium,
  }
})

export default AppText
