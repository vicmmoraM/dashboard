import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

interface HeaderUIProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

export default function HeaderUI({ toggleTheme, isDarkMode }: HeaderUIProps) {
    const theme = useTheme();

    return (
        <Box sx={{
            textAlign: 'center',
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            position: 'relative'
        }}>
            <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                <IconButton
                    onClick={toggleTheme}
                    sx={{
                        color: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark'
                                ? 'rgba(144, 202, 249, 0.08)'
                                : 'rgba(2, 136, 209, 0.08)',
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease'
                    }}
                    title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                    {isDarkMode ? <Brightness7Icon sx={{ fontSize: 28 }} /> : <Brightness4Icon sx={{ fontSize: 28 }} />}
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <WbSunnyIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
                <Typography
                    variant='h3'
                    component='h1'
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        letterSpacing: '-0.5px'
                    }}>
                    Dashboard del Clima
                </Typography>
            </Box>
            <Typography
                variant='body1'
                sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.95rem'
                }}>
                Datos en tiempo real de Open-Meteo API
            </Typography>
        </Box>
    )
}