import { merge } from 'lodash-es'
import { createEffect, createSignal, JSX, mergeProps } from 'solid-js'
import { ChangeColor, RgbColor } from '../../types'
import { EditableInput, Raised } from '../_common'
import { useColorPicker, withColorPicker } from '../_common/ColorPicker'
import { isValidHex } from '../../helpers/color'

export type MaterialPickerProps = {
  styles?: Record<string, JSX.CSSProperties>
  className?: string
}

export function Material(_props: MaterialPickerProps) {
  const props = mergeProps({ styles: {}, className: '' }, _props)
  const { colors, changeColor } = useColorPicker()

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>(
    merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
      {
        material: {
          width: '98px',
          height: '98px',
          padding: '16px',
          'font-family': 'Roboto',
        },
        hexWrap: {
          position: 'relative',
        },
        hexInput: {
          width: '100%',
          'margin-top': '12px',
          'font-size': '15px',
          color: '#333',
          padding: '0px',
          border: '0px',
          'border-bottom': `2px solid ${colors().hex}`,
          outline: 'none',
          height: '30px',
        },
        hexLabel: {
          position: 'absolute',
          top: '0px',
          left: '0px',
          'font-size': '11px',
          color: '#999999',
          'text-transform': 'capitalize',
        },
        hex: {},
        rgbWrap: {
          position: 'relative',
        },
        rgbInput: {
          width: '100%',
          'margin-top': '12px',
          'font-size': '15px',
          color: '#333',
          padding: '0px',
          border: '0px',
          'border-bottom': '1px solid #eee',
          outline: 'none',
          height: '30px',
        },
        rgbLabel: {
          position: 'absolute',
          top: '0px',
          left: '0px',
          'font-size': '11px',
          color: '#999999',
          'text-transform': 'capitalize',
        },
        split: {
          display: 'flex',
          'margin-right': '-10px',
          'padding-top': '11px',
        },
        third: {
          flex: '1',
          'padding-right': '10px',
        },
      },
      props.styles,
    ),
  )

  createEffect(() => {
    // update hexInput border-bottom color
    setStyles((styles) => {
      styles.hexInput['border-bottom'] = `2px solid ${colors().hex}`
      return styles
    })
  }, [colors().hex])

  const handleChange = (data: ChangeColor, e: Event) => {
    if (typeof data !== 'string' && 'hex' in data) {
      isValidHex(data.hex) &&
        changeColor(
          {
            hex: data.hex,
            source: 'hex',
          },
          e,
        )
    } else if (typeof data !== 'string' && ('r' in data || 'g' in data || 'b' in data)) {
      data = data as unknown as RgbColor
      changeColor(
        {
          r: data.r || colors().rgb.r,
          g: data.g || colors().rgb.g,
          b: data.b || colors().rgb.b,
          source: 'rgb',
        },
        e,
      )
    }
  }

  return (
    <Raised styles={props.styles}>
      <div style={styles().material} class={`material-picker ${props.className}`}>
        <EditableInput
          styles={{
            wrap: styles().hexWrap,
            input: styles().hexInput,
            label: styles().hexLabel,
          }}
          label="hex"
          value={colors().hex}
          onChange={handleChange}
        />
        <div style={styles().split} class="flexbox-fix">
          <div style={styles().third}>
            <EditableInput
              styles={{
                wrap: styles().rgbWrap,
                input: styles().rgbInput,
                label: styles().rgbLabel,
              }}
              label="r"
              value={colors().rgb.r}
              onChange={handleChange}
            />
          </div>
          <div style={styles().third}>
            <EditableInput
              styles={{
                wrap: styles().rgbWrap,
                input: styles().rgbInput,
                label: styles().rgbLabel,
              }}
              label="g"
              value={colors().rgb.g}
            />
          </div>
          <div style={styles().third}>
            <EditableInput
              styles={{
                wrap: styles().rgbWrap,
                input: styles().rgbInput,
                label: styles().rgbLabel,
              }}
              label="b"
              value={colors().rgb.b}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </Raised>
  )
}

export default withColorPicker(Material)
