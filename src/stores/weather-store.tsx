import { create } from 'zustand';

type WeatherState = {
  departureWeather: WeatherData[],
  destinationWeather: WeatherData[],
  setDepartureWeather: (newWeatherData: WeatherData[]) => void
  setDestinationWeather: (newWeatherData: WeatherData[]) => void
}

type WeatherData = {
  category: string,
  POP: number,
  PTY: string,
  SKY: string,
  TMP: number,
}

export const useWeatherStore = create<WeatherState>((set) => ({
  departureWeather: new Array(19).fill(null).map(() => ({
    category: '',
    POP: 0,
    PTY: '',
    SKY: '',
    TMP: 0
  })),

  destinationWeather: new Array(19).fill(null).map(() => ({
    category: '',
    POP: 0,
    PTY: '',
    SKY: '',
    TMP: 0
  })),

  setDepartureWeather: (newWeatherData) => set(() => ({
    departureWeather: newWeatherData
  })),
  
  setDestinationWeather: (newWeatherData) => set(() => ({
    destinationWeather: newWeatherData
  }))
}))