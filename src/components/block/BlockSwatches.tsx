import { HexColor } from '../../types'
import { Swatch } from '../_common'
import { JSX, For } from 'solid-js'

interface Props {
  colors: string[]
  onClick: (hexCode: HexColor, e: Event) => void
}

export const BlockSwatches = ({ colors, onClick }: Props) => {
  const styles: Record<string, JSX.CSSProperties> = {
    swatches: {
      'margin-right': '-10px',
    },
    swatch: {
      width: '22px',
      height: '22px',
      float: 'left',
      'margin-right': '10px',
      'margin-bottom': '10px',
      'border-radius': '4px',
    },
    clear: {
      clear: 'both',
    },
  }

  return (
    <div style={styles.swatches}>
      <For each={colors}>
        {(c) => (
          <Swatch
            color={c}
            styles={styles.swatch}
            onClick={onClick}
            focusStyle={{
              'box-shadow': `0 0 4px ${c}`,
            }}
          />
        )}
      </For>
      <div style={styles.clear} />
    </div>
  )
}

export default BlockSwatches
