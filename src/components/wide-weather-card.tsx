'use client'

import { useState, useEffect, Fragment } from "react";
import { useWeatherStore } from "@/stores/weather-store";

export const WideWeatherCard = () => {
  const {departureWeather, destinationWeather} = useWeatherStore();
  const [isRainyDay, setIsRainyDay] = useState(false);

  useEffect(() => {
    if (departureWeather.some((item) => parseInt(item.PTY) >= 1) || destinationWeather.some((item) => parseInt(item.PTY) >= 1)) {
      setIsRainyDay(true);
    }
  }, [departureWeather, destinationWeather])

  return (
    <div className="gap-4 px-4 pt-4">
      <div className="flex h-[10vh] items-center justify-center border-2 rounded-lg p-4 shadow-lg text-white">
        {isRainyDay ?
          <div><p>오늘은 우산을 챙기셔야 할 것 같아요.</p></div> :
          <div><p>오늘은 우산을 챙길 필요가 없으실 것 같아요.</p></div>
        }
      </div>
    </div>
  );
}