import { View, TextStyle, Text } from "react-native"
import { AppText } from '@src/components'

type SlaveTextProps = { children: string, offset: number, debug?: string }
const SlaveText = ({ children, offset, debug }: SlaveTextProps) => {
  const style: TextStyle = { position: 'absolute', top: offset + '%', opacity: 0.5 }

  return <>
    <AppText {...{style}}>{children}</AppText>
    <Text style={{position: 'absolute', top: offset + '%', left: '75%'}}>{debug}</Text>
  </>
}

export default SlaveText
