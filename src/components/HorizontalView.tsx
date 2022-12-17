import { View } from 'react-native'

type HorizontalViewProps = { children: any, style?: any }

export default ({ children, style }: HorizontalViewProps) => (
  <View style={{ flexDirection: 'row', ...style }}>
    {children}
  </View>
)
