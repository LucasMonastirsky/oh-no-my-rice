import { View } from 'react-native'
import TimerItem from './components/TimerItem'

const TimerScreen = () => {
  return (
    <View>
      <TimerItem duration={3600000} />
      <TimerItem duration={7200000} />
      <TimerItem duration={600000} />
      <TimerItem duration={60000} />
    </View>
  )
}

export default TimerScreen
