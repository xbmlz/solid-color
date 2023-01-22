import { createEffect, createSignal, JSX, mergeProps } from 'solid-js'
import * as color from '../../helpers/color'
import { ChangeColor, HexColor, HslColor, RgbColor } from '../../types'

import { EditableInput } from '../_common'

export interface SliderPickerProps {
  onChange?: (color: ChangeColor, event: Event) => void
  rgb: RgbColor
  hsl: HslColor
  hex: HexColor
  disableAlpha?: boolean
}

export const SketchFields = (_props: SliderPickerProps) => {
  const props = mergeProps(
    {
      onChange: () => {},
    },
    _props,
  )
  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})
  createEffect(() => {
    setStyles({
      fields: {
        display: 'flex',
        'padding-top': '4px',
      },
      single: {
        flex: '1',
        'padding-left': '6px',
      },
      alpha: {
        flex: '1',
        'padding-left': '6px',
        display: props.disableAlpha ? 'none' : undefined,
      },
      double: {
        flex: '2',
      },
      input: {
        width: '80%',
        padding: '4px 10% 3px',
        border: 'none',
        'box-shadow': 'inset 0 0 0 1px #ccc',
        'font-size': '11px',
      },
      label: {
        display: 'block',
        'text-align': 'center',
        'font-size': '11px',
        color: '#222',
        'padding-top': '3px',
        'padding-bottom': '4px',
        'text-transform': 'capitalize',
      },
    })
  })

  const handleChange = (data: any, e: Event) => {
    if (typeof data !== 'string' && 'hex' in data) {
      color.isValidHex(data.hex) &&
        props.onChange(
          {
            hex: data.hex,
            source: 'hex',
          },
          e,
        )
    } else if (typeof data !== 'string' && ('r' in data || 'g' in data || 'b' in data)) {
      props.onChange(
        {
          r: data.r || props.rgb.r,
          g: data.g || props.rgb.g,
          b: data.b || props.rgb.b,
          a: props.rgb.a,
          source: 'rgb',
        },
        e,
      )
    } else if (typeof data !== 'string' && data.a) {
      if (data.a < 0) {
        data.a = 0
      } else if (data.a > 100) {
        data.a = 100
      }

      data.a /= 100
      props.onChange(
        {
          h: props.hsl.h,
          s: props.hsl.s,
          l: props.hsl.l,
          a: data.a,
          source: 'rgb',
        },
        e,
      )
    }
  }

  return (
    <div style={styles().fields} class="flexbox-fix">
      <div style={styles().double}>
        <EditableInput
          styles={{ input: styles().input, label: styles().label }}
          label="hex"
          value={props.hex.replace('#', '')}
          onChange={handleChange}
        />
      </div>
      <div style={styles().single}>
        <EditableInput
          styles={{ input: styles().input, label: styles().label }}
          label="r"
          value={props.rgb.r}
          onChange={handleChange}
          dragLabel={true}
          dragMax={255}
        />
      </div>
      <div style={styles().single}>
        <EditableInput
          styles={{ input: styles().input, label: styles().label }}
          label="g"
          value={props.rgb.g}
          onChange={handleChange}
          dragLabel={true}
          dragMax={255}
        />
      </div>
      <div style={styles().single}>
        <EditableInput
          styles={{ input: styles().input, label: styles().label }}
          label="b"
          value={props.rgb.b}
          onChange={handleChange}
          dragLabel={true}
          dragMax={255}
        />
      </div>
      <div style={styles().alpha}>
        <EditableInput
          styles={{ input: styles().input, label: styles().label }}
          label="a"
          value={Math.round((props.rgb.a ?? 1) * 100)}
          onChange={handleChange}
          dragLabel={true}
          dragMax={100}
        />
      </div>
    </div>
  )
}

export default SketchFields
