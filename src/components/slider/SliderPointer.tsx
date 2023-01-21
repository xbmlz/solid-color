import { JSX } from 'solid-js'

export default function SliderPointer() {
  const styles: Record<string, JSX.CSSProperties> = {
    picker: {
      width: '14px',
      height: '14px',
      'border-radius': '6px',
      transform: 'translate(-7px, -1px)',
      'background-color': 'rgb(248, 248, 248)',
      'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
    },
  }

  return <div style={styles.picker} />
}
