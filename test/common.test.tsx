import { describe, it, expect } from 'vitest'
import { render } from '@solidjs/testing-library'
import { Alpha } from '../src/components/_common'
import { red } from '../src/helpers/color'
import '@testing-library/jest-dom'

describe('<Alpha />', () => {
  it('should render correctly', () => {
    const { container } = render(() => <Alpha {...red} />)
    expect(container).toMatchSnapshot()
  })
})
