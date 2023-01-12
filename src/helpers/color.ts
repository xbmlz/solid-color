import { each } from 'lodash-es'
import tinycolor from 'tinycolor2'

export const simpleCheckForValidColor = (data: any) => {
  const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v']
  let checked = 0
  let passed = 0
  each(keysToCheck, (letter) => {
    if (data[letter]) {
      checked += 1
      if (!Number.isNaN(data[letter])) {
        passed += 1
      }
      if (letter === 's' || letter === 'l') {
        const percentPatt = /^\d+%$/
        if (percentPatt.test(data[letter])) {
          passed += 1
        }
      }
    }
  })
  return checked === passed ? data : false
}

export const toState = (data: any, oldHue: number) => {
  const color = data.hex ? tinycolor(data.hex) : tinycolor(data)
  const hsl = color.toHsl()
  const hsv = color.toHsv()
  const rgb = color.toRgb()
  const hex = color.toHex()
  if (hsl.s === 0) {
    hsl.h = oldHue || 0
    hsv.h = oldHue || 0
  }
  const transparent = hex === '000000' && rgb.a === 0

  return {
    hsl,
    hex: transparent ? 'transparent' : `#${hex}`,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
  }
}

export const isValidHex = (hex: string) => {
  if (hex === 'transparent') {
    return true
  }
  // disable hex4 and hex8
  const lh = String(hex).charAt(0) === '#' ? 1 : 0
  return hex.length !== 4 + lh && hex.length < 7 + lh && tinycolor(hex).isValid()
}
