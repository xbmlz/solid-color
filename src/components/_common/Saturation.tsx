import { merge } from 'lodash-es'
import { createEffect, JSX, mergeProps } from 'solid-js'
import { calculateChange } from '../../helpers/saturation'
import { ChangeColor, HslColor, HsvColor } from '../../types'

export type SaturationProps = {
  hsl: HslColor
  hsv: HsvColor
  pointer?: JSX.Element
  onChange?: (color: ChangeColor, event?: Event) => void
  shadow?: JSX.CSSProperties['box-shadow']
  radius?: JSX.CSSProperties['border-radius']
  styles?: Record<string, JSX.CSSProperties>
}

export function Saturation(_props: SaturationProps) {
  const props = mergeProps({ styles: {} }, _props)
  let container: HTMLDivElement

  createEffect(() => {
    return () => {
      unbindEventListeners()
    }
  }, [])

  function handleChange(event: MouseEvent | TouchEvent) {
    if (props.onChange) {
      props.onChange(calculateChange(event, props.hsl, container), event as any)
    }
  }

  function handleMouseDown(event: MouseEvent) {
    handleChange(event)

    if (container) {
      container.addEventListener('mousemove', handleChange)
      container.addEventListener('mouseup', handleMouseUp)
    }
  }

  function handleMouseUp() {
    unbindEventListeners()
  }

  function unbindEventListeners() {
    if (container) {
      container.removeEventListener('mousemove', handleChange)
      container.removeEventListener('mouseup', handleMouseUp)
    }
  }

  const styles = () => {
    const { hsv, hsl, shadow, radius, styles } = props
    return merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
      {
        color: {
          position: 'absolute',
          inset: '0px',
          background: `hsl(${hsl.h},100%, 50%)`,
          'border-radius': radius,
        },
        white: {
          position: 'absolute',
          inset: '0px',
          'border-radius': radius,
        },
        black: {
          position: 'absolute',
          inset: '0px',
          boxShadow: shadow,
          'border-radius': radius,
        },
        pointer: {
          position: 'absolute',
          top: `${-(hsv.v * 100) + 100}%`,
          left: `${hsv.s * 100}%`,
          cursor: 'default',
        },
        circle: {
          width: '4px',
          height: '4px',
          'box-shadow': `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
          'border-radius': '50%',
          cursor: 'hand',
          transform: 'translate(-2px, -2px)',
        },
      },
      styles,
    )
  }

  return (
    <div
      style={styles().color}
      ref={container!}
      onMouseDown={handleMouseDown}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
    >
      <style>{`
          .saturation-white {
            background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));
            background: linear-gradient(to right, #fff, rgba(255,255,255,0));
          }
          .saturation-black {
            background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));
            background: linear-gradient(to top, #000, rgba(0,0,0,0));
          }
        `}</style>
      <div style={styles().white} class="saturation-white">
        <div style={styles().black} class="saturation-black" />
        <div style={styles().pointer}>
          {props.pointer ? props.pointer : <div style={styles().circle} />}
        </div>
      </div>
    </div>
  )
}
