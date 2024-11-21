type props = {
  serviceKey?: string; // 서비스 키
  pageNo: number; // 페이지 번호
  numOfRows: number; // 한 페이지 결과 수
  dataType: 'JSON' | 'XML'; // 응답 데이터 타입
  base_date: string; // 예보 기준 날짜 (YYYYMMDD 형식)
  base_time: string; // 예보 기준 시간 (HHMM 형식)
  nx: number; // 격자 x 좌표
  ny: number; // 격자 y 좌표
}

export const fetchWeather = async (props: props) => {
  const path = 'getVilageFcst';
  const params = { ...props, 'serviceKey': process.env.NEXT_PUBLIC_WEATHER_SERVICE_KEY ? decodeURIComponent(process.env.NEXT_PUBLIC_WEATHER_SERVICE_KEY) : '' };

  const stringParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL as string}/${path}?${new URLSearchParams(stringParams).toString()}`, {
  }).catch((err) => {
    console.log(err);
  });

  return response;
}