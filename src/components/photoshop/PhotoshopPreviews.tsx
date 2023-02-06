import { JSX, mergeProps } from 'solid-js'
import { RgbColor } from '../../types'

interface Props {
  rgb: RgbColor
  currentColor: string
}

export default function PhotoshopPreviews(_props: Props) {
  const props = mergeProps({}, _props)

  const styles = () => {
    const { rgb, currentColor } = props
    return {
      swatches: {
        border: '1px solid #B3B3B3',
        'border-bottom': '1px solid #F0F0F0',
        'margin-bottom': '2px',
        'margin-top': '1px',
      },
      new: {
        height: '34px',
        background: `rgb(${rgb.r},${rgb.g}, ${rgb.b})`,
        'box-shadow': 'inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000',
      },
      current: {
        height: '34px',
        background: currentColor,
        'box-shadow': 'inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 -1px 0 #000',
      },
      label: {
        'font-size': '14px',
        color: '#000',
        'text-align': 'center',
      },
    } as Record<string, JSX.CSSProperties>
  }

  return (
    <div>
      <div style={styles().label}>new</div>
      <div style={styles().swatches}>
        <div style={styles().new} />
        <div style={styles().current} />
      </div>
      <div style={styles().label}>current</div>
    </div>
  )
}
