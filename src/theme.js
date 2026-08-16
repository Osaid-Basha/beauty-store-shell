import { createTheme } from '@mui/material/styles'

export const tokens = Object.freeze({
  primary: '#4f378a',
  primaryContainer: '#6750a4',
  primaryFixed: '#e9ddff',
  secondary: '#625b71',
  secondaryContainer: '#e8def9',
  background: '#fdf8fd',
  surface: '#ffffff',
  surfaceLow: '#f7f2f8',
  surfaceContainer: '#f1ecf2',
  surfaceHigh: '#ebe7ec',
  surfaceHighest: '#e5e1e7',
  onSurface: '#1c1b1f',
  onSurfaceVariant: '#494551',
  outline: '#7a7582',
  outlineVariant: '#cbc4d2',
  error: '#ba1a1a',
  success: '#2e7d32',
})

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: tokens.primary,
      dark: '#3b286b',
      light: tokens.primaryFixed,
    },
    secondary: {
      main: tokens.secondary,
      light: tokens.secondaryContainer,
    },
    background: {
      default: tokens.background,
      paper: tokens.surface,
    },
    text: {
      primary: tokens.onSurface,
      secondary: tokens.onSurfaceVariant,
    },
    divider: tokens.outlineVariant,
    error: { main: tokens.error },
    success: { main: tokens.success },
  },
  shape: { borderRadius: 12 },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1536 },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: { fontSize: '2rem', lineHeight: 1.25, fontWeight: 500 },
    h2: { fontSize: '1.25rem', lineHeight: 1.35, fontWeight: 600 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 20 },
        sizeLarge: { minHeight: 48 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: 999 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: tokens.background },
        '::selection': { backgroundColor: tokens.primaryFixed },
        ':focus-visible': {
          outline: '3px solid #9d86d8',
          outlineOffset: 2,
        },
      },
    },
  },
})

export default theme

