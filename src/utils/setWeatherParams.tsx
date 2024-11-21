import { DateTime } from "luxon"

type props = {
  nx: number,
  ny: number,
}

export const setWeatherParams = ({ nx, ny }: props) => {
  const params = {
    serviceKey: process.env.NEXT_PUBLIC_WEATHER_SERVICE_KEY,
    nx,
    ny,
    base_date: DateTime.now().toFormat('yyyyMMdd'),
    base_time: "0500",
    pageNo: 1,
    numOfRows: 229,
    dataType: 'JSON',
  } as const;

  return params;
}