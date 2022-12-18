import { Text, TouchableOpacity } from "react-native";

type AppButtonProps = { title: string, onPress: () => any }
export default ({ title, onPress }: AppButtonProps) => (
  <TouchableOpacity {...{onPress}}>
    <Text>{title}</Text>
  </TouchableOpacity>
)