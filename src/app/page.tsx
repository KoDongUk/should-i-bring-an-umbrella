import { WideWeatherCard } from "@/components/wide-weather-card";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-blue-500">
      <div className="w-full h-1/6 rounded-2xl border-2 border-white bg-white">
        <WideWeatherCard />
      </div>
    </div>
  );
}
