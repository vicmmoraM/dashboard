export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  apparent_temperature: string
  windspeed_10m: string
  relativehumidity_2m: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  apparent_temperature: number
  windspeed_10m: number
  relativehumidity_2m: number
}