import Typography from 'typography'
import '../fonts/fonts.css'

export const fonts = {
  thin: 'Inter Thin',
  // thinItalic: 'Inter Thin Italic',
  light: 'Inter Light',
  // lightItalic: 'Inter Light Italic',
  regular: 'Inter Regular',
  // regularItalic: 'Inter Regular Italic',
  // medium: 'Inter Medium',
  // mediumItalic: 'Inter Medium Italic',
  semibold: 'Inter Semibold',
  // semiboldItalic: 'Inter Semibold Italic',
  bold: 'Inter Bold',
  // boldItalic: 'Inter Bold Italic',
}

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.55,
  headerLineHeight: 1.4,
  headerFontFamily: [fonts.light, 'sans-serif'],
  bodyFontFamily: [fonts.regular, 'sans-serif'],
  headerColor: 'hsla(0,0%,0%,0.9)',
  bodyColor: 'hsla(0,0%,0%,0.8)',

  overrideStyles: ({rhythm}) => ({
    h1: {
      color: 'hsla(0,0%,0%,0.75)',
      fontFamily: fonts.light,
    },
    h2: {
      color: 'hsla(0,0%,0%,0.775)',
      fontFamily: fonts.semibold,
    },
    h3: {
      color: 'hsla(0,0%,0%,0.8)',
    },
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1,
    },
    'h1,h2,h3,h4': {
      lineHeight: 1.25,
      marginTop: rhythm(1),
      marginBottom: rhythm(1 / 2),
    },
    strong: {
      fontFamily: fonts.bold,
      fontStyle: 'bold',
    },
    small: {
      fontFamily: fonts.light,
      color: 'hsla(0,0%,0%,0.75)',
    }
  }),
})
// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
