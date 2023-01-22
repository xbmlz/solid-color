import { merge } from 'lodash-es'
import { createEffect, createSignal, For, JSX, mergeProps } from 'solid-js'
import { Color } from '../../types'
import { Raised, useColorPicker, withColorPicker } from '../_common'
import SwatchesGroup from './SwatchesGroup'

export type SwatchesPickerProps = {
  width?: string | number
  height?: string | number
  className?: string
  styles?: Record<string, JSX.CSSProperties>
  colors?: string[][]
}

export function Swatches(_props: SwatchesPickerProps) {
  const props = mergeProps(
    {
      width: 320,
      height: 240,
      colors: [
        ['#B71C1C', '#D32F2F', '#F44336', '#E57373', '#FFCDD2'],
        ['#880E4F', '#C2185B', '#E91E63', '#F06292', '#F8BBD0'],
        ['#4A148C', '#7B1FA2', '#9C27B0', '#BA68C8', '#E1BEE7'],
        ['#311B92', '#512DA8', '#673AB7', '#9575CD', '#D1C4E9'],
        ['#1A237E', '#303F9F', '#3F51B5', '#7986CB', '#C5CAE9'],
        ['#0D47A1', '#1976D2', '#2196F3', '#64B5F6', '#BBDEFB'],
        ['#01579B', '#0288D1', '#03A9F4', '#4FC3F7', '#B3E5FC'],
        ['#006064', '#0097A7', '#00BCD4', '#4DD0E1', '#B2EBF2'],
        ['#004D40', '#00796B', '#009688', '#4DB6AC', '#B2DFDB'],
        ['#1B5E20', '#388E3C', '#4CAF50', '#81C784', '#C8E6C9'],
        ['#33691E', '#689F38', '#8BC34A', '#AED581', '#DCEDC8'],
        ['#827717', '#AFB42B', '#CDDC39', '#DCE775', '#F0F4C3'],
        ['#F57F17', '#FBC02D', '#FFEB3B', '#FFF176', '#FFF9C4'],
        ['#FF6F00', '#FFA000', '#FFC107', '#FFD54F', '#FFECB3'],
        ['#E65100', '#F57C00', '#FF9800', '#FFB74D', '#FFE0B2'],
        ['#BF360C', '#E64A19', '#FF5722', '#FF8A65', '#FFCCBC'],
        ['#3E2723', '#5D4037', '#795548', '#A1887F', '#D7CCC8'],
        ['#263238', '#455A64', '#607D8B', '#90A4AE', '#CFD8DC'],
        ['#000000', '#525252', '#969696', '#D9D9D9', '#FFFFFF'],
      ],
      styles: {},
      className: '',
    },
    _props,
  )
  const { colors: currentColors, changeColor } = useColorPicker()

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    const width = typeof props.width === 'number' ? `${props.width}px` : props.width
    const height = typeof props.height === 'number' ? `${props.height}px` : props.height
    setStyles(
      merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
        {
          picker: {
            width,
            height,
          },
          overflow: {
            height,
            'overflow-y': 'scroll',
          },
          body: {
            padding: '16px 0 6px 16px',
          },
          clear: {
            clear: 'both',
          },
        },
        props.styles,
      ),
    )
  })

  const handleChange = (data: Color, e: Event) =>
    changeColor({ hex: data as string, source: 'hex' }, e)

  return (
    <div style={styles().picker} class={`swatches-picker ${props.className}`}>
      <Raised>
        <div style={styles().overflow}>
          <div style={styles().body}>
            <For each={props.colors}>
              {(group) => (
                <SwatchesGroup group={group} active={currentColors().hex} onClick={handleChange} />
              )}
            </For>
            <div style={styles().clear} />
          </div>
        </div>
      </Raised>
    </div>
  )
}

export default withColorPicker(Swatches)
