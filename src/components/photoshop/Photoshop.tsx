import { merge } from 'lodash-es'
import { createSignal, JSX, mergeProps } from 'solid-js'
import { Hue, Saturation, useColorPicker, withColorPicker } from '../_common'
import PhotoshopButton from './PhotoshopButton'
import PhotoshopFields from './PhotoshopFields'
import PhotoshopPointer from './PhotoshopPointer'
import PhotoshopPointerCircle from './PhotoshopPointerCircle'
import PhotoshopPreviews from './PhotoshopPreviews'

export type PhotoshopPickerProps = {
  header?: string
  styles?: Record<string, JSX.CSSProperties>
  className?: string
  onAccept?: () => void
  onCancel?: () => void
}

function Photoshop(_props: PhotoshopPickerProps) {
  const props = mergeProps(
    {
      header: 'Color Picker',
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors, changeColor } = useColorPicker()

  const [currentColor, setCurrentColor] = createSignal(colors().hex)

  const styles = merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
    {
      picker: {
        background: '#DCDCDC',
        'border-radius': '4px',
        'box-shadow': '0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15)',
        'box-sizing': 'initial',
        width: '513px',
      },
      head: {
        'background-image': 'linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)',
        'border-bottom': '1px solid #B1B1B1',
        'box-shadow': 'inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)',
        height: '23px',
        'line-height': '24px',
        'border-radius': '4px 4px 0 0',
        'font-size': '13px',
        color: '#4D4D4D',
        'text-align': 'center',
      },
      body: {
        padding: '15px 15px 0',
        display: 'flex',
      },
      saturation: {
        width: '256px',
        height: '256px',
        position: 'relative',
        border: '2px solid #B3B3B3',
        'border-bottom': '2px solid #F0F0F0',
        overflow: 'hidden',
      },
      hue: {
        position: 'relative',
        height: '256px',
        width: '19px',
        'margin-left': '10px',
        border: '2px solid #B3B3B3',
        'border-bottom': '2px solid #F0F0F0',
      },
      controls: {
        width: '180px',
        'margin-left': '10px',
      },
      top: {
        display: 'flex',
      },
      previews: {
        width: '60px',
      },
      actions: {
        flex: '1',
        'margin-left': '20px',
      },
    },
    props.styles,
  )

  function handleAccept() {
    props.onAccept && props.onAccept()
    setCurrentColor(colors().hex)
  }

  return (
    <div style={styles.picker} class={`photoshop-picker ${props.className}`}>
      <div style={styles.head}>{props.header}</div>

      <div style={styles.body} class="flexbox-fix">
        <div style={styles.saturation}>
          <Saturation
            hsl={colors().hsl}
            hsv={colors().hsv}
            pointer={<PhotoshopPointerCircle hsl={colors().hsl} />}
            onChange={changeColor}
          />
        </div>
        <div style={styles.hue}>
          <Hue
            direction="vertical"
            hsl={colors().hsl}
            pointer={PhotoshopPointer}
            onChange={changeColor}
          />
        </div>
        <div style={styles.controls}>
          <div style={styles.top} class="flexbox-fix">
            <div style={styles.previews}>
              <PhotoshopPreviews rgb={colors().rgb} currentColor={currentColor()} />
            </div>
            <div style={styles.actions}>
              <PhotoshopButton label="OK" onClick={handleAccept} active />
              <PhotoshopButton label="Cancel" onClick={props.onCancel} />
              <PhotoshopFields
                onChange={changeColor}
                rgb={colors().rgb}
                hsv={colors().hsv}
                hex={colors().hex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withColorPicker(Photoshop)
