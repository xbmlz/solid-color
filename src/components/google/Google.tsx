import { merge } from 'lodash-es'
import { JSX, mergeProps } from 'solid-js'
import { Hue, Saturation, useColorPicker, withColorPicker } from '../_common'
import GoogleFields from './GoogleFields'
import GooglePointer from './GooglePointer'
import GooglePointerCircle from './GooglePointerCircle'

export type GooglePickerProps = {
  width?: string | number
  styles?: Record<string, JSX.CSSProperties>
  header?: string
  className?: string
}

export function Google(_props: GooglePickerProps) {
  const props = mergeProps(
    {
      width: 652,
      header: 'Color picker',
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors, changeColor } = useColorPicker()

  const styles = () => {
    const width = typeof props.width === 'number' ? `${props.width}px` : props.width
    return merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
      {
        picker: {
          width,
          background: '#fff',
          border: '1px solid #dfe1e5',
          'box-sizing': 'initial',
          display: 'flex',
          'flex-wrap': 'wrap',
          'border-radius': '8px 8px 0px 0px',
        },
        head: {
          height: '57px',
          width: '100%',
          'padding-top': '16px',
          'padding-bottom': '16px',
          'padding-left': '16px',
          'font-size': '20px',
          'box-sizing': 'border-box',
          'font-family': 'Roboto-Regular,HelveticaNeue,Arial,sans-serif',
        },
        saturation: {
          width: '70%',
          padding: '0px',
          position: 'relative',
          overflow: 'hidden',
        },
        swatch: {
          width: '30%',
          height: '228px',
          padding: '0px',
          background: `rgba(${colors().rgb.r}, ${colors().rgb.g}, ${colors().rgb.b}, 1)`,
          position: 'relative',
          overflow: 'hidden',
        },
        body: {
          margin: 'auto',
          width: '95%',
        },
        controls: {
          display: 'flex',
          'box-sizing': 'border-box',
          height: '52px',
          'padding-top': '22px',
        },
        color: {
          width: '32px',
        },
        hue: {
          height: '8px',
          position: 'relative',
          margin: '0px 16px 0px 16px',
          width: '100%',
        },
        Hue: {
          'border-radius': '2px',
        },
      },
      props.styles,
    )
  }

  return (
    <div style={styles().picker} class={`google-picker ${props.className}`}>
      <div style={styles().head}>{props.header}</div>
      <div style={styles().swatch} />
      <div style={styles().saturation}>
        <Saturation
          hsl={colors().hsl}
          hsv={colors().hsv}
          pointer={<GooglePointerCircle hsl={colors().hsl} />}
          onChange={changeColor}
        />
      </div>
      <div style={styles().body}>
        <div style={styles().controls} class="flexbox-fix">
          <div style={styles().hue}>
            <Hue
              styles={styles().Hue}
              hsl={colors().hsl}
              radius="4px"
              pointer={GooglePointer}
              onChange={changeColor}
            />
          </div>
        </div>
        <GoogleFields
          rgb={colors().rgb}
          hsl={colors().hsl}
          hex={colors().hex}
          hsv={colors().hsv}
          onChange={changeColor}
        />
      </div>
    </div>
  )
}

export default withColorPicker(Google)
