import { merge } from 'lodash-es'
import { For, JSX, mergeProps } from 'solid-js'
import * as color from '../../helpers/color'
import { Raised, useColorPicker, withColorPicker } from '../_common'
import CompactColor from './CompactColor'
import CompactFields from './CompactFields'

export type CompactPickerProps = {
  colors?: string[]
  styles?: Record<string, JSX.CSSProperties>
  className?: string
}

export function Compact(_props: CompactPickerProps) {
  const props = mergeProps(
    {
      colors: [
        '#4D4D4D',
        '#999999',
        '#FFFFFF',
        '#F44E3B',
        '#FE9200',
        '#FCDC00',
        '#DBDF00',
        '#A4DD00',
        '#68CCCA',
        '#73D8FF',
        '#AEA1FF',
        '#FDA1FF',
        '#333333',
        '#808080',
        '#cccccc',
        '#D33115',
        '#E27300',
        '#FCC400',
        '#B0BC00',
        '#68BC00',
        '#16A5A5',
        '#009CE0',
        '#7B64FF',
        '#FA28FF',
        '#000000',
        '#666666',
        '#B3B3B3',
        '#9F0500',
        '#C45100',
        '#FB9E00',
        '#808900',
        '#194D33',
        '#0C797D',
        '#0062B1',
        '#653294',
        '#AB149E',
      ],
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors: currentColors, changeColor } = useColorPicker()

  const styles = merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
    {
      Compact: {
        background: '#f6f6f6',
        'border-radius': '4px',
      },
      compact: {
        'padding-top': '5px',
        'padding-left': '5px',
        'box-sizing': 'initial',
        width: '240px',
      },
      clear: {
        clear: 'both',
      },
    },
    props.styles,
  )

  const handleChange = (data: any, e: Event) => {
    if (data.hex) {
      color.isValidHex(data.hex) &&
        changeColor(
          {
            hex: data.hex,
            source: 'hex',
          },
          e,
        )
    } else {
      changeColor(data, e)
    }
  }

  return (
    <Raised styles={props.styles}>
      <div style={styles.compact} class={`compact-picker ${props.className}`}>
        <div>
          <For each={props.colors}>
            {(c) => (
              <CompactColor
                color={c}
                active={c.toLowerCase() === currentColors().hex}
                onClick={handleChange}
              />
            )}
          </For>
          <div style={styles.clear} />
        </div>
        <CompactFields
          hex={currentColors().hex}
          rgb={currentColors().rgb}
          onChange={handleChange}
        />
      </div>
    </Raised>
  )
}

export default withColorPicker(Compact)
