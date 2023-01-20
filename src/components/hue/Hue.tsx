import { useColorPicker, withColorPicker } from '../_common/ColorPicker'
import { ChangeColor } from '../../types'
import { Hue } from '../_common'
import HuePointer from './HuePointer'
import { JSX, mergeProps } from 'solid-js'
import { merge } from 'lodash-es'

export type HuePickerProps = {
  width?: string | number
  height?: string | number
  direction?: string
  pointer?: typeof HuePointer
  className?: string
  styles?: Record<string, JSX.CSSProperties>
}

export function HuePicker(_props: HuePickerProps) {
  const props = mergeProps(
    {
      width: '316px',
      height: '16px',
      direction: 'horizontal',
      pointer: HuePointer,
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors, changeColor } = useColorPicker()

  const styles = merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
    {
      picker: {
        position: 'relative',
        width: props.width,
        height: props.height,
      },
      hue: {
        'border-radius': '2px',
      },
    },
    props.styles,
  )

  // Overwrite to provide pure hue color
  const handleChange = (data: ChangeColor) =>
    changeColor({
      a: 1,
      h: typeof data !== 'string' && 'h' in data ? data.h : 0,
      l: 0.5,
      s: 1,
    })

  return (
    <div style={styles.picker} class={`hue-picker ${props.className}`}>
      <Hue
        {...styles.hue}
        hsl={colors().hsl}
        pointer={props.pointer}
        direction={props.direction}
        onChange={handleChange}
      />
    </div>
  )
}

export default withColorPicker(HuePicker)
