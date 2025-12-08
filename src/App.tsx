//import { useState } from 'react'
import { Grid, CircularProgress, Alert, Button } from '@mui/material';
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

function App() {
  //const [count, setCount] = useState(0)
  
  const { data, loading, error } = useFetchData();

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

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

      {/* CONTENIDO PRINCIPAL - Solo se muestra si hay datos y no hay error ni carga */}
      {!loading && !error && data && (
        <>
          {/* Alertas */}
          <Grid size={{ xs: 12, md: 12 }}>
            <AlertUI description='No se prevee lluvias' />
          </Grid>

          {/* Selector */}
          <Grid size={{ xs: 12, md: 3 }}>
            <SelectorUI />
          </Grid>

          {/* Indicadores */}
          <Grid container size={{ xs: 12, md: 9 }} spacing={2}>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura (2m)'
                description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              {/* IndicatorUI con la Temperatura aparente en °C */}
              <IndicatorUI
                title='Temperatura aparente'
                description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              {/* IndicatorUI con la Velocidad del viento en km/h */}
              <IndicatorUI
                title='Velocidad del viento'
                description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              {/* IndicatorUI con la Humedad relativa en % */}
              <IndicatorUI
                title='Humedad relativa'
                description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
              />
            </Grid>

          </Grid>

          {/* Gráfico */}
          <Grid size={{ xs: 12, md: 6 }}><ChartUI data={data} /></Grid>

          {/* Tabla */}
          <Grid size={{ xs: 12, md: 6 }}><TableUI data={data} /></Grid>
          {/* Información adicional */}
          <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
        </>
      )}

      {/* Estado cuando no hay datos disponibles (opcional) */}
      {!loading && !error && !data && (
        <Grid size={{ xs: 12, md: 12 }}>
          <Alert severity="warning">
            No hay datos meteorológicos disponibles
          </Alert>
        </Grid>
      )}

    </Grid>
  )
}

export default App