export type HexColor = string

export interface HslColor {
  h: number
  l: number
  s: number
  a?: number
}

export interface HsvColor {
  h: number
  s: number
  v: number
  a?: number
}

export interface RgbColor {
  r: number
  g: number
  b: number
  a?: number
}

export type Color = HexColor | HslColor | HsvColor | RgbColor

export interface ColorResult {
  hex: HexColor
  hsl: HslColor
  hsv: HsvColor
  rgb: RgbColor
  oldHue: number
}

export type ChangeColor =
  | HslColor
  | HsvColor
  | (RgbColor & { source?: string })
  | { hex: HexColor; source: string }
  | HexColor
