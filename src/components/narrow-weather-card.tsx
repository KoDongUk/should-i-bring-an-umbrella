'use client'

import { useWeatherStore } from "@/stores/weather-store";

export const NarrowWeatherCard = () => {
  const {departureWeather, destinationWeather} = useWeatherStore();

  return (
    <div className="grid grid-cols-3 pl-4 pr-4 gap-x-0 gap-y-4">
      <div>
        {departureWeather.map((item, index) => (
          <div key={index} className="flex items-center justify-center h-[5vh] border rounded-l-lg shadow-lg bg-white mb-4">
            {index+6}시
          </div>
        ))}
      </div>
      <div>
        {departureWeather.map((item, index) => (
          <div key={index} className="flex items-center justify-center h-[5vh] border shadow-lg bg-white mb-4">
            {item.PTY} {item.POP}
          </div>
        ))}
      </div>
      <div>
      {destinationWeather.map((item, index) => (
          <div key={index} className="flex items-center justify-center h-[5vh] border rounded-r-lg shadow-lg bg-white mb-4">
            {item.PTY} {item.POP}
          </div>
        ))}
      </div>
    </div>
  );
}