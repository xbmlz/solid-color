import { Component, createSignal } from 'solid-js'

export const withFocus =
  <P extends object>(Component: Component<P>) =>
  (props: P) => {

    const [state, setState] = createSignal({ focus: false })
    const handleFocus = () => setState({ focus: true })
    const handleBlur = () => setState({ focus: false })

    return (
      <span onFocus={handleFocus} onBlur={handleBlur}>
        <Component {...props} {...state} />
      </span>
    )
  }
