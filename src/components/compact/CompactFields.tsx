import { createEffect, createSignal, JSX, mergeProps } from 'solid-js'
import { HexColor, RgbColor } from '../../types'
import { EditableInput } from '../_common'

interface Props {
  hex: HexColor
  rgb: RgbColor
  onChange: any
}

export default function CompactFields(_props: Props) {
  const props = mergeProps({}, _props)
  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})
  createEffect(() => {
    const hex = props.hex
    setStyles({
      fields: {
        display: 'flex',
        'padding-bottom': '6px',
        'padding-right': '5px',
        position: 'relative',
      },
      active: {
        position: 'absolute',
        top: '6px',
        left: '5px',
        height: '9px',
        width: '9px',
        background: hex,
      },
      hexWrap: {
        flex: '6',
        position: 'relative',
      },
      hexInput: {
        width: '80%',
        padding: '0px',
        'padding-left': '20%',
        border: 'none',
        outline: 'none',
        background: 'none',
        'font-size': '12px',
        color: '#333',
        height: '16px',
      },
      hexLabel: {
        display: 'none',
      },
      rgbWrap: {
        flex: '3',
        position: 'relative',
      },
      rgbInput: {
        width: '70%',
        padding: '0px',
        'padding-left': '30%',
        border: 'none',
        outline: 'none',
        background: 'none',
        'font-size': '12px',
        color: '#333',
        height: '16px',
      },
      rgbLabel: {
        position: 'absolute',
        top: '3px',
        left: '0px',
        'line-height': '16px',
        'text-transform': 'uppercase',
        'font-size': '12px',
        color: '#999',
      },
    })
  })

  const handleChange = (data: any, e: Event) => {
    if (data.r || data.g || data.b) {
      props.onChange(
        {
          r: data.r || props.rgb.r,
          g: data.g || props.rgb.g,
          b: data.b || props.rgb.b,
          source: 'rgb',
        },
        e,
      )
    } else {
      props.onChange(
        {
          hex: data.hex,
          source: 'hex',
        },
        e,
      )
    }
  }

  return (
    <div style={styles().fields} class="flexbox-fix">
      <div style={styles().active} />
      <EditableInput
        styles={{
          wrap: styles().hexWrap,
          input: styles().hexInput,
          label: styles().hexLabel,
        }}
        label="hex"
        value={props.hex}
        onChange={handleChange}
      />
      <EditableInput
        styles={{
          wrap: styles().rgbWrap,
          input: styles().rgbInput,
          label: styles().rgbLabel,
        }}
        label="r"
        value={props.rgb.r}
        onChange={handleChange}
      />
      <EditableInput
        styles={{
          wrap: styles().rgbWrap,
          input: styles().rgbInput,
          label: styles().rgbLabel,
        }}
        label="g"
        value={props.rgb.g}
        onChange={handleChange}
      />
      <EditableInput
        styles={{
          wrap: styles().rgbWrap,
          input: styles().rgbInput,
          label: styles().rgbLabel,
        }}
        label="b"
        value={props.rgb.b}
        onChange={handleChange}
      />
    </div>
  )
}
