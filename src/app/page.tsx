import { WideWeatherCard } from "@/components/wide-weather-card";
import { QuadRangleWeatherCard } from "@/components/quadrangle-weather-card";
import { NarrowWeatherCard } from "@/components/narrow-weather-card";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-blue-500 overflow-auto border-white">
      <div className="">
        <WideWeatherCard />
        <QuadRangleWeatherCard />
        <NarrowWeatherCard />
      </div>
    </div>
  );
}
