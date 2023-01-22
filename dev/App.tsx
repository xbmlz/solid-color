import { Component, createSignal } from 'solid-js'
import styles from './App.module.css'
import {
  MaterialPikcer,
  HuePikcer,
  ColorResult,
  HslColor,
  AlphaPicker,
  TwitterPikcer,
  BlockPicker,
  SliderPikcer,
  GithubPicker,
  CompactPicker,
  SwatchesPikcer,
} from '../src'

const App: Component = () => {
  const [color, setColor] = createSignal<HslColor>({
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1,
  })

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hsl)
  }
  return (
    <div class={styles.App}>
      <MaterialPikcer color={color()} onChangeComplete={handleChangeComplete} />
      <HuePikcer color={color()} onChangeComplete={handleChangeComplete} />
      <AlphaPicker color={color()} onChangeComplete={handleChangeComplete} />
      <TwitterPikcer color={color()} onChangeComplete={handleChangeComplete} />
      <BlockPicker color={color()} onChangeComplete={handleChangeComplete} />
      <SliderPikcer color={color()} onChangeComplete={handleChangeComplete} />
      <GithubPicker color={color()} onChangeComplete={handleChangeComplete} />
      <CompactPicker color={color()} onChangeComplete={handleChangeComplete} />
      <SwatchesPikcer color={color()} onChangeComplete={handleChangeComplete} />
    </div>
  )
}

export default App
