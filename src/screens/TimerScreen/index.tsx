import { Text } from 'react-native'
import { HorizontalView, Spacer } from '../../components'

const TimerScreen = () => {
  return (
    <HorizontalView>
      <Text>Timer Name</Text>
      <Spacer />
      <Text>01:23:45</Text>
    </HorizontalView>
  )
}

export default TimerScreen
