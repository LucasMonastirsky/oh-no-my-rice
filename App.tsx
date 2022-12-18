import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TimerScreen } from './src/screens'

const App = () => {
  return (
    <SafeAreaProvider>
      <TimerScreen />
    </SafeAreaProvider>
  )
}

export default App
