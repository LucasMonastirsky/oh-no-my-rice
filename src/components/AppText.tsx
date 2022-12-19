import { fontSizeLarge, fontSizeMedium, fontSizeSmall, marginMedium } from '@src/constants/styles'
import { textMain } from '@src/constants/colors'
import { StyleSheet, Text, TextStyle } from 'react-native'

type AppTextProps = { children: string, style?: TextStyle, size?: 's' | 'm' | 'l' }

const AppText = ({ children, style, size }: AppTextProps) => {
  const fontSize = { s: fontSizeSmall, m: fontSizeMedium, l: fontSizeLarge }[size ?? 'm']

  return <Text style={{...css.text, fontSize, ...style,}}>{children}</Text>
}

const css = StyleSheet.create({
  text: {
    color: textMain,
    padding: marginMedium,
  }
})

export default AppText
