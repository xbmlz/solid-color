import { JSX } from 'solid-js'
// import { useColorContext } from '../../context/useColor'
import Checkboard from './checkboard'
import { withFocus } from './interaction'

const ENTER = 13

export type SwatchProps = {
  color: string
  style?: JSX.CSSProperties
  onClick: any
  title?: string
  children?: JSX.Element
  focus?: any
  focusStyle?: JSX.CSSProperties
}

export function Swatch({
  color,
  style,
  onClick = () => {},
  title = color,
  children,
  focus,
  focusStyle = {},
}: SwatchProps) {
  // const { onSwatchHover } = useColor()
  const transparent = color === 'transparent'
  const styles: Record<string, JSX.CSSProperties> = {
    swatch: {
      background: color,
      height: '100%',
      width: '100%',
      cursor: 'pointer',
      position: 'relative',
      outline: 'none',
      ...style,
      ...(focus ? focusStyle : {}),
    },
  }

  const handleClick = (e: MouseEvent) => onClick(color, e)
  const handleKeyDown = (e: KeyboardEvent) => e.keyCode === ENTER && onClick(color, e)

  return (
    <div
      style={styles.swatch}
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      // onMouseOver={(event) => {
      //   onSwatchHover && onSwatchHover(color, event)
      // }}
    >
      {children}
      {transparent && (
        <Checkboard
          borderRadius={styles.swatch.borderRadius}
          boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
        />
      )}
    </div>
  )
}

export default withFocus(Swatch)
