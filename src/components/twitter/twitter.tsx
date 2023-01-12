import { merge } from 'lodash-es'
import { For, JSX } from 'solid-js'
import { useColorContext, withColorProvider } from '../../context/useColor'
import * as color from "../../helpers/color";
import Swatch from '../_common/swatch'

export interface TwitterPickerProps {
  width?: string | number
  triangle?: 'hide' | 'top-left' | 'top-right'
  colors?: string[]
  styles?: JSX.CSSProperties
  className?: string
}

export function Twitter({
  colors = [
    '#FF6900',
    '#FCB900',
    '#7BDCB5',
    '#00D084',
    '#8ED1FC',
    '#0693E3',
    '#ABB8C3',
    '#EB144C',
    '#F78DA7',
    '#9900EF',
  ],
  width = 276,
  triangle = 'top-left',
  styles: passedStyles = {},
  className = '',
}: TwitterPickerProps) {
  // useColorContext()
  // console.log(colorContext)
  // const [colors: currentColors, {colors}] = useColor()
  // const { hex } = currentColors

  const styles = merge<Record<string, JSX.CSSProperties>, Record<string, JSX.CSSProperties>>(
    {
      card: {
        width,
        background: '#fff',
        border: '0 solid rgba(0,0,0,0.25)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        borderRadius: '4px',
        position: 'relative',
      },
      body: {
        padding: '15px 9px 9px 15px',
      },
      label: {
        fontSize: '18px',
        color: '#fff',
      },
      triangle: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent #fff transparent',
        position: 'absolute',
        display: triangle === 'hide' ? 'none' : undefined,
        top: triangle === 'top-left' || triangle === 'top-right' ? '-10px' : undefined,
        left: triangle === 'top-left' || triangle === 'top-right' ? '12px' : undefined,
      },
      triangleShadow: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent rgba(0,0,0,.1) transparent',
        position: 'absolute',
        display: triangle === 'hide' ? 'none' : undefined,
        top: triangle === 'top-left' || triangle === 'top-right' ? '-11px' : undefined,
        left: triangle === 'top-left' || triangle === 'top-right' ? '12px' : undefined,
      },
      hash: {
        background: '#F0F0F0',
        height: '30px',
        width: '30px',
        borderRadius: '4px 0 0 4px',
        float: 'left',
        color: '#98A1A4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      input: {
        width: '100px',
        fontSize: '14px',
        color: '#666',
        border: '0px',
        outline: 'none',
        height: '28px',
        boxShadow: 'inset 0 0 0 1px #F0F0F0',
        boxSizing: 'content-box',
        borderRadius: '0 4px 4px 0',
        float: 'left',
        paddingLeft: '8px',
      },
      swatch: {
        width: '30px',
        height: '30px',
        float: 'left',
        borderRadius: '4px',
        margin: '0 6px 6px 0',
      },
      clear: {
        clear: 'both',
      },
    },
    passedStyles,
  )

  // const handleChange = (hexcode: string, e: MouseEvent) => {
  //   color.isValidHex(hexcode) &&
  //     changeColor(
  //       {
  //         hex: hexcode,
  //         source: 'hex',
  //       },
  //       e,
  //     )
  // }

  return (
    <div style={styles.card} class={`twitter-picker ${className}`}>
      <div style={styles.triangleShadow} />
      <div style={styles.triangle} />
      <div style={styles.body}>
        {/* <For each={colors}>
          {(c, i) => (
            <Swatch
              color={c}
              style={styles.swatch}
              onClick={handleChange}
              focusStyle={{
                boxShadow: `0 0 4px ${c}`,
              }}
            />
          )}
        </For> */}
        <div style={styles.hash}>#</div>

        <div style={styles.clear} />
      </div>
    </div>
  )
}

export default withColorProvider(Twitter)
