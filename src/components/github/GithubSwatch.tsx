import { createSignal, JSX, mergeProps } from 'solid-js'
import { HexColor } from '../../types'
import { Swatch } from '../_common'

interface Props {
  hover?: boolean
  color: string
  onClick?: (newColor: HexColor, event: Event) => void
}

export function GithubSwatch(_props: Props) {
  const props = mergeProps({}, _props)
  const hoverSwatch: JSX.CSSProperties = {
    position: 'relative',
    'z-index': 2,
    outline: '2px solid #fff',
    'box-shadow': '0 0 5px 2px rgba(0,0,0,0.25)',
  }

  const [hover, setHover] = createSignal(false)

  const styles = () => {
    return {
      swatch: {
        width: '25px',
        height: '25px',
        'font-size': '0',
        ...(hover() ? hoverSwatch : {}),
      },
    } as Record<string, JSX.CSSProperties>
  }

  return (
    <div onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <div style={styles().swatch}>
        <Swatch color={props.color} onClick={props.onClick} focusStyle={hoverSwatch} />
      </div>
    </div>
  )
}

export default GithubSwatch
