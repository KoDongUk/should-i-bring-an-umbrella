import { create } from 'zustand';

export const useWeatherStore = create((set) => ({
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