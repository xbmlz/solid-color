import { merge } from 'lodash-es'
import { createEffect, createSignal, JSX, mergeProps } from 'solid-js'
import { Alpha, Checkboard, Hue, Saturation, useColorPicker, withColorPicker } from '../_common'
import SketchFields from './SketchFields'
import SketchPresetColors from './SketchPresetColors'

export type SketchPickerProps = {
  disableAlpha?: boolean
  width?: string | number
  className?: string
  presetColors?: string[]
  styles?: Record<string, JSX.CSSProperties>
  renderers?: any
}

export function Sketch(_props: SketchPickerProps) {
  const props = mergeProps(
    {
      width: 200,
      disableAlpha: false,
      presetColors: [
        '#D0021B',
        '#F5A623',
        '#F8E71C',
        '#8B572A',
        '#7ED321',
        '#417505',
        '#BD10E0',
        '#9013FE',
        '#4A90E2',
        '#50E3C2',
        '#B8E986',
        '#000000',
        '#4A4A4A',
        '#9B9B9B',
        '#FFFFFF',
      ],
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors, changeColor } = useColorPicker()

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    const width = typeof props.width === 'number' ? `${props.width}px` : props.width
    const rgb = colors().rgb
    setStyles(
      merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
        {
          picker: {
            width,
            padding: '10px 10px 0',
            'box-sizing': 'initial',
            background: '#fff',
            'border-radius': '4px',
            'box-shadow': '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)',
          },
          saturation: {
            width: '100%',
            'padding-bottom': '75%',
            position: 'relative',
            overflow: 'hidden',
          },
          Saturation: {
            'border-radius': '3px',
            'box-shadow': 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },
          controls: {
            display: 'flex',
          },
          sliders: {
            padding: '4px 0',
            flex: '1',
          },
          color: {
            width: '24px',
            height: props.disableAlpha ? '10px' : '24px',
            position: 'relative',
            'margin-top': '4px',
            'margin-left': '4px',
            'border-radius': '3px',
          },
          activeColor: {
            position: 'absolute',
            inset: '0px',
            'border-radius': '2px',
            background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
            'box-shadow': 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },
          hue: {
            position: 'relative',
            height: '10px',
            overflow: 'hidden',
          },
          Hue: {
            'border-radius': '2px',
            'box-shadow': 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },

          alpha: {
            position: 'relative',
            height: '10px',
            'margin-top': '4px',
            overflow: 'hidden',
            display: props.disableAlpha ? 'none' : undefined,
          },
          Alpha: {
            'border-radius': '2px',
            'box-shadow': 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },
          ...props.styles,
        },
        props.styles,
      ),
    )
  })
  return (
    <div style={styles().picker} class={`sketch-picker ${props.className}`}>
      <div style={styles().saturation}>
        <Saturation
          styles={styles().Saturation}
          hsl={colors().hsl}
          hsv={colors().hsv}
          onChange={changeColor}
        />
      </div>
      <div style={styles().controls} class="flexbox-fix">
        <div style={styles().sliders}>
          <div style={styles().hue}>
            <Hue styles={styles().Hue} hsl={colors().hsl} onChange={changeColor} />
          </div>
          <div style={styles().alpha}>
            <Alpha
              direction="horizontal"
              styles={styles().Alpha}
              rgb={colors().rgb}
              hsl={colors().hsl}
              renderers={props.renderers}
              onChange={changeColor}
            />
          </div>
        </div>
        <div style={styles().color}>
          <Checkboard />
          <div style={styles().activeColor} />
        </div>
      </div>

      <SketchFields
        rgb={colors().rgb}
        hsl={colors().hsl}
        hex={colors().hex}
        onChange={changeColor}
        disableAlpha={props.disableAlpha}
      />
      <SketchPresetColors colors={props.presetColors} onClick={changeColor} />
    </div>
  )
}

export default withColorPicker(Sketch)
