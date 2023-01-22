import { merge } from 'lodash-es'
import { createEffect, createSignal, For, JSX, mergeProps } from 'solid-js'
import { HexColor } from '../../types'
import { useColorPicker, withColorPicker } from '../_common'
import CircleSwatch from './CircleSwatch'

export type CirclePickerProps = {
  width?: string | number
  circleSize?: number
  circleSpacing?: number
  className?: string
  colors?: string[]
  styles?: Record<string, JSX.CSSProperties>
}

export function Circle(_props: CirclePickerProps) {
  const props = mergeProps(
    {
      width: 252,
      colors: [
        '#F44336',
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#2196F3',
        '#03A9F4',
        '#00BCD4',
        '#009688',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFEB3B',
        '#FFC107',
        '#FF9800',
        '#FF5722',
        '#795548',
        '#607D8B',
      ],
      circleSize: 28,
      styles: {},
      circleSpacing: 14,
      className: '',
    },
    _props,
  )
  const { colors: currentColors, changeColor } = useColorPicker()

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    const { width, circleSpacing, styles } = props
    setStyles(
      merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
        {
          card: {
            width: `${width}px`,
            display: 'flex',
            'flex-wrap': 'wrap',
            'margin-right': `${-circleSpacing}px`,
            'margin-bottom': `${-circleSpacing}px`,
          },
        },
        styles,
      ),
    )
  })

  const handleChange = (hexCode: HexColor, e: Event) =>
    changeColor({ hex: hexCode, source: 'hex' }, e)

  return (
    <div style={styles().card} class={`circle-picker ${props.className}`}>
      <For each={props.colors}>
        {(c) => (
          <CircleSwatch
            color={c}
            onClick={handleChange}
            active={currentColors().hex === c.toLowerCase()}
            circleSize={props.circleSize}
            circleSpacing={props.circleSpacing}
          />
        )}
      </For>
    </div>
  )
}

export default withColorPicker(Circle)
