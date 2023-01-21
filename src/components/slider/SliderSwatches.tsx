import { JSX, mergeProps } from 'solid-js'
import { HslColor } from '../../types'
import SliderSwatch from './SliderSwatch'

interface Props {
  onClick: any
  hsl: HslColor
}

export default function SliderSwatches(_props: Props) {
  const props = mergeProps({}, _props)
  const styles: Record<string, JSX.CSSProperties> = {
    swatches: {
      'margin-top': '20px',
    },
    swatch: {
      'box-sizing': 'border-box',
      width: '20%',
      'padding-right': '1px',
      float: 'left',
    },
    clear: {
      clear: 'both',
    },
  }

  // Acceptible difference in floating point equality
  const epsilon = 0.1

  return (
    <div style={styles.swatches}>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={props.hsl}
          offset={0.8}
          active={Math.abs(props.hsl.l - 0.8) < epsilon && Math.abs(props.hsl.s - 0.5) < epsilon}
          onClick={props.onClick}
          first
        />
      </div>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={props.hsl}
          offset={0.65}
          active={Math.abs(props.hsl.l - 0.65) < epsilon && Math.abs(props.hsl.s - 0.5) < epsilon}
          onClick={props.onClick}
        />
      </div>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={props.hsl}
          offset={0.5}
          active={Math.abs(props.hsl.l - 0.5) < epsilon && Math.abs(props.hsl.s - 0.5) < epsilon}
          onClick={props.onClick}
        />
      </div>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={props.hsl}
          offset={0.35}
          active={Math.abs(props.hsl.l - 0.35) < epsilon && Math.abs(props.hsl.s - 0.5) < epsilon}
          onClick={props.onClick}
        />
      </div>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={props.hsl}
          offset={0.2}
          active={Math.abs(props.hsl.l - 0.2) < epsilon && Math.abs(props.hsl.s - 0.5) < epsilon}
          onClick={props.onClick}
          last
        />
      </div>
      <div style={styles.clear} />
    </div>
  )
}
