import { debounce } from 'lodash-es'
import { Component, createContext, createMemo, createSignal, JSX, useContext } from 'solid-js'
import { simpleCheckForValidColor, toState } from '../helpers/color'
import type { ChangeColor, Color, ColorResult } from '../types/colors'

interface Props {
  children: JSX.Element

  /** Debounced version of `onChange`. Called after 100ms of no change */
  onChangeComplete?: (color: ColorResult) => void

  onSwatchHover?: (color: ColorResult, event: MouseEvent) => void

  /**
   * Called _every_ time the color changes, ex. when dragging to select a color.
   * Use `onChangeComplete` for a debounced value (only called once picking a color is complete)
   */
  onChange?: (color: ColorResult, event?: MouseEvent) => void

  /** Allows you to control the color yourself */
  color?: Color

  /** Default color */
  defaultColor?: Color
}

interface ColorContextValue {
  colors: ColorResult
}

const ColorContext = createContext<ColorContextValue>()

export function ColorProvider({
  children,
  onChangeComplete,
  onChange,
  onSwatchHover,
  color: passedColor,
  defaultColor = {
    h: 250,
    s: 0.5,
    l: 0.2,
    a: 1,
  },
}: Props) {
  const [colors, setColors] = createSignal<ColorResult>({
    ...toState(passedColor ?? defaultColor, 0),
  })

  const handler = (fn: any, data: any, event: any) => fn(data, event)
  const debouncedChangeHandler = createMemo(() => debounce(handler, 100), [])

  const changeColor = (newColor: ChangeColor, event?: MouseEvent) => {
    const isValidColor = simpleCheckForValidColor(newColor)
    if (!isValidColor) return
    const newColors = toState(
      newColor,
      (typeof newColor !== 'string' && 'h' in newColor ? newColor.h : undefined) || colors().oldHue,
    )
    setColors(newColors)
    onChangeComplete && debouncedChangeHandler()(onChangeComplete, newColors, event)
    onChange && onChange(newColors, event)
  }

  const handleSwatchHover = (newColor: ChangeColor, event: MouseEvent) => {
    const isValidColor = simpleCheckForValidColor(newColor)
    if (!isValidColor) return
    const newColors = toState(
      newColor,
      (typeof newColor !== 'string' && 'h' in newColor ? newColor.h : undefined) || colors().oldHue,
    )
    onSwatchHover && onSwatchHover(newColors, event)
  }

  return (
    <ColorContext.Provider
      value={{
        colors: colors(),
      }}
    >
      {children}
    </ColorContext.Provider>
  )
}

export function useColorContext() {
  const context = useContext(ColorContext)
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider')
  }
  return context
}

export function withColorProvider(Component: Component) {
  return (props: any) => {
    console.log('withColorProvider', props)
    return (
      <ColorProvider>
        <Component {...props} />
      </ColorProvider>
    )
  }
}
