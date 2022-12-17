import { View, ViewStyle } from 'react-native'

type HorizontalViewProps = { children: any, style?: ViewStyle }

export default ({ children, style }: HorizontalViewProps) => (
  <View style={{ flexDirection: 'row', ...style }}>
    {children}
  </View>
)
