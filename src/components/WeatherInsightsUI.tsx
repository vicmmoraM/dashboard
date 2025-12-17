import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
}

export default function WeatherInsightsUI(props: WeatherInsightsUIProps) {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

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
                severity: 'warning'
            });
        } else if (temperature >= 22) {
            recs.push({
                category: 'Vestimenta',
                text: 'Ropa ligera ideal. Camiseta o camisa de manga corta. Considera chaqueta ligera para la noche.',
                severity: 'success'
            });
        } else if (temperature >= 15) {
            recs.push({
                category: 'Vestimenta',
                text: 'Temperatura fresca. Manga larga, pantalones largos y suéter o chaqueta ligera recomendados.',
                severity: 'info'
            });
        } else if (temperature >= 10) {
            recs.push({
                category: 'Vestimenta',
                text: 'Clima frío. Abrigo, suéter, bufanda y posiblemente guantes. Vestirse en capas es recomendable.',
                severity: 'warning'
            });
        } else {
            recs.push({
                category: 'Vestimenta',
                text: 'Temperatura muy baja. Abrigo grueso, gorro, bufanda, guantes y ropa térmica son esenciales.',
                severity: 'warning'
            });
        }

        // Condiciones de viento
        if (windSpeed > 30) {
            recs.push({
                category: 'Viento',
                text: 'Viento muy fuerte. Se recomienda evitar actividades al aire libre. Use ropa ajustada y protección ocular.',
                severity: 'warning'
            });
        } else if (windSpeed > 20) {
            recs.push({
                category: 'Viento',
                text: 'Viento moderado. Chaqueta cortavientos recomendada. Asegure objetos sueltos.',
                severity: 'info'
            });
        } else if (windSpeed > 10) {
            recs.push({
                category: 'Viento',
                text: 'Brisa ligera. Condiciones agradables para actividades al aire libre con protección ligera contra el viento.',
                severity: 'success'
            });
        }

        // Condiciones de humedad
        if (humidity > 80) {
            recs.push({
                category: 'Humedad',
                text: 'Humedad muy alta con posibilidad de precipitaciones. Paraguas y ropa impermeable recomendados. Manténgase hidratado.',
                severity: 'warning'
            });
        } else if (humidity > 60) {
            recs.push({
                category: 'Humedad',
                text: 'Ambiente húmedo. La sensación térmica puede ser mayor. Ropa transpirable recomendada.',
                severity: 'info'
            });
        } else if (humidity < 30) {
            recs.push({
                category: 'Humedad',
                text: 'Aire muy seco. Use crema hidratante, bálsamo labial y aumente la ingesta de agua.',
                severity: 'info'
            });
        }

        // Actividades sugeridas
        if (temperature >= 20 && temperature <= 28 && windSpeed < 20) {
            recs.push({
                category: 'Actividades',
                text: 'Condiciones óptimas para actividades al aire libre: caminatas, ciclismo, deportes o picnic.',
                severity: 'success'
            });
        } else if (temperature > 28) {
            recs.push({
                category: 'Actividades',
                text: 'Temperatura elevada. Ideal para actividades acuáticas. Evite ejercicio intenso durante las horas de mayor calor.',
                severity: 'info'
            });
        } else if (temperature < 15) {
            recs.push({
                category: 'Actividades',
                text: 'Clima frío. Actividades bajo techo recomendadas: museos, cafeterías, centros comerciales.',
                severity: 'info'
            });
        }

        // Alertas de salud
        if (temperature > 30 || (temperature > 25 && humidity > 70)) {
            recs.push({
                category: 'Salud',
                text: 'Riesgo de estrés térmico. Manténgase hidratado, busque sombra y evite esfuerzos físicos intensos.',
                severity: 'warning'
            });
        } else if (temperature < 10) {
            recs.push({
                category: 'Salud',
                text: 'Protección contra el frío necesaria. Cubra extremidades, manténgase activo y consuma bebidas calientes.',
                severity: 'warning'
            });
        }

        // Sensación térmica
        const tempDiff = Math.abs(temperature - apparentTemperature);
        if (tempDiff > 3) {
            if (apparentTemperature > temperature) {
                recs.push({
                    category: 'Sensación Térmica',
                    text: `La sensación térmica (${apparentTemperature.toFixed(1)}°C) es mayor que la temperatura real debido a la humedad.`,
                    severity: 'info'
                });
            } else {
                recs.push({
                    category: 'Sensación Térmica',
                    text: `La sensación térmica (${apparentTemperature.toFixed(1)}°C) es menor que la temperatura real debido al viento.`,
                    severity: 'info'
                });
            }
        }

        setRecommendations(recs);
    };

    const getSeverityColor = (severity?: string) => {
        switch (severity) {
            case 'warning': return '#ff9800';
            case 'success': return '#4caf50';
            default: return '#2196f3';
        }
    };

    return (
        <Card sx={{
            background: 'linear-gradient(135deg, #0288d1 0%, #0277bd 100%)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <AutoAwesomeIcon sx={{ fontSize: 36 }} />
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                            Recomendaciones Inteligentes
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Análisis automático del clima en {props.city}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recommendations.map((rec, index) => (
                        <Box key={index}>
                            <Box sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                borderRadius: 2,
                                p: 2.5,
                                backdropFilter: 'blur(10px)',
                                borderLeft: `4px solid ${getSeverityColor(rec.severity)}`
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                    <Chip
                                        label={rec.category}
                                        size="small"
                                        sx={{
                                            backgroundColor: getSeverityColor(rec.severity),
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.75rem'
                                        }}
                                    />
                                </Box>
                                <Typography sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}>
                                    {rec.text}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}
