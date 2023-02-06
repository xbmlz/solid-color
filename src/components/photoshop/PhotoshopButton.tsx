import { JSX, mergeProps } from 'solid-js'

interface Props {
  onClick?: () => void
  label?: string
  children?: JSX.Element
  active?: boolean
}

export default function PhotoshopButton(_props: Props) {
  const props = mergeProps({}, _props)
  const styles = () => {
    return {
      button: {
        'background-image': 'linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%)',
        border: '1px solid #878787',
        'border-radius': '2px',
        height: '20px',
        'box-shadow': props.active ? '0 0 0 1px #878787' : '0 1px 0 0 #EAEAEA',
        'font-size': '14px',
        color: '#000',
        'line-height': '20px',
        'text-align': 'center',
        'margin-bottom': '10px',
        cursor: 'pointer',
      },
    } as Record<string, JSX.CSSProperties>
  }
  return (
    <div style={styles().button} onClick={props.onClick}>
      {props.label || props.children}
    </div>
  )
}
