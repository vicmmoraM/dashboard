import { useEffect, useState } from "react";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

export default function useFetchData() {
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1894&longitude=-79.8889&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
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
    }, [] );

    return {data, loading, error};

}