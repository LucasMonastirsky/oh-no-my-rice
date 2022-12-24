import { marginMedium } from '@src/constants/styles'
import { createContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type MonitorItem = { name: string, message: any }

export const DebugContext = createContext({
  addMonitor: (name: string, message: any) => {},
  removeMonitor: (name: string) => {},
  updateMonitor: (name: string, message: any) => {},
})
export default ({ children }: { children: any }) => {
  const [monitors, setMonitors] = useState<MonitorItem[]>([])

  const addMonitor = (name: string, message: any) => {
    setMonitors(prev => [...prev, { name, message }])
  }

  const removeMonitor = (name: string) => {
    setMonitors(prev => prev.filter(x => x.name !== name))
  }

  const updateMonitor = (name: string, message: any) => {
    setMonitors(prev => prev.map(x => x.name === name ? { name, message } : x))
  }

  return <>
    <DebugContext.Provider value={{ addMonitor, removeMonitor, updateMonitor }}>
      <View style={monitors.length > 0 ? css.container : {}}>
        {monitors.map(x => <Text style={css.text}>{x.name}: {JSON.stringify(x.message)}</Text>)}
      </View>
      {children}
    </DebugContext.Provider>
  </>
}

const css = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.75,
    padding: 5,
  },
  text: {
    color: 'white',
  }
})
