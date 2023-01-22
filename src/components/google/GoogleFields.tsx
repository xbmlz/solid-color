import { createEffect, createSignal, JSX, mergeProps } from 'solid-js'
import * as color from '../../helpers/color'
import { ChangeColor, HexColor, HslColor, HsvColor, RgbColor } from '../../types'
import { EditableInput } from '../_common'

interface Props {
  rgb: RgbColor
  hsl: HslColor
  hex: HexColor
  hsv: HsvColor
  onChange: (color: ChangeColor, event: Event) => void
}

export default function GoogleFields(_props: Props) {
  const props = mergeProps({}, _props)

  const [rgbValue, setRgbValue] = createSignal('')
  const [hslValue, setHslValue] = createSignal('')
  const [hsvValue, setHsvValue] = createSignal('')

  createEffect(() => {
    setRgbValue(`${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}`)
    setHslValue(
      `${Math.round(props.hsl.h)}°, ${Math.round(props.hsl.s * 100)}%, ${Math.round(
        props.hsl.l * 100,
      )}%`,
    )
    setHsvValue(
      `${Math.round(props.hsv.h)}°, ${Math.round(props.hsv.s * 100)}%, ${Math.round(
        props.hsv.v * 100,
      )}%`,
    )
  }, [props.rgb, props.hsl, props.hsv])
  const handleChange = (data: any, e: Event) => {
    if (data.hex) {
      color.isValidHex(data.hex) &&
        props.onChange(
          {
            hex: data.hex,
            source: 'hex',
          },
          e,
        )
    } else if (data.rgb) {
      const values = data.rgb.split(',')
      color.isvalidColorString(data.rgb, 'rgb') &&
        props.onChange(
          {
            r: values[0],
            g: values[1],
            b: values[2],
            a: 1,
            source: 'rgb',
          },
          e,
        )
    } else if (data.hsv) {
      const values = data.hsv.split(',')
      if (color.isvalidColorString(data.hsv, 'hsv')) {
        values[2] = values[2].replace('%', '')
        values[1] = values[1].replace('%', '')
        values[0] = values[0].replace('°', '')
        if (values[1] == 1) {
          values[1] = 0.01
        } else if (values[2] == 1) {
          values[2] = 0.01
        }
        props.onChange(
          {
            h: Number(values[0]),
            s: Number(values[1]),
            v: Number(values[2]),
            source: 'hsv',
          } as ChangeColor,
          e,
        )
      }
    } else if (data.hsl) {
      const values = data.hsl.split(',')
      if (color.isvalidColorString(data.hsl, 'hsl')) {
        values[2] = values[2].replace('%', '')
        values[1] = values[1].replace('%', '')
        values[0] = values[0].replace('°', '')
        // @ts-ignore
        if (props.hsvValue[1] == 1) {
          // @ts-ignore
          hsvValue[1] = 0.01
          // @ts-ignore
        } else if (hsvValue[2] == 1) {
          // @ts-ignore
          hsvValue[2] = 0.01
        }
        props.onChange(
          {
            h: Number(values[0]),
            s: Number(values[1]),
            v: Number(values[2]),
            source: 'hsl',
          } as ChangeColor,
          e,
        )
      }
    }
  }

  const styles: Record<string, JSX.CSSProperties> = {
    wrap: {
      display: 'flex',
      height: '100px',
      'margin-top': '4px',
    },
    fields: {
      width: '100%',
    },
    column: {
      'padding-top': '10px',
      display: 'flex',
      'justify-content': 'space-between',
    },
    double: {
      padding: '0px 4.4px',
      'box-sizing': 'border-box',
    },
    input: {
      width: '100%',
      height: '38px',
      'box-sizing': 'border-box',
      padding: '4px 10% 3px',
      'text-align': 'center',
      border: '1px solid #dadce0',
      'font-size': '11px',
      'text-transform': 'lowercase',
      'border-radius': '5px',
      outline: 'none',
      'font-family': 'Roboto,Arial,sans-serif',
    },
    input2: {
      height: '38px',
      width: '100%',
      border: '1px solid #dadce0',
      'box-sizing': 'border-box',
      'font-size': '11px',
      'text-transform': 'lowercase',
      'border-radius': '5px',
      outline: 'none',
      'padding-left': '10px',
      'font-family': 'Roboto,Arial,sans-serif',
    },
    label: {
      'text-align': 'center',
      'font-size': '12px',
      background: '#fff',
      position: 'absolute',
      'text-transform': 'uppercase',
      color: '#3c4043',
      width: '35px',
      top: '-6px',
      left: '0',
      right: '0',
      'margin-left': 'auto',
      'margin-right': 'auto',
      'font-family': 'Roboto,Arial,sans-serif',
    },
    label2: {
      left: '10px',
      'text-align': 'center',
      'font-size': '12px',
      background: '#fff',
      position: 'absolute',
      'text-transform': 'uppercase',
      color: '#3c4043',
      width: '32px',
      top: '-6px',
      'font-family': 'Roboto,Arial,sans-serif',
    },
    single: {
      'flex-grow': 1,
      margin: '0px 4.4px',
    },
  }

  return (
    <div style={styles.wrap} class="flexbox-fix">
      <div style={styles.fields}>
        <div style={styles.double}>
          <EditableInput
            styles={{ input: styles.input, label: styles.label }}
            label="hex"
            value={props.hex}
            onChange={handleChange}
          />
        </div>
        <div style={styles.column}>
          <div style={styles.single}>
            <EditableInput
              styles={{ input: styles.input2, label: styles.label2 }}
              label="rgb"
              value={rgbValue()}
              onChange={handleChange}
            />
          </div>
          <div style={styles.single}>
            <EditableInput
              styles={{ input: styles.input2, label: styles.label2 }}
              label="hsv"
              value={hsvValue()}
              onChange={handleChange}
            />
          </div>
          <div style={styles.single}>
            <EditableInput
              styles={{ input: styles.input2, label: styles.label2 }}
              label="hsl"
              value={hslValue()}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
