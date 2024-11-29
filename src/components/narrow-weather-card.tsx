'use client'

import { useWeatherStore } from "@/stores/weather-store";
import { WeatherSpriteIcon } from "./weather-sprite-icon";

export const NarrowWeatherCard = () => {
  const {departureWeather, destinationWeather} = useWeatherStore();

  const getWeather = (PTY: string) => {
    switch(PTY) {
      case '0':
        return 'sunny';
      case '2':
        return 'rainySnow';
      case '3':
        return 'snow';
      default:
        return 'rainy'
    }
  }

  return (
    <div className="grid grid-cols-3 pl-4 pr-4 gap-x-0 gap-y-4 text-white">
      <div>
        {departureWeather.map((item, index) => (
          <div key={index} className="flex items-center justify-center h-[5vh] rounded-l-lg shadow-lg mb-4">
            {index+6}시
          </div>
        ))}
      </div>
      <div>
        {departureWeather.map((item, index) => (
          <div key={index} className="flex items-center justify-center h-[5vh] shadow-lg mb-4">
            <WeatherSpriteIcon imgName={`${getWeather(item.PTY)}${index <= 13 ? 'Day' : 'Night'}`} />
            <p className="text-sm">{item.TMP}°C / {item.POP}%</p>
          </div>
        ))}
      </div>
      <div>
      {destinationWeather.map((item, index) => (
          <div key={index} className="flex items-center justify-center h-[5vh] rounded-r-lg shadow-lg mb-4">
            <WeatherSpriteIcon imgName={`${getWeather(item.PTY)}${index <= 13 ? 'Day' : 'Night'}`} />
            <p className="text-sm">{item.TMP}°C / {item.POP}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}