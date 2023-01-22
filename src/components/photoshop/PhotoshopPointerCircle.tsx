import { mergeProps } from 'solid-js'
import { HslColor } from '../../types'

interface Props {
  hsl: HslColor
}

export default function PhotoshopPointerCircle(_props: Props) {
  const props = mergeProps({}, _props)
  return (
    <div
      style={{
        width: '12px',
        height: '12px',
        borderRadius: '6px',
        boxShadow: props.hsl.l > 0.5 ? 'inset 0 0 0 1px #000' : 'inset 0 0 0 1px #fff',
        transform: 'translate(-6px, -6px)',
      }}
    />
  )
}
