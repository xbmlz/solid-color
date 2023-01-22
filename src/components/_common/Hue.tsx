import { createEffect, createSignal, JSX, mergeProps, onCleanup } from 'solid-js'
import { calculateChange } from '../../helpers/hue'
import { HslColor } from '../../types'

interface HueProps {
  children?: JSX.Element
  direction?: string
  radius?: number | string
  shadow?: string
  hsl: HslColor
  styles?: Record<string, JSX.CSSProperties>
  pointer?: <T extends object>(props: T) => JSX.Element
  onChange?: (data: HslColor, e: MouseEvent) => void
}

export function Hue(_props: HueProps) {
  const props = mergeProps(
    {
      direction: 'horizontal',
    },
    _props,
  )

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    setStyles({
      hue: {
        position: 'absolute',
        inset: '0px',
        'border-radius': typeof props.radius === 'string' ? props.radius : `${props.radius}px`,
        'box-shadow': props.shadow,
      },
      container: {
        padding: '0 2px',
        position: 'relative',
        height: '100%',
        'border-radius': typeof props.radius === 'string' ? props.radius : `${props.radius}px`,
      },
      pointer: {
        position: 'absolute',
        left: props.direction === 'vertical' ? '0px' : `${(props.hsl.h * 100) / 360}%`,
        top: props.direction === 'vertical' ? `${-((props.hsl.h * 100) / 360) + 100}%` : undefined,
      },
      slider: {
        'margin-top': '1px',
        width: '4px',
        'border-radius': '1px',
        height: '8px',
        'box-shadow': '0 0 2px rgba(0, 0, 0, .6)',
        background: '#fff',
        transform: 'translateX(-2px)',
      },
    })
  })

  let container: HTMLDivElement

  const handleChange = (e: MouseEvent) => {
    const change = calculateChange(e, props.direction, props.hsl, container)
    change && typeof props.onChange === 'function' && props.onChange(change, e)
  }

  const unbindEventListeners = () => {
    window.removeEventListener('mousemove', handleChange)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = () => {
    unbindEventListeners()
  }

  const handleMouseDown = (e: MouseEvent) => {
    handleChange(e)
    window.addEventListener('mousemove', handleChange)
    window.addEventListener('mouseup', handleMouseUp)
  }

  onCleanup(() => unbindEventListeners())

  return (
    <div style={styles().hue}>
      <div
        ref={container!}
        class={`hue-${props.direction}`}
        style={styles().container}
        onMouseDown={handleMouseDown}
      >
        <style>{`
          .hue-horizontal {
            background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
              33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            background: -webkit-linear-gradient(to right, #f00 0%, #ff0
              17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
          }
          .hue-vertical {
            background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
              #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,
              #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
          }
        `}</style>
        <div style={styles().pointer}>
          {props.pointer ? <props.pointer {...props} /> : <div style={styles().slider} />}
        </div>
      </div>
    </div>
  )
}
