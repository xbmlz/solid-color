import { merge } from 'lodash-es'
import { createEffect, createSignal, JSX, mergeProps } from 'solid-js'
import { Alpha, Checkboard, Hue, Saturation, useColorPicker, withColorPicker } from '../_common'
import ChromeFields from './ChromeFields'
import ChromePointer from './ChromePointer'
import ChromePointerCircle from './ChromePointerCircle'

export interface ChromePickerProps {
  width?: string | number
  disableAlpha?: boolean
  styles?: Record<string, JSX.CSSProperties>
  renderers?: any
  className?: string
  defaultView?: 'hex' | 'rgb' | 'hsl'
}

export const Chrome = (_props: ChromePickerProps) => {
  const props = mergeProps(
    {
      width: 225,
      disableAlpha: false,
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors, changeColor } = useColorPicker()

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    const width = typeof props.width === 'number' ? `${props.width}px` : props.width
    setStyles(
      merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
        {
          picker: {
            width,
            background: '#fff',
            'border-radius': '2px',
            'box-shadow': '0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)',
            'box-sizing': 'initial',
            'font-family': 'Menlo',
          },
          saturation: {
            width: '100%',
            'padding-bottom': '55%',
            position: 'relative',
            'border-radius': '2px 2px 0 0',
            overflow: 'hidden',
          },
          Saturation: {
            'border-radius': '2px 2px 0 0',
          },
          body: {
            padding: '16px 16px 12px',
          },
          controls: {
            display: 'flex',
          },
          color: {
            width: props.disableAlpha ? '22px' : '32px',
          },
          swatch: {
            'margin-top': props.disableAlpha ? '0px' : '6px',
            width: props.disableAlpha ? '10px' : '16px',
            height: props.disableAlpha ? '10px' : '16px',
            'border-radius': '8px',
            position: 'relative',
            overflow: 'hidden',
          },
          active: {
            position: 'absolute',
            inset: '0px',
            'border-radius': '8px',
            'box-shadow': 'inset 0 0 0 1px rgba(0,0,0,.1)',
            background: `rgba(${colors().rgb.r}, ${colors().rgb.g}, ${colors().rgb.b}, ${
              colors().rgb.a
            })`,
            'z-index': 2,
          },
          toggles: {
            flex: '1',
          },
          hue: {
            height: '10px',
            position: 'relative',
            'margin-bottom': props.disableAlpha ? '0px' : '8px',
          },
          Hue: {
            'border-radius': '2px',
          },
          alpha: {
            height: '10px',
            position: 'relative',
            display: props.disableAlpha ? 'none' : undefined,
          },
          Alpha: {
            'border-radius': '2px',
          },
        },
        props.styles,
      ),
    )
  })

  return (
    <div style={styles().picker} class={`chrome-picker ${props.className}`}>
      <div style={styles().saturation}>
        <Saturation
          styles={styles().Saturation}
          hsl={colors().hsl}
          hsv={colors().hsv}
          pointer={<ChromePointerCircle />}
          onChange={changeColor}
        />
      </div>
      <div style={styles().body}>
        <div style={styles().controls} class="flexbox-fix">
          <div style={styles().color}>
            <div style={styles().swatch}>
              <div style={styles().active} />
              <Checkboard renderers={props.renderers} />
            </div>
          </div>
          <div style={styles().toggles}>
            <div style={styles().hue}>
              <Hue
                styles={styles().Hue}
                hsl={colors().hsl}
                pointer={ChromePointer}
                onChange={changeColor}
              />
            </div>
            <div style={styles().alpha}>
              <Alpha
                direction="horizontal"
                styles={styles().Alpha}
                rgb={colors().rgb}
                hsl={colors().hsl}
                pointer={ChromePointer}
                renderers={props.renderers}
                onChange={changeColor}
              />
            </div>
          </div>
        </div>
        <ChromeFields
          rgb={colors().rgb}
          hsl={colors().hsl}
          hex={colors().hex}
          view={props.defaultView}
          onChange={changeColor}
        />
      </div>
    </div>
  )
}

export default withColorPicker(Chrome)
