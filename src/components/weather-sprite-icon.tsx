import Image from "next/image";
import { imgInfo } from "@/constants/img-info";

type props = {
  imgName: string,
}


export const WeatherSpriteIcon = ({imgName}: props) => {
  if (!imgInfo.hasOwnProperty(imgName)) return null;

  //TODO: define imgName Type detail
  const {x, y} = imgInfo[imgName];

  return (
    <div
      style={{
        width: "20px", // 원하는 아이콘 크기 설정
        height: "20px",
        overflow: "hidden", // 스프라이트 외부 영역 숨김
        position: "relative", // 자식 요소의 위치 지정에 필요
      }}
    >
      <Image
        src="/images/weather_icon.png"
        alt="weather"
        width={1925} // 스프라이트 이미지 전체 너비
        height={1737} // 스프라이트 이미지 전체 높이
        style={{
          objectFit: "none", // 이미지 크기 조정 방지
          objectPosition: `${-x}px ${-y}px`, // 스프라이트 좌표 이동
        }}
      />
    </div>
  )
}