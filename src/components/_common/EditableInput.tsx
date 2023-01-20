import { createEffect, createSignal, JSX, mergeProps, Show } from 'solid-js'

export interface EditableInputProps {
  label?: string
  hideLabel?: boolean
  placeholder?: string
  arrowOffset?: number
  styles: Record<string, JSX.CSSProperties>
  value?: string | number
  onChange?: (value: any, e: Event) => void
}

interface EditableInputState {
  value: string
  blurValue: string
  borderColor?: string
}

export function EditableInput(_props: EditableInputProps) {
  const props = mergeProps(
    {
      arrowOffset: 1,
      hideLabel: false,
    },
    _props,
  )

  let inputRef: HTMLInputElement

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  const inputId = `sc-editable-input-${Math.random().toString().slice(2, 5)}`

  const [state, setState] = createSignal<EditableInputState>({
    value: String(props.value).toUpperCase(),
    blurValue: String(props.value).toUpperCase(),
  })

  const DEFAULT_ARROW_OFFSET = 1
  const UP_KEY_CODE = 38
  const DOWN_KEY_CODE = 40
  const VALID_KEY_CODES = [UP_KEY_CODE, DOWN_KEY_CODE]
  const isValidKeyCode = (keyCode: number) => VALID_KEY_CODES.indexOf(keyCode) > -1
  const getNumberValue = (value: string) => Number(String(value).replace(/%/g, ''))

  const getValueObjectWithLabel = (value: string) => {
    return {
      [props.label!]: value,
    }
  }

  const setUpdatedValue = (value: any, e: Event) => {
    const onChangeValue = props.label ? getValueObjectWithLabel(value) : value
    props.onChange && props.onChange(onChangeValue, e)
    setState({ value, blurValue: value })
  }

  const handleBlur = () => {
    if (state().blurValue) {
      setState({ value: state().blurValue, blurValue: '' })
    }
  }

  const handleChange = (e: Event) => {
    setUpdatedValue((e.target as HTMLInputElement).value, e)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const value = getNumberValue((e.target as HTMLInputElement).value)
    if (!isNaN(value) && isValidKeyCode(e.keyCode)) {
      const offset = props.arrowOffset || DEFAULT_ARROW_OFFSET
      const updatedValue = e.keyCode === UP_KEY_CODE ? value + offset : value - offset
      setUpdatedValue(updatedValue, e)
    }
  }

  createEffect(() => {
    setState({
      value: String(props.value).toUpperCase(),
      blurValue: '',
    })
    // update input styles
    setStyles({
      wrap: {
        position: 'relative',
      },
      input: props.styles && props.styles.input ? props.styles.input : {},
      label: props.styles && props.styles.label ? props.styles.label : {},
    })
  })

  return (
    <div style={styles().wrap}>
      <input
        id={inputId}
        ref={inputRef!}
        style={styles().input}
        spellcheck={false}
        value={state().value}
        placeholder={props.placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onInput={handleChange}
      />
      <Show when={props.label && !props.hideLabel}>
        <label style={styles().label}>{props.label}</label>
      </Show>
    </div>
  )
}
