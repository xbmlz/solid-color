import {
  Accessor,
  Context,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  JSX,
  mergeProps,
  useContext,
} from 'solid-js'
import { ChangeColor, Color, ColorResult } from '../../types'
import * as color from '../../helpers/color'
import { debounce } from 'lodash-es'

export interface ColorPickerContextType {
  colors: Accessor<ColorResult>
  changeColor: (color: ChangeColor, event?: Event) => void
}

export const ColorPickerContext = createContext<ColorPickerContextType | undefined>(undefined)

export interface ColorPickerProps {
  children?: JSX.Element
  defaultColor?: Color
  color?: Color
  onChange?: (color: ColorResult, event?: Event) => void
  onChangeComplete?: (color: ColorResult) => void
}

export function ColorPickerProvider(_props: ColorPickerProps) {
  const props = mergeProps({ defaultColor: { h: 250, s: 0.5, l: 0.2, a: 1 } }, _props)

  const [colors, setColors] = createSignal<ColorResult>({
    ...color.toState(props.color ?? props.defaultColor, 0),
  })

  createEffect(() => {
    if (props.color) {
      setColors({ ...color.toState(props.color, 0) })
    }
  })

  const handler = (fn: any, data: any, event: any) => fn(data, event)
  const debouncedChangeHandler = createMemo(() => debounce(handler, 100), [])

  const changeColor = (newColor: ChangeColor, event?: Event) => {
    const isValidColor = color.simpleCheckForValidColor(newColor)
    if (isValidColor) {
      const newColors = color.toState(
        newColor,
        (typeof newColor !== 'string' && 'h' in newColor ? newColor.h : undefined) ||
          colors().oldHue,
      )

      setColors(newColors)

      props.onChangeComplete && debouncedChangeHandler()(props.onChangeComplete, newColors, event)
      props.onChange && props.onChange(newColors, event)
    }
  }

  const store = {
    colors,
    changeColor,
  }

  return (
    <ColorPickerContext.Provider value={store}>
      {props.children}
    </ColorPickerContext.Provider>
  )
}

export function useColorPicker() {
  return useContext(ColorPickerContext as Context<ColorPickerContextType>)
}

export function withColorPicker<T extends object>(Component: (props: T) => JSX.Element) {
  return (props: T & Omit<ColorPickerProps, 'children'>) => (
    <ColorPickerProvider {...props}>
      <Component {...props} />
    </ColorPickerProvider>
  )
}
