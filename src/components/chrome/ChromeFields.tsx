import { createEffect, createSignal, JSX, mergeProps, Show } from 'solid-js'
import { ChangeColor, HexColor, HslColor, RgbColor } from '../../types'
import * as color from '../../helpers/color'
import { EditableInput, UnfoldMoreHorizontalIcon } from '../_common'

interface Props {
  view?: 'hex' | 'rgb' | 'hsl'
  onChange: (data: ChangeColor, event: Event) => void
  rgb: RgbColor
  hsl: HslColor
  hex: HexColor
  disableAlpha?: boolean
}

export default function ChromeFields(_props: Props) {
  const props = mergeProps({ view: 'hex' }, _props)
  const [view, setView] = createSignal(props.view)

  createEffect(() => {
    if (props.hsl.a !== 1 && view() === 'hex') {
      setView('rgb')
    }
  }, [])

  createEffect(() => {
    if (props.hsl.a !== 1 && view() === 'hex') {
      setView('rgb')
    }
  }, [props])

  function toggleViews() {
    if (view() === 'hex') {
      setView('rgb')
    } else if (view() === 'rgb') {
      setView('hsl')
    } else if (view() === 'hsl') {
      if (props.hsl.a === 1) {
        setView('hex')
      } else {
        setView('rgb')
      }
    }
  }

  function handleChange(data: any, e: Event) {
    if (data.hex) {
      color.isValidHex(data.hex) &&
        props.onChange(
          {
            hex: data.hex,
            source: 'hex',
          },
          e,
        )
    } else if (data.r || data.g || data.b) {
      props.onChange(
        {
          r: data.r || props.rgb.r,
          g: data.g || props.rgb.g,
          b: data.b || props.rgb.b,
          source: 'rgb',
        },
        e,
      )
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0
      } else if (data.a > 1) {
        data.a = 1
      }

      props.onChange(
        {
          h: props.hsl.h,
          s: props.hsl.s,
          l: props.hsl.l,
          a: Math.round(data.a * 100) / 100,
          source: 'rgb',
        },
        e,
      )
    } else if (data.h || data.s || data.l) {
      // Remove any occurances of '%'.
      if (typeof data.s === 'string' && data.s.includes('%')) {
        data.s = data.s.replace('%', '')
      }
      if (typeof data.l === 'string' && data.l.includes('%')) {
        data.l = data.l.replace('%', '')
      }

      // We store HSL as a unit interval so we need to override the 1 input to 0.01
      if (data.s == 1) {
        data.s = 0.01
      } else if (data.l == 1) {
        data.l = 0.01
      }

      props.onChange(
        {
          h: data.h || props.hsl.h,
          s: Number(data.s !== undefined ? data.s : props.hsl.s),
          l: Number(data.l !== undefined ? data.l : props.hsl.l),
          source: 'hsl',
        },
        e,
      )
    }
  }

  function showHighlight(e: MouseEvent) {
    ;(e.currentTarget as HTMLDivElement).style.backgroundColor = '#eee'
  }

  function hideHighlight(e: MouseEvent) {
    ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'
  }
  const styles = () => {
    return {
      wrap: {
        'padding-top': '16px',
        display: 'flex',
      },
      fields: {
        flex: '1',
        display: 'flex',
        'margin-left': '-6px',
      },
      field: {
        'padding-left': '6px',
        width: '100%',
      },
      alpha: {
        'padding-left': '6px',
        width: '100%',
        display: props.disableAlpha ? 'none' : undefined,
      },
      toggle: {
        width: '32px',
        'text-align': 'right',
        position: 'relative',
      },
      icon: {
        'margin-right': '-4px',
        'margin-top': '12px',
        cursor: 'pointer',
        position: 'relative',
      },
      iconHighlight: {
        position: 'absolute',
        width: '24px',
        height: '28px',
        background: '#eee',
        'border-radius': '4px',
        top: '10px',
        left: '12px',
        display: 'none',
      },
      input: {
        'font-size': '11px',
        color: '#333',
        width: '100%',
        'border-radius': '2px',
        border: 'none',
        'box-shadow': 'inset 0 0 0 1px #dadada',
        height: '21px',
        'text-align': 'center',
      },
      label: {
        'text-transform': 'uppercase',
        'font-size': '11px',
        'line-height': '11px',
        color: '#969696',
        'text-align': 'center',
        display: 'block',
        'margin-top': '12px',
      },
      svg: {
        fill: '#333',
        width: '24px',
        height: '24px',
        border: '1px transparent solid',
        'border-radius': '5px',
      },
    } as Record<string, JSX.CSSProperties>
  }

  return (
    <div style={styles().wrap} class="flexbox-fix">
      <Show when={view() == 'hex'}>
        <div style={styles().fields} class="flexbox-fix">
          <div style={styles().field}>
            <EditableInput
              styles={{ input: styles().input, label: styles().label }}
              label="hex"
              value={props.hex}
              onChange={handleChange}
            />
          </div>
        </div>
      </Show>
      <Show when={view() == 'rgb'}>
        <div style={styles().fields} class="flexbox-fix">
          <div style={styles().field}>
            <EditableInput
              styles={{ input: styles().input, label: styles().label }}
              label="r"
              value={props.rgb.r}
              onChange={handleChange}
            />
          </div>
          <div style={styles().field}>
            <EditableInput
              styles={{ input: styles().input, label: styles().label }}
              label="g"
              value={props.rgb.g}
              onChange={handleChange}
            />
          </div>
          <div style={styles().field}>
            <EditableInput
              styles={{ input: styles().input, label: styles().label }}
              label="b"
              value={props.rgb.b}
              onChange={handleChange}
            />
          </div>
          <div style={styles().alpha}>
            <EditableInput
              styles={{ input: styles().input, label: styles().label }}
              label="a"
              value={props.rgb.a}
              arrowOffset={0.01}
              onChange={handleChange}
            />
          </div>
        </div>
      </Show>
      <Show when={view() == 'hsl'}>
        <div style={styles().fields} class="flexbox-fix">
          <div style={styles().field}>
            <EditableInput
              styles={{ input: styles().input, label: styles().label }}
              label="h"
              value={Math.round(props.hsl.h)}
              onChange={handleChange}
            />
          </div>
          <div style={styles().field}>
            <EditableInput
              styles={{ input: styles().input, label: styles().label }}
              label="s"
              value={`${Math.round(props.hsl.s * 100)}%`}
              onChange={handleChange}
            />
          </div>
          <div style={styles().field}>
            <EditableInput
              styles={{ input: styles().input, label: styles().label }}
              label="l"
              value={`${Math.round(props.hsl.l * 100)}%`}
              onChange={handleChange}
            />
          </div>
          <div style={styles().alpha}>
            <EditableInput
              styles={{ input: styles().input, label: styles().label }}
              label="a"
              value={props.hsl.a}
              arrowOffset={0.01}
              onChange={handleChange}
            />
          </div>
        </div>
      </Show>
      <div style={styles().toggle}>
        <div style={styles().icon} onClick={toggleViews}>
          <UnfoldMoreHorizontalIcon
            width="24"
            height="24"
            onMouseOver={showHighlight}
            onMouseEnter={showHighlight}
            onMouseOut={hideHighlight}
          />
        </div>
      </div>
    </div>
  )
}
