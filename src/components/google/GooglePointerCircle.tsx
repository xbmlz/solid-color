import { mergeProps } from 'solid-js'
import { HslColor } from '../../types'

interface Props {
  hsl?: HslColor
}

export default function GooglePointerCircle(_props: Props) {
  const props = mergeProps({ hsl: { a: 1, h: 249.94, l: 0.2, s: 0.5 } }, _props)
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        'border-radius': '22px',
        border: '2px #fff solid',
        transform: 'translate(-12px, -13px)',
        background: `hsl(${Math.round(props.hsl.h)}, ${Math.round(
          props.hsl.s * 100,
        )}%, ${Math.round(props.hsl.l * 100)}%)`,
      }}
    />
  )
}
