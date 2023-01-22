import { For, JSX, mergeProps } from 'solid-js'
import { Color, HexColor } from '../../types'
import SwatchesColor from './SwatchesColor'

type Props = {
  onClick: (color: Color, event: Event) => void
  active: HexColor
  group: string[]
}

export default function SwatchesGroup(_props: Props) {
  const props = mergeProps({}, _props)
  const styles: Record<string, JSX.CSSProperties> = {
    group: {
      'padding-bottom': '10px',
      width: '40px',
      float: 'left',
      'margin-right': '10px',
    },
  }

  return (
    <div style={styles.group}>
      <For each={props.group}>
        {(color, i) => (
          <SwatchesColor
            color={color}
            active={color.toLowerCase() === props.active}
            first={i() === 0}
            last={i() === props.group.length - 1}
            onClick={props.onClick}
          />
        )}
      </For>
    </div>
  )
}
