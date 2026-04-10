import React, { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#6366F1', light: '#818CF8', dark: '#4F46E5' },
          secondary: { main: '#06B6D4' },
          background: { default: '#F1F5F9', paper: '#FFFFFF' },
          text: { primary: '#0F172A', secondary: '#64748B' },
          divider: 'rgba(15,23,42,0.08)',
          success: { main: '#10B981' },
          warning: { main: '#F59E0B' },
          error: { main: '#EF4444' },
          info: { main: '#06B6D4' },
          accent: { main: '#6366F1', glow: 'rgba(99,102,241,0.25)' },
        }
      : {
          primary: { main: '#818CF8', light: '#A5B4FC', dark: '#6366F1' },
          secondary: { main: '#22D3EE' },
          background: { default: '#0A0F1E', paper: '#111827' },
          text: { primary: '#F1F5F9', secondary: '#94A3B8' },
          divider: 'rgba(241,245,249,0.06)',
          success: { main: '#34D399' },
          warning: { main: '#FBBF24' },
          error: { main: '#F87171' },
          info: { main: '#22D3EE' },
          accent: { main: '#818CF8', glow: 'rgba(129,140,248,0.3)' },
        }),
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    subtitle1: { fontWeight: 500 },
    body1: { fontSize: '0.9375rem' },
    body2: { fontSize: '0.8125rem' },
    button: { fontWeight: 600, letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '8px 18px',
          transition: 'all 0.2s ease',
          '&:hover': { transform: 'translateY(-1px)' },
          '&:active': { transform: 'translateY(0)' },
        }),
        contained: ({ theme }) => ({
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          boxShadow: `0 4px 14px ${theme.palette.accent.glow}`,
          '&:hover': {
            boxShadow: `0 6px 20px ${theme.palette.accent.glow}`,
          },
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.palette.divider,
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: `${theme.palette.primary.main}10`,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16,
          border: `1px solid ${theme.palette.divider}`,
          backgroundImage: 'none',
          boxShadow: mode === 'dark'
            ? '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)'
            : '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)',
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          border: 'none',
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? '#0D1117' : '#FFFFFF',
        }),
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiTableCell-head': {
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: theme.palette.text.secondary,
            backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          },
          '& .MuiTableCell-body': {
            borderBottom: `1px solid ${theme.palette.divider}`,
            fontSize: '0.875rem',
          },
        }),
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            fontSize: '0.875rem',
            '& fieldset': { borderColor: theme.palette.divider },
            '&:hover fieldset': { borderColor: theme.palette.primary.main },
            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { borderRadius: 10, fontSize: '0.875rem' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.75rem', borderRadius: 8 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 20,
          border: `1px solid ${theme.palette.divider}`,
          backgroundImage: 'none',
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: theme.palette.primary.main,
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: theme.palette.primary.main,
          },
        }),
      },
    },
  },
});

export const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'dark',
});

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
      mode,
    }),
    [mode],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      {children(theme)}
    </ThemeContext.Provider>
  );
};
