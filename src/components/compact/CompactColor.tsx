import { JSX, mergeProps } from 'solid-js'
import { getContrastingColor } from '../../helpers/color'
import { Swatch } from '../_common'

interface Props {
  color: string
  active: boolean
  onClick: any
}

export default function CompactColor(_props: Props) {
  const props = mergeProps({ onClick: () => {} }, _props)
  const styles = () => {
    const { color, active } = props
    return {
      color: {
        background: color,
        width: '15px',
        height: '15px',
        float: 'left',
        'margin-right': '5px',
        'margin-bottom': '5px',
        position: 'relative',
        cursor: 'pointer',
        'box-shadow': color === '#FFFFFF' ? 'inset 0 0 0 1px #ddd' : undefined,
      },
      dot: {
        position: 'absolute',
        inset: '5px',
        background:
          color === '#FFFFFF'
            ? '#000'
            : color === 'transparent'
            ? '#000'
            : getContrastingColor(color),
        'border-radius': '50%',
        opacity: active ? 1 : 0,
      },
    } as Record<string, JSX.CSSProperties>
  }

  return (
    <Swatch
      styles={styles().color}
      color={props.color}
      onClick={props.onClick}
      focusStyle={{ 'box-shadow': `0 0 4px ${props.color}` }}
    >
      <div style={styles().dot} />
    </Swatch>
  )
}
