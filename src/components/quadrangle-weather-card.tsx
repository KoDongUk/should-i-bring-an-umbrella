'use client'

import { setWeatherParams } from "@/utils/setWeatherParams";
import { fetchWeather } from "@/lib/apis/fetchWeather";
import { useWeatherStore } from "@/stores/weather-store";
import { useState, useEffect } from "react";

export const QuadRangleWeatherCard = () => {
  const {departureWeather, destinationWeather, setDepartureWeather, setDestinationWeather} = useWeatherStore();
  const [departureMaxPOP, setDepartureMaxPOP] = useState(0);
  const [destinationMaxPOP, setDestinationMaxPOP] = useState(0);
  const [isDepartureRainyDay, setIsDepartureRainyDay] = useState(false);
  const [isDestinationRainyDay, setIsDestinationRainyDay] = useState(false);

  const getDepartureLocationWeather = async (locationParams) => {
    const response: any = await fetchWeather(setWeatherParams(locationParams))
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const processStream = async () => {
      let done, value;
      let response;

      // 스트림을 끝까지 읽을 때까지 반복
      while (true) {
        const result = await reader.read();
        done = result.done;
        value = result.value;
        
        if (done) break;
        
        response += decoder.decode(value, { stream: true });
      }

      return response;
    };

    const result = await processStream();
    const cleanData = JSON.parse(result.replace(/^undefined/, '')).response.body.items.item;
    let weatherInfo = new Array(19).fill(null).map(() => ({
      category: '',
      POP: 0,
      PTY: '',
      SKY: '3',
      TMP: 0
    }));

    cleanData.forEach((item, index) => {
      switch (item.category) {
        case 'SKY':
          weatherInfo[Math.floor((index+1)/12)].SKY = item.fcstValue;
          break;
        case 'POP':
          weatherInfo[Math.floor((index+1)/12)].POP = item.fcstValue;
          break;
        case 'PTY':
          weatherInfo[Math.floor((index+1)/12)].PTY = item.fcstValue;
          break;
        case 'TMP':
          weatherInfo[Math.floor((index+1)/12)].TMP = item.fcstValue;
      }
    })

    return weatherInfo;
  }

  useEffect(() => {
    const departureLocationParams = setWeatherParams(window.localStorage.getItem('departureLocation') ? { nx: 61, ny: 26 } : { nx: 61, ny: 26 });
    const destinationLocationParams = setWeatherParams(window.localStorage.getItem('destinationLocationParams') ? { nx: 61, ny: 26 } : { nx: 61, ny: 26 });

    // 비동기 함수의 결과를 await 처리
    const fetchWeatherData = async () => {
      const departureWeatherTemp = await getDepartureLocationWeather(departureLocationParams);
      setDepartureWeather(departureWeatherTemp);
      
      const destinationWeatherTemp = await getDepartureLocationWeather(destinationLocationParams);
      setDestinationWeather(destinationWeatherTemp);
    };

    fetchWeatherData();  // fetchWeatherData 함수 호출
  }, []);

  useEffect(() => {
    departureWeather.forEach((item) => {
      if (item.PTY >= 1) setIsDepartureRainyDay(true);
      if (item.POP > departureMaxPOP) setDepartureMaxPOP(item.POP);
    })

    destinationWeather.forEach((item) => {
      if (item.PTY >= 1) setIsDestinationRainyDay(true);
      if (item.POP > departureMaxPOP) setDestinationMaxPOP(item.POP);
    })
  }, [departureWeather, destinationWeather])

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-[20vh]">
      <div className="flex items-center justify-center border rounded-lg shadow-lg bg-white">
        <p>{isDepartureRainyDay ? '비' : '비X'} {departureMaxPOP}</p>
      </div>
      <div className="flex items-center justify-center border rounded-lg p-4 shadow-lg bg-white">
        <p>{isDestinationRainyDay ? '비' : '비X'} {departureMaxPOP}</p>
      </div>
    </div>
  )
}