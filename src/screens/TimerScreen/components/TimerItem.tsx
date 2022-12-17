import { Text, StyleSheet } from 'react-native'
import { HorizontalView, Spacer } from '../../../components'
import { fontSizeMedium, marginMedium } from '../../../constants/styles'

const TimerItem = () => (
  <HorizontalView style={css.container}>
    <Text style={css.name}>Timer Name</Text>
    <Spacer />
    <Text style={css.counter}>01:23:45</Text>
  </HorizontalView>
)

const css = StyleSheet.create({
  container: {
    padding: marginMedium,
    borderWidth: 2,
    borderColor: 'gray',
  },
  name: {
    fontSize: fontSizeMedium,
  },
  counter: {
    fontSize: fontSizeMedium,
  }
})

export default TimerItem
