import { merge } from 'lodash-es'
import { JSX, mergeProps, onCleanup } from 'solid-js'
import { HslColor, RgbColor } from '../../types'
import * as alpha from '../../helpers/alpha'
import { Checkboard } from './Checkboard'

export interface AlphaProps {
  rgb: RgbColor
  hsl: HslColor
  renderers?: any
  direction?: string
  a?: number
  radius?: number
  shadow?: string
  styles?: Record<string, JSX.CSSProperties>
  pointer?: <T extends object>(props: T) => JSX.Element
  onChange?: (data: any, e: Event) => void
}

export const Alpha = (_props: AlphaProps) => {
  const props = mergeProps(
    {
      direction: 'horizontal',
      styles: {},
    },
    _props,
  )
  let container: HTMLDivElement

  const styles = () => {
    const { rgb } = props
    return merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
      {
        alpha: {
          position: 'absolute',
          inset: '0px',
          'border-radius': props.radius,
        },
        checkboard: {
          position: 'absolute',
          inset: '0px',
          overflow: 'hidden',
          'border-radius': props.radius,
        },
        gradient: {
          position: 'absolute',
          inset: '0px',
          background:
            props.direction === 'vertical'
              ? `linear-gradient(to bottom, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
          rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`
              : `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
         rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
          'box-shadow': props.shadow,
          'border-radius': props.radius,
        },
        container: {
          position: 'relative',
          height: '100%',
          margin: '0 3px',
        },
        pointer: {
          position: 'absolute',
          left: props.direction === 'vertical' ? 0 : `${rgb.a && rgb.a * 100}%`,
          top: props.direction === 'vertical' ? `${rgb.a && rgb.a * 100}%` : undefined,
        },
        slider: {
          width: '4px',
          'border-radius': '1px',
          height: '8px',
          'box-shadow': '0 0 2px rgba(0, 0, 0, .6)',
          background: '#fff',
          'margin-top': '1px',
          transform: 'translateX(-2px)',
        },
      },
      props.styles,
    )
  }

  const handleChange = (e: Event) => {
    const change = alpha.calculateChange(e, props.hsl, props.direction, props.a, container)
    change && typeof props.onChange === 'function' && props.onChange(change, e)
  }

  const handleMouseDown = (e: Event) => {
    handleChange(e)
    window.addEventListener('mousemove', handleChange)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = () => {
    unbindEventListeners()
  }

  const unbindEventListeners = () => {
    window.removeEventListener('mousemove', handleChange)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  onCleanup(() => unbindEventListeners())

  return (
    <div style={styles().alpha}>
      <div style={styles().checkboard}>
        <Checkboard renderers={props.renderers} />
      </div>
      <div style={styles().gradient} />
      <div
        style={styles().container}
        ref={container!}
        onMouseDown={handleMouseDown}
        onMouseUp={handleChange}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <div style={styles().pointer}>
          {props.pointer ? <props.pointer {...props} /> : <div style={styles().slider} />}
        </div>
      </div>
    </div>
  )
}
