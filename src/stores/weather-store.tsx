import { create } from 'zustand';

export const useWeaherStore = create((set) => ({
  currentWeather: 'sunny',
  departureWeather: Array(24).fill('sunny'),
  destinationWeather: Array(24).fill('sunny'),
}))