import { TextStyle } from "react-native"
import { AppText } from '@src/components'

type SlaveTextProps = { children: string, offset: number }
const SlaveText = ({ children, offset }: SlaveTextProps) => {
  const style: TextStyle = { position: 'absolute', top: offset + '%', opacity: 0.5 }

  return (
    <AppText {...{style}}>{children}</AppText>
  )
}

export default SlaveText
