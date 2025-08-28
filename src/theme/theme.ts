// DailyClimb theme configuration

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // Electric blue
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#10b981', // Emerald for success states
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff'
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#000000'
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff'
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff'
    },
    background: {
      default: '#0f172a', // Slate-900
      paper: '#1e293b' // Slate-800
    },
    text: {
      primary: '#f8fafc', // Slate-50
      secondary: '#94a3b8', // Slate-400
      disabled: '#64748b' // Slate-500
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    common: {
      black: '#000000',
      white: '#ffffff'
    },
    divider: '#334155' // Slate-700
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.025em'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.025em'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.4
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: '#94a3b8'
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  ]
});

export default theme;