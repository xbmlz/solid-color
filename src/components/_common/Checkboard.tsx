import * as checkboard from '../../helpers/checkboard'
import { createEffect, createSignal, JSX, mergeProps } from 'solid-js'

export type CheckboardProps = {
  size?: number
  white?: string
  grey?: string
  renderers?: any
  borderRadius?: string | number
  boxShadow?: string
  children?: JSX.Element
}

export default function Checkboard(_props: CheckboardProps) {
  const props = mergeProps(
    {
      white: 'transparent',
      grey: 'rgba(0,0,0,.08)',
      size: 8,
      renderers: {},
    },
    _props,
  )

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    const { size, white, grey, borderRadius, boxShadow, renderers } = props
    setStyles({
      grid: {
        'border-radius': borderRadius,
        'box-shadow': boxShadow,
        position: 'absolute',
        inset: '0px',
        background: `url(${checkboard.get(white, grey, size, renderers.canvas)}) center left`,
      },
    })
  })

  // return isValidElement(children) ? (
  //   React.cloneElement(children, {
  //     ...children.props,
  //     style: { ...children.props.style, ...styles.grid },
  //   })
  // ) : (
  //   <div style={styles.grid} />
  // )
  // 判断children是否是一个有效的元素
  return props.children ? (
    <div style={styles().grid}>{props.children}</div>
  ) : (
    <div style={styles().grid} />
  )
}
