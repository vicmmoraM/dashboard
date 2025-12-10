import { useEffect, useState } from "react";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

// Estrategia para convertir la opción seleccionada en un objeto
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'guayaquil': { latitude: -2.1894, longitude: -79.8889 },
  'quito': { latitude: -0.1807, longitude: -78.4678 },
  'manta': { latitude: -0.9677, longitude: -80.7088 },
  'cuenca': { latitude: -2.9001, longitude: -79.0059 }
};

// Tipo del prop: string | null
export default function useFetchData(selectedOption: string | null = null){
    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Parametrice la opción seleccionada en la URL del requerimiento asíncrono
                const cityConfig = selectedOption != null ? CITY_COORDS[selectedOption] : CITY_COORDS["guayaquil"];
                const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm&timezone=America%2FChicago`;
                
                const response = await fetch(URL);
                const json = await response.json();
                setData(json);
            } catch (error) {
                setError(String(error))
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedOption]); // El efecto secundario depende de la opción seleccionada

    return {data, loading, error};

}