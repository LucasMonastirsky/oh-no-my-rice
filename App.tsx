import { DebugMonitor } from '@src/components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TimerScreen } from './src/screens'

const App = () => {
  return (
    <DebugMonitor>
      <SafeAreaProvider>
        <TimerScreen />
      </SafeAreaProvider>
    </DebugMonitor>
  )
}

export default App
