import Image from "next/image";
import { imgInfo } from "@/constants/img-info";

type props = {
  imgName: 'sunnyDay' | 'sunnyNight' | 'rainyDay' | 'rainyNight' | 'snowDay' | 'snowNight' | 'rainySnowDay' | 'rainySnowNight',
}


export const WeatherSpriteIcon = ({imgName}: props) => {
  if (!imgInfo.hasOwnProperty(imgName)) return null;

  //TODO: define imgName Type detail
  const {x, y} = imgInfo[imgName];

  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Image
        src="/images/weather_icon.png"
        alt="weather"
        width={1925}
        height={1737}
        style={{
          objectFit: "none",
          objectPosition: `${-x}px ${-y}px`,
        }}
      />
    </div>
  )
}