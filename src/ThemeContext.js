import React, { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#007bff',
          },
          secondary: {
            main: '#6c757d',
          },
          background: {
            default: '#f8f9fa',
            paper: '#ffffff',
          },
          accent: {
            main: '#28a745',
            glow: 'rgba(40, 167, 69, 0.5)',
          },
          text: {
            primary: '#212529',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#00bcd4',
          },
          secondary: {
            main: '#ff5722',
          },
          background: {
            default: '#1a202c',
            paper: '#2d3748',
          },
          accent: {
            main: '#00e676',
            glow: 'rgba(0, 230, 118, 0.5)',
          },
          text: {
            primary: '#ffffff',
          },
        }),
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export const ThemeContext = createContext({
  toggleColorMode: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      {children(theme)}
    </ThemeContext.Provider>
  );
};
