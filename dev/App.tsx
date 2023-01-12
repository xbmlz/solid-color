import type { Component } from 'solid-js'
import styles from './App.module.css'
import { TwitterPicker } from '../src'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <TwitterPicker />
    </div>
  )
}

export default App
