import { merge } from 'lodash-es'
import { JSX, mergeProps } from 'solid-js'

export interface RaisedProps {
  background?: string
  zDepth?: 0 | 1 | 2 | 3 | 4 | 5
  radius?: number
  styles?: Record<string, JSX.CSSProperties>
  children?: JSX.Element
}

export function Raised(_props: RaisedProps) {
  const props = mergeProps(
    {
      zDepth: 1,
      radius: 2,
      background: '#fff',
      styles: {},
    },
    _props,
  )
  const styles = merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
    {
      wrap: {
        position: 'relative',
        display: 'inline-block',
      },
      content: {
        position: 'relative',
      },
      bg: {
        position: 'absolute',
        inset: '0px',
        'box-shadow':
          props.zDepth === 1
            ? '0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)'
            : `0 ${props.zDepth}px ${props.zDepth * 4}px rgba(0,0,0,.24)`,
        'border-radius': props.radius,
        background: props.background,
      },
    },
    props.styles,
  )

  return (
    <div style={styles.wrap}>
      <div style={styles.bg} />
      <div style={styles.content}>{props.children}</div>
    </div>
  )
}
