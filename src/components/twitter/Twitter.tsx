import { merge } from 'lodash-es'
import { createEffect, createSignal, For, JSX, mergeProps } from 'solid-js'
import * as color from '../../helpers/color'
import { EditableInput, Swatch, useColorPicker, withColorPicker } from '../_common'

export type TwitterPickerProps = {
  width?: string | number
  triangle?: 'hide' | 'top-left' | 'top-right'
  colors?: string[]
  styles?: Record<string, JSX.CSSProperties>
  className?: string
}

export const Twitter = (_props: TwitterPickerProps) => {
  const props = mergeProps(
    {
      colors: [
        '#FF6900',
        '#FCB900',
        '#7BDCB5',
        '#00D084',
        '#8ED1FC',
        '#0693E3',
        '#ABB8C3',
        '#EB144C',
        '#F78DA7',
        '#9900EF',
      ],
      width: 276,
      triangle: 'top-left',
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors: currentColors, changeColor } = useColorPicker()

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    const width = typeof props.width === 'number' ? `${props.width}px` : props.width
    const { triangle } = props
    setStyles(
      merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
        {
          card: {
            width,
            background: '#fff',
            border: '0 solid rgba(0,0,0,0.25)',
            'box-shadow': '0 1px 4px rgba(0,0,0,0.25)',
            'border-radius': '4px',
            position: 'relative',
          },
          body: {
            padding: '15px 9px 9px 15px',
          },
          label: {
            'font-size': '18px',
            color: '#fff',
          },
          triangle: {
            width: '0px',
            height: '0px',
            'border-style': 'solid',
            'border-width': '0 9px 10px 9px',
            'border-color': 'transparent transparent #fff transparent',
            position: 'absolute',
            display: triangle === 'hide' ? 'none' : undefined,
            top: triangle === 'top-left' || triangle === 'top-right' ? '-10px' : undefined,
            left: triangle === 'top-left' || triangle === 'top-right' ? '12px' : undefined,
          },
          triangleShadow: {
            width: '0px',
            height: '0px',
            'border-style': 'solid',
            'border-width': '0 9px 10px 9px',
            'border-color': 'transparent transparent rgba(0,0,0,.1) transparent',
            position: 'absolute',
            display: triangle === 'hide' ? 'none' : undefined,
            top: triangle === 'top-left' || triangle === 'top-right' ? '-11px' : undefined,
            left: triangle === 'top-left' || triangle === 'top-right' ? '12px' : undefined,
          },
          hash: {
            background: '#F0F0F0',
            height: '30px',
            width: '30px',
            'border-radius': '4px 0 0 4px',
            float: 'left',
            color: '#98A1A4',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
          },
          input: {
            width: '100px',
            'font-size': '14px',
            color: '#666',
            border: '0px',
            outline: 'none',
            height: '28px',
            'box-shadow': 'inset 0 0 0 1px #F0F0F0',
            'box-sizing': 'content-box',
            'border-radius': '0 4px 4px 0',
            float: 'left',
            'padding-left': '8px',
          },
          swatch: {
            width: '30px',
            height: '30px',
            float: 'left',
            'border-radius': '4px',
            margin: '0 6px 6px 0',
          },
          clear: {
            clear: 'both',
          },
        },
        props.styles,
      ),
    )
  })

  const handleChange = (hexcode: string, e: Event) => {
    console.log('handleChange', hexcode)
    color.isValidHex(hexcode) &&
      changeColor(
        {
          hex: hexcode,
          source: 'hex',
        },
        e,
      )
  }

  return (
    <div style={styles().card} class={`twitter-picker ${props.className}`}>
      <div style={styles().triangleShadow} />
      <div style={styles().triangle} />
      <div style={styles().body}>
        <For each={props.colors}>
          {(c) => (
            <Swatch
              color={c}
              styles={styles().swatch}
              onClick={handleChange}
              focusStyle={{
                'box-shadow': `0 0 4px ${c}`,
              }}
            />
          )}
        </For>
        <div style={styles().hash}>#</div>
        <EditableInput
          label={''}
          styles={{ input: styles().input }}
          value={currentColors().hex.replace('#', '')}
          onChange={handleChange}
        />
        <div style={styles().clear} />
      </div>
    </div>
  )
}

export default withColorPicker(Twitter)
