import { HorizontalDivider, HorizontalView } from ".."
import NumberPicker from "./components/NumberPicker"

const DurationPicker = () => {
  return (
    <HorizontalView>
      <NumberPicker />
      <HorizontalDivider />
      <NumberPicker />
      <HorizontalDivider />
      <NumberPicker />
    </HorizontalView>
  )
}

export default DurationPicker
