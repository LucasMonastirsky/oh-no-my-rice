import { TextStyle } from "react-native"
import { AppText } from '@src/components'
import { addLeadingZero, limit } from "@src/utils/helpers"

const MIN_OPACITY = 0.5

type SlaveTextProps = { offset: number, value: number, diff: number, hidden?: boolean }
const SlaveText = ({ offset, value, diff, hidden }: SlaveTextProps) => {
  const style: TextStyle = {
    position: 'absolute',
    top: offset + '%',
    opacity: hidden ? 0 : limit(diff, MIN_OPACITY, 1),
  }

  return <AppText {...{style}}>{addLeadingZero(value)}</AppText>
}

export default SlaveText
