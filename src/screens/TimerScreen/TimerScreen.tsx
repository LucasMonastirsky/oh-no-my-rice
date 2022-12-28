import FloatingButton from '@src/components/FloatingButton'
import { Recipe, Timer } from '@src/types'
import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AddTimer, TimerList } from './components'

import Sound from 'react-native-sound' // TODO: add iOS sounds
import TopBar from './components/TopBar'
import { TimerListRef } from './components/TimerList/TimerList'

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

  const timer_list_ref = useRef<TimerListRef>()

  const onRecipeSelected = (index: number) => {
    console.log('selected recipe', recipes[index].name)
    setSelectedRecipeIndex(index)
  }

  const onTimerDone = () => {
    test_sound.stop(() => test_sound.play())
  }

  const addTimer = (timer: Timer) => {
    recipes[selected_recipe_index].timers = [...current_recipe.timers, timer]
    setRecipes([...recipes])
    setAdding(false)
  }

  const removeTimer = (index: number) => {
    recipes[selected_recipe_index].timers = current_recipe.timers.filter((x, i) => i !== index)
    setRecipes([...recipes])
  }
  const onPressAdd = () => { setAdding(true) }

  const resetTimers = () => {
    console.log('reset timers')
    timer_list_ref.current?.reset()
  }

  return (
    <View style={css.container}> 
      <TopBar {...{recipes, onRecipeSelected, resetTimers}} />
      <TimerList timers={current_recipe.timers} {...{removeTimer, onTimerDone}} ref={timer_list_ref} />
      <FloatingButton onPress={onPressAdd} />
      {adding && <AddTimer active={adding} {...{addTimer}} onCancel={() => setAdding(false)} />}
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default TimerScreen
