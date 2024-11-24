'use client'

import { setWeatherParams } from "@/utils/setWeatherParams";
import { fetchWeather } from "@/lib/apis/fetchWeather";
import { useWeatherStore } from "@/stores/weather-store";
import { cityDetailInfo } from "@/constants/city-info";
import { useState, useEffect } from "react";

import { LocationSelectPopup } from "@/components/location-select-popup";

export const QuadRangleWeatherCard = () => {
  const {departureWeather, destinationWeather, setDepartureWeather, setDestinationWeather} = useWeatherStore();
  const [departureMaxPOP, setDepartureMaxPOP] = useState(0);
  const [destinationMaxPOP, setDestinationMaxPOP] = useState(0);
  const [isDepartureRainyDay, setIsDepartureRainyDay] = useState(false);
  const [isDestinationRainyDay, setIsDestinationRainyDay] = useState(false);
  const [departureCityInfo, setDepartureCityInfo] = useState({
    city: cityDetailInfo[0].city,
    cityDetail: cityDetailInfo[0].data[0].cityDetail,
    nx: cityDetailInfo[0].data[0].nx,
    ny: cityDetailInfo[0].data[0].ny,
  })
  const [destinationCityInfo, setDestinationCityInfo] = useState({
    city: cityDetailInfo[0].city,
    cityDetail: cityDetailInfo[0].data[0].cityDetail,
    nx: cityDetailInfo[0].data[0].nx,
    ny: cityDetailInfo[0].data[0].ny,
  })
  const [isVisibleLocationSelectPopup, setIsVisibleLocationSelectPopup] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<'출발지'|'도착지'>('출발지');

  const getDepartureLocationWeather = async (locationParams: {nx: number, ny: number}) => {
    const response: any = await fetchWeather(setWeatherParams(locationParams))
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const processStream = async () => {
      let done, value;
      let response;

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

  const onClickChangeLocation = (target: 'departureLocation' | 'destinationLocation') => {
    setIsVisibleLocationSelectPopup(true);
    setSelectedTarget(target === 'departureLocation' ? '출발지' : '도착지');
  }

  const onCloseLocationSelectPopup = () => {
    setIsVisibleLocationSelectPopup(false);
  }

  const handleLocationSelectSubmit = ({city, cityDetail, target}: {city: string, cityDetail: string, target: '출발지'|'도착지'}) => {
    const cityIndex = cityDetailInfo.findIndex(item => item.city === city);
    const cityDetailIndex = cityDetailInfo[cityIndex].data.findIndex(item => item.cityDetail === cityDetail);

    const changedCityInfo = {
      city: cityDetailInfo[cityIndex].city,
      cityDetail: cityDetailInfo[cityIndex].data[cityDetailIndex].cityDetail,
      nx: cityDetailInfo[cityIndex].data[cityDetailIndex].nx,
      ny: cityDetailInfo[cityIndex].data[cityDetailIndex].ny,
    };

    target === '출발지' ? setDepartureCityInfo(changedCityInfo) : setDestinationCityInfo(changedCityInfo);
  }

  useEffect(() => {
    const departureLocationParams =
      setWeatherParams({nx: departureCityInfo.nx, ny: departureCityInfo.ny});

    const fetchWeatherData = async () => {
      const departureWeatherTemp = await getDepartureLocationWeather(departureLocationParams);
      setDepartureWeather(departureWeatherTemp);
    };

    fetchWeatherData();
  }, [departureCityInfo]);

  useEffect(() => {
    const destinationLocationParams =
      setWeatherParams({nx: destinationCityInfo.nx, ny: destinationCityInfo.ny});

    const fetchWeatherData = async () => {
      const destinationWeatherTemp = await getDepartureLocationWeather(destinationLocationParams);
      setDestinationWeather(destinationWeatherTemp);
    };

    fetchWeatherData();
  }, [destinationCityInfo]);

  useEffect(() => {
    setDepartureMaxPOP(0);

    departureWeather.forEach((item) => {
      if (item.PTY >= 1) setIsDepartureRainyDay(true);
      if (item.POP > departureMaxPOP) setDepartureMaxPOP(item.POP);
    })
  }, [departureWeather]);

  useEffect(() => {
    let tempMaxPOP = 0;

    destinationWeather.forEach((item) => {
      if (item.PTY >= 1) setIsDestinationRainyDay(true);
      if (item.POP > tempMaxPOP) tempMaxPOP = item.POP;
    })

    setDestinationMaxPOP(tempMaxPOP);

  }, [destinationWeather]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-[20vh]">
      <div
        className="flex flex-col items-center justify-center border rounded-lg shadow-lg bg-white"
        onClick={() => onClickChangeLocation('departureLocation')}
      >
        <p>{departureCityInfo.city} {departureCityInfo.cityDetail}</p>
        <p>{isDepartureRainyDay ? '비' : '비X'} {departureMaxPOP}</p>
      </div>
      <div
        className="flex flex-col items-center justify-center border rounded-lg p-4 shadow-lg bg-white"
        onClick={() => onClickChangeLocation('destinationLocation')}
      >
        <p>{destinationCityInfo.city} {destinationCityInfo.cityDetail}</p>
        <p>{isDestinationRainyDay ? '비' : '비X'} {destinationMaxPOP}</p>
      </div>

      {
        isVisibleLocationSelectPopup &&
        <LocationSelectPopup
          isVisible={isVisibleLocationSelectPopup}
          onClose={onCloseLocationSelectPopup}
          onSubmit={handleLocationSelectSubmit}
          target={selectedTarget}
          city={selectedTarget === '출발지' ? (departureCityInfo.city || '서울특별시') : (destinationCityInfo.city || '서울특별시')}
          cityDetail={selectedTarget === '출발지' ? (departureCityInfo.cityDetail || '강남구') : (destinationCityInfo.cityDetail || '강남구')}
        />
      }
    </div>
  )
}