import { JSX, mergeProps } from 'solid-js'
import * as color from '../../helpers/color'
import { HexColor, HsvColor, RgbColor } from '../../types'

import { EditableInput } from '../_common'

interface Props {
  rgb: RgbColor
  hsv: HsvColor
  hex: HexColor
  onChange: (data: any, event: Event) => void
}

export default function PhotoshopPicker(_props: Props) {
  const props = mergeProps({}, _props)
  const styles: Record<string, JSX.CSSProperties> = {
    fields: {
      'padding-top': '5px',
      'padding-bottom': '9px',
      width: '80px',
      position: 'relative',
    },
    divider: {
      height: '5px',
    },
    rgbWrap: {
      position: 'relative',
    },
    rgbInput: {
      'margin-left': '40%',
      width: '40%',
      height: '18px',
      border: '1px solid #888888',
      'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC',
      'margin-bottom': '5px',
      'font-size': '13px',
      'padding-left': '3px',
      'margin-right': '10px',
    },
    rgbLabel: {
      left: '0px',
      top: '0px',
      width: '34px',
      'text-transform': 'uppercase',
      'font-size': '13px',
      height: '18px',
      'line-height': '22px',
      position: 'absolute',
    },
    hexWrap: {
      position: 'relative',
    },
    hexInput: {
      'margin-left': '20%',
      width: '80%',
      height: '18px',
      border: '1px solid #888888',
      'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC',
      'margin-bottom': '6px',
      'font-size': '13px',
      'padding-left': '3px',
    },
    hexLabel: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '14px',
      'text-transform': 'uppercase',
      'font-size': '13px',
      height: '18px',
      'line-height': '22px',
    },
    fieldSymbols: {
      position: 'absolute',
      top: '5px',
      right: '-7px',
      'font-size': '13px',
    },
    symbol: {
      height: '20px',
      'line-height': '22px',
      'padding-bottom': '7px',
    },
  }

  const handleChange = (data: any, e: Event) => {
    if (data['#']) {
      color.isValidHex(data['#']) &&
        props.onChange(
          {
            hex: data['#'],
            source: 'hex',
          },
          e,
        )
    } else if (data.r || data.g || data.b) {
      props.onChange(
        {
          r: data.r || props.rgb.r,
          g: data.g || props.rgb.g,
          b: data.b || props.rgb.b,
          source: 'rgb',
        },
        e,
      )
    } else if (data.h || data.s || data.v) {
      props.onChange(
        {
          h: data.h || props.hsv.h,
          s: data.s || props.hsv.s,
          v: data.v || props.hsv.v,
          source: 'hsv',
        },
        e,
      )
    }
  }

  return (
    <div style={styles.fields}>
      <EditableInput
        styles={{
          wrap: styles.rgbWrap,
          input: styles.rgbInput,
          label: styles.rgbLabel,
        }}
        label="h"
        value={Math.round(props.hsv.h)}
        onChange={handleChange}
      />
      <EditableInput
        styles={{
          wrap: styles.rgbWrap,
          input: styles.rgbInput,
          label: styles.rgbLabel,
        }}
        label="s"
        value={Math.round(props.hsv.s * 100)}
        onChange={handleChange}
      />
      <EditableInput
        styles={{
          wrap: styles.rgbWrap,
          input: styles.rgbInput,
          label: styles.rgbLabel,
        }}
        label="v"
        value={Math.round(props.hsv.v * 100)}
        onChange={handleChange}
      />
      <div style={styles.divider} />
      <EditableInput
        styles={{
          wrap: styles.rgbWrap,
          input: styles.rgbInput,
          label: styles.rgbLabel,
        }}
        label="r"
        value={props.rgb.r}
        onChange={handleChange}
      />
      <EditableInput
        styles={{
          wrap: styles.rgbWrap,
          input: styles.rgbInput,
          label: styles.rgbLabel,
        }}
        label="g"
        value={props.rgb.g}
        onChange={handleChange}
      />
      <EditableInput
        styles={{
          wrap: styles.rgbWrap,
          input: styles.rgbInput,
          label: styles.rgbLabel,
        }}
        label="b"
        value={props.rgb.b}
        onChange={handleChange}
      />
      <div style={styles.divider} />
      <EditableInput
        styles={{
          wrap: styles.hexWrap,
          input: styles.hexInput,
          label: styles.hexLabel,
        }}
        label="#"
        value={props.hex.replace('#', '')}
        onChange={handleChange}
      />
      <div style={styles.fieldSymbols}>
        <div style={styles.symbol}>°</div>
        <div style={styles.symbol}>%</div>
        <div style={styles.symbol}>%</div>
      </div>
    </div>
  )
}
