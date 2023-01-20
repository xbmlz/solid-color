import { createEffect, createSignal, JSX, mergeProps } from 'solid-js'
import Checkboard from './Checkboard'
import { useColorPicker } from './ColorPicker'

const ENTER = 13

export type SwatchProps = {
  color: string
  styles?: JSX.CSSProperties
  onClick: any
  title?: string
  children?: JSX.Element
  focused?: boolean
  focusStyle?: JSX.CSSProperties
}

export const Swatch = (_props: SwatchProps) => {
  const props = mergeProps(
    {
      onClick: () => {},
      title: _props.color,
      focusStyle: {},
    },
    _props,
  )
  const { onSwatchHover } = useColorPicker()

  const transparent = props.color === 'transparent'
  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})
  const [focused, setFocused] = createSignal(false)
  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)
  const handleClick = (e: Event) => {
    props.onClick(props.color, e)
    handleFocus()
  }
  const handleKeyDown = (e: KeyboardEvent) => e.keyCode === ENTER && props.onClick(props.color, e)

  createEffect(() => {
    setStyles({
      swatch: {
        background: props.color,
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
        ...props.styles,
        ...(focused() ? props.focusStyle : {}),
      },
    })
  })

  return (
    <div
      style={styles().swatch}
      onClick={handleClick}
      title={props.title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onMouseOver={(event) => {
        onSwatchHover && onSwatchHover(props.color, event)
      }}
    >
      {props.children}
      {transparent && (
        <Checkboard
          borderRadius={styles().swatch.borderRadius}
          boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
        />
      )}
    </div>
  )
}

export default Swatch
