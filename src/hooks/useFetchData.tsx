import { useState, useEffect } from "react";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

export default function useFetchData(): OpenMeteoResponse {
    const  URL = "https://api.open-meteo.com/v1/forecast?latitude=-2.17&longitude=-79.92&current=temperature_2m,apparent_temperature,windspeed_10m,relativehumidity_2m"
    const [data, setData] = useState<OpenMeteoResponse>({
        latitude: 0,
        longitude: 0,
        generationtime_ms: 0,
        utc_offset_seconds: 0,
        timezone: "",
        timezone_abbreviation: "",
        elevation: 0,
        current_units: {
            time: "",
            interval: "",
            temperature_2m: "",
            apparent_temperature: "",
            windspeed_10m: "",
            relativehumidity_2m: "",
        },
        current: {
            time: "",
            interval: 0,
            temperature_2m: 0,
            apparent_temperature: 0,
            windspeed_10m: 0,
            relativehumidity_2m: 0,
        },
    });

    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then((json: OpenMeteoResponse) => setData(json))
            .catch(err => console.error("Error al obtener datos:", err));
    }, []);// El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return data;
}
