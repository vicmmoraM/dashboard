import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { useTheme, alpha } from '@mui/material/styles';

interface IndicatorUIProps {
    title?: string;
    description?: string;
    type?: 'temperature' | 'apparent' | 'wind' | 'humidity';
}

const getIconAndColor = (type?: string, isDarkMode?: boolean) => {
    switch (type) {
        case 'temperature':
            return {
                icon: <ThermostatIcon sx={{ fontSize: 40 }} />,
                color: '#ff6b6b',
            };
        case 'apparent':
            return {
                icon: <DeviceThermostatIcon sx={{ fontSize: 40 }} />,
                color: '#ff8787',
            };
        case 'wind':
            return {
                icon: <AirIcon sx={{ fontSize: 40 }} />,
                color: '#4ecdc4',
            };
        case 'humidity':
            return {
                icon: <WaterDropIcon sx={{ fontSize: 40 }} />,
                color: '#45b7d1',
            };
        default:
            return {
                icon: <ThermostatIcon sx={{ fontSize: 40 }} />,
                color: '#0288d1',
            };
    }
};

export default function IndicatorUI(props: IndicatorUIProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const { icon, color } = getIconAndColor(props.type, isDarkMode);

    return (
        <Card
            sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isDarkMode ? '0 8px 24px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.12)'
                }
            }}
        >
            <CardContent sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                p: 3
            }}>
                <Box sx={{
                    color: color,
                    backgroundColor: alpha(color, isDarkMode ? 0.2 : 0.1),
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </Box>
                <Typography
                    variant="h4"
                    component="div"
                    sx={{
                        fontWeight: 700,
                        color: 'text.primary'
                    }}
                >
                    {props.description}
                </Typography>
                <Typography
                    variant="body2"
                    component="p"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        textAlign: 'center'
                    }}
                >
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    )
}