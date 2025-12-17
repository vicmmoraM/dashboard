import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
   data?: OpenMeteoResponse;
}

export default function ChartUI({ data }: ChartUIProps) {
   // Si no hay datos, mostrar valores por defecto o vacíos
   if (!data || !data.hourly) {
      return (
         <>
            <Typography variant="h5" component="div">
               Gráfico de datos meteorológicos
            </Typography>
            <Typography variant="body2" color="text.secondary">
               No hay datos disponibles
            </Typography>
         </>
      );
   }

   // Limitar a las primeras 24 horas para mejor visualización
   const hoursToShow = 24;
   const temperatureData = data.hourly.temperature_2m.slice(0, hoursToShow);
   const windData = data.hourly.wind_speed_10m.slice(0, hoursToShow);

   // Formatear las etiquetas de tiempo (mostrar solo la hora)
   const timeLabels = data.hourly.time.slice(0, hoursToShow).map(timeStr => {
      const date = new Date(timeStr);
      return `${date.getHours()}:00`;
   });

   return (
      <>
         <Typography
            variant="h5"
            component="div"
            sx={{
               mb: 2,
               fontWeight: 600,
               color: 'secondary.main'
            }}
         >
            Pronóstico de las próximas 24 horas
         </Typography>
         <LineChart
            height={400}
            series={[
               {
                  data: temperatureData,
                  label: `Temperatura (${data.hourly_units.temperature_2m})`,
                  color: '#ff8a65',
                  curve: 'natural'
               },
               {
                  data: windData,
                  label: `Viento (${data.hourly_units.wind_speed_10m})`,
                  color: '#4dd0e1',
                  curve: 'natural'
               },
            ]}
            xAxis={[{ scaleType: 'point', data: timeLabels }]}
            sx={{
               '& .MuiLineElement-root': {
                  strokeWidth: 3
               }
            }}
         />
      </>
   );
}