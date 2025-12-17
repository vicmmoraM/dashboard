import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { useTheme } from '@mui/material/styles';

interface WeatherInsightsUIProps {
    temperature: number;
    apparentTemperature: number;
    windSpeed: number;
    humidity: number;
    city: string;
}

interface Recommendation {
    category: string;
    text: string;
    severity?: 'info' | 'warning' | 'success';
    icon?: React.ReactNode;
}

export default function WeatherInsightsUI(props: WeatherInsightsUIProps) {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    useEffect(() => {
        generateInsights();
    }, [props.temperature, props.apparentTemperature, props.windSpeed, props.humidity, props.city]);

    const generateInsights = () => {
        const { temperature, apparentTemperature, windSpeed, humidity } = props;

        let recs: Recommendation[] = [];

        // Recomendaciones de vestimenta
        if (temperature >= 28) {
            recs.push({
                category: 'Vestimenta',
                text: 'Ropa muy ligera de colores claros y tejidos transpirables como algodón o lino. Protección solar recomendada.',
                severity: 'warning',
                icon: <CheckroomIcon />
            });
        } else if (temperature >= 22) {
            recs.push({
                category: 'Vestimenta',
                text: 'Ropa ligera ideal. Camiseta o camisa de manga corta. Considera chaqueta ligera para la noche.',
                severity: 'success',
                icon: <CheckroomIcon />
            });
        } else if (temperature >= 15) {
            recs.push({
                category: 'Vestimenta',
                text: 'Temperatura fresca. Manga larga, pantalones largos y suéter o chaqueta ligera recomendados.',
                severity: 'info',
                icon: <CheckroomIcon />
            });
        } else if (temperature >= 10) {
            recs.push({
                category: 'Vestimenta',
                text: 'Clima frío. Abrigo, suéter, bufanda y posiblemente guantes. Vestirse en capas es recomendable.',
                severity: 'warning',
                icon: <CheckroomIcon />
            });
        } else {
            recs.push({
                category: 'Vestimenta',
                text: 'Temperatura muy baja. Abrigo grueso, gorro, bufanda, guantes y ropa térmica son esenciales.',
                severity: 'warning',
                icon: <CheckroomIcon />
            });
        }

        // Condiciones de viento
        if (windSpeed > 30) {
            recs.push({
                category: 'Viento',
                text: 'Viento muy fuerte. Se recomienda evitar actividades al aire libre. Use ropa ajustada y protección ocular.',
                severity: 'warning',
                icon: <AirIcon />
            });
        } else if (windSpeed > 20) {
            recs.push({
                category: 'Viento',
                text: 'Viento moderado. Chaqueta cortavientos recomendada. Asegure objetos sueltos.',
                severity: 'info',
                icon: <AirIcon />
            });
        } else if (windSpeed > 10) {
            recs.push({
                category: 'Viento',
                text: 'Brisa ligera. Condiciones agradables para actividades al aire libre con protección ligera contra el viento.',
                severity: 'success',
                icon: <AirIcon />
            });
        }

        // Condiciones de humedad
        if (humidity > 80) {
            recs.push({
                category: 'Humedad',
                text: 'Humedad muy alta con posibilidad de precipitaciones. Paraguas y ropa impermeable recomendados. Manténgase hidratado.',
                severity: 'warning',
                icon: <WaterDropIcon />
            });
        } else if (humidity > 60) {
            recs.push({
                category: 'Humedad',
                text: 'Ambiente húmedo. La sensación térmica puede ser mayor. Ropa transpirable recomendada.',
                severity: 'info',
                icon: <WaterDropIcon />
            });
        } else if (humidity < 30) {
            recs.push({
                category: 'Humedad',
                text: 'Aire muy seco. Use crema hidratante, bálsamo labial y aumente la ingesta de agua.',
                severity: 'info',
                icon: <WaterDropIcon />
            });
        }

        // Actividades sugeridas
        if (temperature >= 20 && temperature <= 28 && windSpeed < 20) {
            recs.push({
                category: 'Actividades',
                text: 'Condiciones óptimas para actividades al aire libre: caminatas, ciclismo, deportes o picnic.',
                severity: 'success',
                icon: <DirectionsRunIcon />
            });
        } else if (temperature > 28) {
            recs.push({
                category: 'Actividades',
                text: 'Temperatura elevada. Ideal para actividades acuáticas. Evite ejercicio intenso durante las horas de mayor calor.',
                severity: 'info',
                icon: <DirectionsRunIcon />
            });
        } else if (temperature < 15) {
            recs.push({
                category: 'Actividades',
                text: 'Clima frío. Actividades bajo techo recomendadas: museos, cafeterías, centros comerciales.',
                severity: 'info',
                icon: <DirectionsRunIcon />
            });
        }

        // Alertas de salud
        if (temperature > 30 || (temperature > 25 && humidity > 70)) {
            recs.push({
                category: 'Salud',
                text: 'Riesgo de estrés térmico. Manténgase hidratado, busque sombra y evite esfuerzos físicos intensos.',
                severity: 'warning',
                icon: <HealthAndSafetyIcon />
            });
        } else if (temperature < 10) {
            recs.push({
                category: 'Salud',
                text: 'Protección contra el frío necesaria. Cubra extremidades, manténgase activo y consuma bebidas calientes.',
                severity: 'warning',
                icon: <HealthAndSafetyIcon />
            });
        }

        // Sensación térmica
        const tempDiff = Math.abs(temperature - apparentTemperature);
        if (tempDiff > 3) {
            if (apparentTemperature > temperature) {
                recs.push({
                    category: 'Sensación Térmica',
                    text: `La sensación térmica (${apparentTemperature.toFixed(1)}°C) es mayor que la temperatura real debido a la humedad.`,
                    severity: 'info',
                    icon: <ThermostatIcon />
                });
            } else {
                recs.push({
                    category: 'Sensación Térmica',
                    text: `La sensación térmica (${apparentTemperature.toFixed(1)}°C) es menor que la temperatura real debido al viento.`,
                    severity: 'info',
                    icon: <ThermostatIcon />
                });
            }
        }

        setRecommendations(recs);
    };

    const getSeverityColor = (severity?: string) => {
        switch (severity) {
            case 'warning': return isDarkMode ? '#ffa726' : '#fb8c00';
            case 'success': return isDarkMode ? '#66bb6a' : '#43a047';
            default: return isDarkMode ? '#42a5f5' : '#1e88e5';
        }
    };

    const getSeverityBg = (severity?: string) => {
        switch (severity) {
            case 'warning': return isDarkMode ? 'rgba(255, 167, 38, 0.15)' : 'rgba(251, 140, 0, 0.15)';
            case 'success': return isDarkMode ? 'rgba(102, 187, 106, 0.15)' : 'rgba(67, 160, 71, 0.15)';
            default: return isDarkMode ? 'rgba(66, 165, 245, 0.15)' : 'rgba(30, 136, 229, 0.15)';
        }
    };

    return (
        <Card sx={{
            background: isDarkMode
                ? 'linear-gradient(135deg, #1a237e 0%, #283593 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: isDarkMode
                ? '0 8px 32px rgba(0,0,0,0.6)'
                : '0 12px 40px rgba(102, 126, 234, 0.3)',
            borderRadius: '16px',
            overflow: 'hidden'
        }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 4,
                    pb: 3,
                    borderBottom: '2px solid rgba(255, 255, 255, 0.2)'
                }}>
                    <Box sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <AutoAwesomeIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, letterSpacing: '-0.5px' }}>
                            Recomendaciones Inteligentes
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.95, fontSize: '0.9rem' }}>
                            Análisis automático del clima en {props.city}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 2.5
                }}>
                    {recommendations.map((rec, index) => (
                        <Box
                            key={index}
                            sx={{
                                backgroundColor: getSeverityBg(rec.severity),
                                borderRadius: '12px',
                                p: 2.5,
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${getSeverityColor(rec.severity)}30`,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 8px 20px ${getSeverityColor(rec.severity)}40`,
                                    backgroundColor: isDarkMode
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'rgba(255, 255, 255, 0.25)',
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                <Box sx={{
                                    color: getSeverityColor(rec.severity),
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '20px'
                                }}>
                                    {rec.icon}
                                </Box>
                                <Chip
                                    label={rec.category}
                                    size="small"
                                    sx={{
                                        backgroundColor: getSeverityColor(rec.severity),
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        height: '24px'
                                    }}
                                />
                            </Box>
                            <Typography sx={{
                                lineHeight: 1.6,
                                fontSize: '0.9rem',
                                color: 'white',
                                opacity: 0.95
                            }}>
                                {rec.text}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}