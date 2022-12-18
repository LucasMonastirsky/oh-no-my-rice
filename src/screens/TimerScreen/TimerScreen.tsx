import AddButton from '@src/components/AddButton'
import { StyleSheet, View } from 'react-native'
import { TimerItem } from './components'

const TimerScreen = () => {
  const onPressRemove = () => { console.log('wow') }
  const onPressAdd = () => { console.log('no way!') }

  return (
    <View style={css.container}>
      <TimerItem duration={3600000} {...{onPressRemove}} />
      <TimerItem duration={7200000} {...{onPressRemove}} />
      <TimerItem duration={600000} {...{onPressRemove}} />
      <TimerItem duration={60000} {...{onPressRemove}} />
      <TimerItem duration={3000} {...{onPressRemove}} />
      <AddButton onPress={onPressAdd} />
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default TimerScreen
