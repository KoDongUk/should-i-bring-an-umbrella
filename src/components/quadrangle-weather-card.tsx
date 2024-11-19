export const QuadRangleWeatherCard = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-[20vh]">
      <div className="flex items-center justify-center border rounded-lg shadow-lg bg-white">
        <p>departureWeather info</p>
      </div>
      <div className="flex items-center justify-center border rounded-lg p-4 shadow-lg bg-white">
        <p>destinationWeather info</p>
      </div>
    </div>
  )
}