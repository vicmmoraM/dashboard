import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0288d1',
        },
        secondary: {
            main: '#0277bd',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#546e7a',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#81d4fa',
        },
        background: {
            default: '#0a1929',
            paper: '#1a2027',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#1a2027',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});