import { TextStyle } from "react-native"
import { AppText } from '@src/components'

type SlaveTextProps = { children: string, offset: number, opacity: number, debug?: string }
const SlaveText = ({ children, offset, opacity }: SlaveTextProps) => {
  const style: TextStyle = { position: 'absolute', top: offset + '%', opacity }

  return <AppText {...{style}}>{children}</AppText>
}

export default SlaveText
