import { merge } from 'lodash-es'
import { JSX, mergeProps } from 'solid-js'
import { Hue, useColorPicker, withColorPicker } from '../_common'
import SliderPointer from './SliderPointer'
import SliderSwatches from './SliderSwatches'

export type SliderPickerProps = {
  pointer?: typeof SliderPointer
  styles?: Record<string, JSX.CSSProperties>
  className?: string
}

const Slider = (_props: SliderPickerProps) => {
  const props = mergeProps(
    {
      pointer: SliderPointer,
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors, changeColor } = useColorPicker()

  const styles = merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
    {
      hue: {
        height: '12px',
        position: 'relative',
      },
      Hue: {
        'border-radius': '2px',
      },
    },
    props.styles,
  )

  return (
    <div style={styles.wrap || {}} class={`slider-picker ${props.className}`}>
      <div style={styles.hue}>
        <Hue radius={2} hsl={colors().hsl} pointer={props.pointer} onChange={changeColor} />
      </div>
      <div style={styles.swatches}>
        <SliderSwatches hsl={colors().hsl} onClick={changeColor} />
      </div>
    </div>
  )
}

export default withColorPicker(Slider)
