import { JSX, mergeProps } from 'solid-js'
import { Alpha, useColorPicker, withColorPicker } from '../_common'
import AlphaPointer from './AlphaPointer'

export type AlphaPickerProps = {
  width?: string | number
  height?: string | number
  direction?: string
  pointer: <T extends object>(props: T) => JSX.Element
  renderers?: any
  className?: string
  style?: Record<string, JSX.CSSProperties>
}

export function AlphaPicker(_props: AlphaPickerProps) {
  const props = mergeProps(
    {
      width: '316px',
      height: '16px',
      direction: 'horizontal',
      pointer: AlphaPointer,
      className: '',
    },
    _props,
  )

  const { colors: currentColors, changeColor } = useColorPicker()

  const styles: Record<string, JSX.CSSProperties> = {
    picker: {
      position: 'relative',
      width: props.width,
      height: props.height,
    },
    alpha: {
      borderRadius: '2px',
      ...props.style,
    },
  }

  return (
    <div style={styles.picker} class={`alpha-picker ${props.className}`}>
      <Alpha
        {...styles.alpha}
        rgb={currentColors().rgb}
        hsl={currentColors().hsl}
        pointer={props.pointer}
        renderers={props.renderers}
        onChange={changeColor}
        direction={props.direction}
      />
    </div>
  )
}

export default withColorPicker(AlphaPicker)
