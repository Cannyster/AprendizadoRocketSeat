import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  space,
  fonts,
} from '@ignite-ui/tokens'
import { createStitches, defaultThemeMap } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  // adicionando space como opções para height e width
  themeMap: {
    ...defaultThemeMap,
    height: 'space',
    width: 'space',
  },
  // definindo quais tokens cada uma dessas opções podera usar
  theme: {
    colors: colors,
    fontSizes: fontSizes,
    fontWeights: fontWeights,
    fonts: fonts,
    lineHeights: lineHeights,
    radii: radii,
    space: space,
  },
})
