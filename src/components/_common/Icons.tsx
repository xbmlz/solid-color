import { mergeProps } from 'solid-js'

interface IconProps {
  width?: number | string
  height?: number | string
  fill?: string
  stroke?: string
  onMouseOver?: (e: MouseEvent) => void
  onMouseEnter?: (e: MouseEvent) => void
  onMouseOut?: (e: MouseEvent) => void
}

export function CheckIcon(_props: IconProps) {
  const props = mergeProps(
    {
      width: 24,
      height: 24,
      fill: 'white',
      stroke: 'white',
    },
    _props,
  )
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={`${props.width}px`}
      height={`${props.height}px`}
      fill={props.fill}
      stroke={props.stroke}
      stroke-width="0.5"
    >
      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
  )
}

export function UnfoldMoreHorizontalIcon(_props: IconProps) {
  const props = mergeProps(
    {
      width: 24,
      height: 24,
    },
    _props,
  )
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={`${props.width}px`}
      height={`${props.height}px`}
      stroke-width="0.5"
      style={{ 'border-radius': '5px' }}
      onMouseOver={props.onMouseOver}
      onMouseEnter={props.onMouseEnter}
      onMouseOut={props.onMouseOut}
    >
      <path d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
    </svg>
  )
}
