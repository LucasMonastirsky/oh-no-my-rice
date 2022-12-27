import { AppIcon, AppText, HorizontalView, Spacer } from "@src/components"
import { Recipe } from "@src/types"
import { useAsyncState } from "@src/utils/helpers"
import { useEffect, useReducer } from "react"
import { BackHandler, TouchableOpacity, View } from "react-native"

type TopBarProps = { recipes: Recipe[], onRecipeSelected: (index: number) => any }
const TopBar = ({ recipes, onRecipeSelected }: TopBarProps) => {
  const [open, setOpen, getOpen] = useAsyncState(false)
  
  const onRecipePressed = (index: number) => {
    onRecipeSelected(index)
    setOpen(false)
  }

  useEffect(() => {
    const remover = BackHandler.addEventListener('hardwareBackPress', () => {
      if (getOpen()) {
        setOpen(false)
        return true
      }
      else return false
    })

    return remover.remove
  }, [])

  return (
    <HorizontalView>
      <AppText style={{opacity: 0}}>dummy</AppText>
      <View style={{position: 'absolute', left: 0, zIndex: 1, backgroundColor: 'white'}}>
        {open && recipes.map((x, i) => <TouchableOpacity onPress={() => onRecipePressed(i)}>
          <AppText>{x.name}</AppText>  
        </TouchableOpacity>)}
        {!open && <TouchableOpacity onPress={() => setOpen(true)}><AppText>Closed!</AppText></TouchableOpacity>}
      </View>
      <Spacer />
      <AppIcon color='blue' />
    </HorizontalView>
  )
}

export default TopBar
