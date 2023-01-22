import { createEffect, createSignal, For, JSX, mergeProps } from 'solid-js'
import { ChangeColor } from '../../types'
import { Swatch } from '../_common'

interface Props {
  colors: (string | { color: string; title?: string })[]
  onClick?: (newColor: ChangeColor, event: MouseEvent) => void
}

export default function SketchPresetColors(_props: Props) {
  const props = mergeProps({ onClick: () => {} }, _props)

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    setStyles({
      colors: {
        margin: '0 -10px',
        padding: '10px 0 0 10px',
        'border-top': '1px solid #eee',
        display: !props.colors || !props.colors.length ? 'none' : 'flex',
        'flex-wrap': 'wrap',
        position: 'relative',
      },
      swatchWrap: {
        width: '16px',
        height: '16px',
        margin: '0 10px 10px 0',
      },
      swatch: {
        'border-radius': '3px',
        'box-shadow': 'inset 0 0 0 1px rgba(0,0,0,.15)',
      },
    })
  })

  const handleClick = (hex: string, e: MouseEvent) => {
    props.onClick(
      {
        hex,
        source: 'hex',
      },
      e,
    )
  }

  return (
    <div style={styles().colors} class="flexbox-fix">
      <For each={props.colors}>
        {(colorObjOrString) => {
          const c =
            typeof colorObjOrString === 'string' ? { color: colorObjOrString } : colorObjOrString
          return (
            <div style={styles().swatchWrap}>
              <Swatch
                {...c}
                styles={styles().swatch}
                onClick={handleClick}
                focusStyle={{
                  'box-shadow': `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${c.color}`,
                }}
              />
            </div>
          )
        }}
      </For>
    </div>
  )
}
