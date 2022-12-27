import { AppIcon, AppText, HorizontalView, Spacer } from "@src/components"
import { Recipe } from "@src/types"
import { useReducer } from "react"
import { TouchableOpacity, View } from "react-native"

type TopBarProps = { recipes: Recipe[], onRecipeSelected: (index: number) => any }
const TopBar = ({ recipes, onRecipeSelected }: TopBarProps) => {
  const [open, toggleOpen] = useReducer(x => !x, false)
  
  const onRecipePressed = (index: number) => {
    onRecipeSelected(index)
    toggleOpen()
  }

  return (
    <HorizontalView>
      <AppText style={{opacity: 0}}>dummy</AppText>
      <View style={{position: 'absolute', left: 0, zIndex: 1}}>
        {open && recipes.map((x, i) => <TouchableOpacity onPress={() => onRecipePressed(i)}>
          <AppText>{x.name}</AppText>  
        </TouchableOpacity>)}
        {!open && <TouchableOpacity onPress={toggleOpen}><AppText>Closed!</AppText></TouchableOpacity>}
      </View>
      <Spacer />
      <AppIcon color='blue' />
    </HorizontalView>
  )
}

export default TopBar
