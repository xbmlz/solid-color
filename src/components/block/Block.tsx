import * as color from '../../helpers/color'
import { HexColor } from '../../types'
import { Checkboard, EditableInput, useColorPicker, withColorPicker } from '../_common'
import BlockSwatches from './BlockSwatches'
import { createEffect, createSignal, JSX, mergeProps } from 'solid-js'
import { merge } from 'lodash-es'

export type BlockPickerProps = {
  width?: string | number
  colors?: string[]
  triangle?: 'top' | 'hide'
  className?: string
  styles?: Record<string, JSX.CSSProperties>
}

export const Block = (_props: BlockPickerProps) => {
  const props = mergeProps(
    {
      colors: [
        '#D9E3F0',
        '#F47373',
        '#697689',
        '#37D67A',
        '#2CCCE4',
        '#555555',
        '#dce775',
        '#ff8a65',
        '#ba68c8',
      ],
      width: 170,
      triangle: 'top',
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors: currentColors, changeColor } = useColorPicker()

  const transparent = currentColors().hex === 'transparent'
  const handleChange = (hexCode: HexColor, e: Event) => {
    color.isValidHex(hexCode) &&
      changeColor(
        {
          hex: hexCode,
          source: 'hex',
        },
        e,
      )
  }

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    const width = typeof props.width === 'number' ? `${props.width}px` : props.width
    const { triangle, styles } = props
    setStyles(
      merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
        {
          card: {
            width,
            background: '#fff',
            'box-shadow': '0 1px rgba(0,0,0,.1)',
            'border-radius': '6px',
            position: 'relative',
          },
          head: {
            height: '110px',
            background: currentColors().hex,
            'border-radius': '6px 6px 0 0',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            position: 'relative',
          },
          body: {
            padding: '10px',
          },
          label: {
            'font-size': '18px',
            color: color.getContrastingColor(currentColors().hex),
            position: 'relative',
          },
          triangle: {
            width: '0px',
            height: '0px',
            'border-style': 'solid',
            'border-width': '0 10px 10px 10px',
            'border-color': `transparent transparent ${currentColors().hex} transparent`,
            position: 'absolute',
            top: '-10px',
            left: '50%',
            'margin-left': '-10px',
            display: triangle === 'hide' ? 'none' : undefined,
          },
          input: {
            width: '100%',
            'font-size': '12px',
            color: '#666',
            border: '0px',
            outline: 'none',
            height: '22px',
            'box-shadow': 'inset 0 0 0 1px #ddd',
            'border-radius': '4px',
            padding: '0 7px',
            'box-sizing': 'border-box',
          },
        },
        styles,
      ),
    )
  })

  return (
    <div style={styles().card} class={`block-picker ${props.className}`}>
      <div style={styles().triangle} />

      <div style={styles().head}>
        {transparent && <Checkboard borderRadius="6px 6px 0 0" />}
        <div style={styles().label}>{currentColors().hex}</div>
      </div>

      <div style={styles().body}>
        <BlockSwatches colors={props.colors} onClick={handleChange} />
        <EditableInput
          styles={{ input: styles().input }}
          value={currentColors().hex}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default withColorPicker(Block)
