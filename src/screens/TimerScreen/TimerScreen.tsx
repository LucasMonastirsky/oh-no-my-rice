import FloatingButton from '@src/components/FloatingButton'
import { Recipe, Timer } from '@src/types'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AddTimer, TimerItem } from './components'

import Sound from 'react-native-sound' // TODO: add iOS sounds
import TopBar from './components/TopBar'

Sound.setCategory('Alarm')
const test_sound = new Sound('timer_off.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log(`sound error:`, error)
    return
  }
})

const mock_recipes: Recipe[] = [
  { name: 'instant rice', timers: [{ name: 'rice', duration: 1000, }]},
  { name: 'rice and potatoes', timers: [
    { name: 'rice', duration: 2000, },
    { name: 'pre-heat oven', duration: 1000, next_timer:
      { name: 'potatoes', duration: 2000, next_timer:
        { name: 'cool potatoes', duration: 3000 }
      }
    },
  ]}
]

const TimerScreen = () => {
  const [adding, setAdding] = useState(false)
  const [recipes, setRecipes] = useState(mock_recipes)
  const [selected_recipe_index, setSelectedRecipeIndex] = useState(0)

  const current_recipe = recipes[selected_recipe_index]

  const onRecipeSelected = (index: number) => {
    console.log('selected recipe', recipes[index].name)
    setSelectedRecipeIndex(index)
  }

  const onTimerDone = () => {
    test_sound.stop(() => test_sound.play())
  }

  const addTimer = (timer: Timer) => {
    const new_recipes = recipes
    recipes[selected_recipe_index].timers = [...current_recipe.timers, timer]
    setRecipes(new_recipes)
    setAdding(false)
  }

  const removeTimer = (name: string) => {
    // setTimers(list => list.filter(x => x.name !== name))
  }
  const onPressAdd = () => { setAdding(true) }

  return (
    <View style={css.container}> 
      <TopBar {...{recipes, onRecipeSelected}} />
      {recipes[selected_recipe_index].timers.map(x => <TimerItem parent_timer={x} key={x.name} onPressRemove={removeTimer} onDone={onTimerDone} />)}
      <FloatingButton onPress={onPressAdd} />
      <AddTimer active={adding} {...{addTimer}} onCancel={() => setAdding(false)} />
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default TimerScreen
