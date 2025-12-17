//import { useState } from 'react'
import { Grid, CircularProgress, Alert, Button, Box, ThemeProvider, CssBaseline } from '@mui/material';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import WeatherInsightsUI from './components/WeatherInsightsUI';
import { useState } from 'react';
import { lightTheme, darkTheme } from './theme';

function App() {
  //const [count, setCount] = useState(0)

  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  // Inicializar como null para que el usuario deba seleccionar una ciudad primero
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Estado para el modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Comunique la opción seleccionada al hook useFetchData
  const { data, loading, error } = useFetchData(selectedOption);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Grid container spacing={5} justifyContent="center" alignItems="center">

        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}>
          <HeaderUI toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </Grid>

        {/* Selector de ciudad - Centrado */}
        <Grid size={{ xs: 12, md: 12 }} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{ width: { xs: '100%', sm: '400px', md: '350px' } }}>
            <SelectorUI onOptionSelect={setSelectedOption} />
          </Box>
        </Grid>

        {/* INDICADOR DE CARGA */}
        {loading && (
          <Grid size={{ xs: 12, md: 12 }}>
            <Alert
              severity="info"
              icon={<CircularProgress size={20} />}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Cargando datos meteorológicos...
            </Alert>
          </Grid>
        )}

        {/* INDICADOR DE ERROR */}
        {error && (
          <Grid size={{ xs: 12, md: 12 }}>
            <Alert
              severity="error"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => window.location.reload()}
                >
                  Reintentar
                </Button>
              }
            >
              <strong>Error al cargar los datos:</strong> {error}
            </Alert>
          </Grid>
        )}

        {/* CONTENIDO PRINCIPAL */}
        {!loading && !error && (
          <>
            {/* Alertas - Solo si hay ciudad seleccionada */}
            {selectedOption && data && (
              <Grid size={{ xs: 12, md: 12 }}>
                <AlertUI description={`${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} — Los datos se actualizan automáticamente al cambiar de ciudad.`} />
              </Grid>
            )}

            {/* Indicadores */}
            <Grid container size={{ xs: 12, md: 12 }} spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <IndicatorUI
                  title='Temperatura Actual'
                  description={data ? `${data.current.temperature_2m} ${data.current_units.temperature_2m}` : '-- °C'}
                  type='temperature'
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <IndicatorUI
                  title='Sensación Térmica'
                  description={data ? `${data.current.apparent_temperature} ${data.current_units.apparent_temperature}` : '-- °C'}
                  type='apparent'
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <IndicatorUI
                  title='Velocidad del Viento'
                  description={data ? `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}` : '-- km/h'}
                  type='wind'
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <IndicatorUI
                  title='Humedad Relativa'
                  description={data ? `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}` : '-- %'}
                  type='humidity'
                />
              </Grid>
            </Grid>

            {/* Gráfico y Tabla - Solo si hay ciudad seleccionada */}
            {selectedOption && data ? (
              <>
                <Grid size={{ xs: 12, md: 6 }}><ChartUI data={data} /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TableUI data={data} /></Grid>
              </>
            ) : (
              <Grid size={{ xs: 12, md: 12 }}>
                <Box sx={{
                  textAlign: 'center',
                  py: 8,
                  px: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: 2,
                  border: '2px dashed #90caf9'
                }}>
                  <Box component="span" sx={{ fontSize: '48px', display: 'block', mb: 2 }}>📍</Box>
                  <Box component="h5" sx={{ color: '#0277bd', mb: 1, fontWeight: 600, fontSize: '1.5rem', margin: '0 0 8px 0' }}>
                    Selecciona una ciudad
                  </Box>
                  <Box component="p" sx={{ color: '#546e7a', margin: 0 }}>
                    Elige una ciudad del selector para ver el pronóstico detallado y gráficos
                  </Box>
                </Box>
              </Grid>
            )}
          </>
        )}

        {/* Estado cuando no hay datos disponibles (opcional) */}
        {!loading && !error && !data && !selectedOption && (
          <Grid size={{ xs: 12, md: 12 }}>
            <Alert severity="info">
              Selecciona una ciudad para ver los datos meteorológicos
            </Alert>
          </Grid>
        )}

        {/* Información adicional - Recomendaciones IA */}
        {selectedOption && data && (
          <Grid size={{ xs: 12, md: 12 }}>
            <WeatherInsightsUI
              temperature={data.current.temperature_2m}
              apparentTemperature={data.current.apparent_temperature}
              windSpeed={data.current.wind_speed_10m}
              humidity={data.current.relative_humidity_2m}
              city={selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
            />
          </Grid>
        )}

      </Grid>
    </ThemeProvider>
  )
}

export default App