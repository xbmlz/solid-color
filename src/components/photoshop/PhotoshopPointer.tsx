import { JSX } from 'solid-js'

export default function PhotoshopPointerCircle() {
  const triangleStyles: JSX.CSSProperties = {
    width: 0,
    height: 0,
    'border-style': 'solid',
    'border-width': '4px 0 4px 6px',
    'border-color': 'transparent transparent transparent #fff',
    position: 'absolute',
    top: '1px',
    left: '1px',
  }

  const triangleBorderStyles: JSX.CSSProperties = {
    width: 0,
    height: 0,
    'border-style': 'solid',
    'border-width': '5px 0 5px 8px',
    'border-color': 'transparent transparent transparent #555',
  }

  const styles: Record<string, JSX.CSSProperties> = {
    left: {
      ...triangleBorderStyles,
      transform: 'translate(-13px, -4px)',
    },
    leftInside: {
      ...triangleStyles,
      transform: 'translate(-8px, -5px)',
    },

    right: {
      ...triangleBorderStyles,
      transform: 'translate(20px, -14px) rotate(180deg)',
    },
    rightInside: {
      ...triangleStyles,
      transform: 'translate(-8px, -5px)',
    },
  }

  return (
    <div style={styles.pointer}>
      <div style={styles.left}>
        <div style={styles.leftInside} />
      </div>

      <div style={styles.right}>
        <div style={styles.rightInside} />
      </div>
    </div>
  )
}
