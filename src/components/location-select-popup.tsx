import { useState } from "react"
import { cityDetailInfo } from "@/constants/city-info"

type Props = {
  isVisible: boolean,
  onClose: () => void,
  onSubmit: ({city, cityDetail, target}: {city: string, cityDetail: string, target: '출발지'|'도착지',}) => void,
  target: '출발지'|'도착지',
  city: string,
  cityDetail: string,
}

export const LocationSelectPopup = ({ isVisible, onClose, onSubmit, target, city, cityDetail }: Props) => {
  const [selectedCity, setSelectedCity] = useState(city);
  const [selectedCityDetail, setSelectedCityDetail] = useState(cityDetail);

  const onChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  }

  const onChangeCityDetail = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCityDetail(event.target.value);
  }

  const onClickSubmit = () => {
    onSubmit({
      city: selectedCity,
      cityDetail: selectedCityDetail,
      target: target,
    })
    onClose();
  }

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-lg h-[25vh] transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">{target} 설정</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>
      <div className="p-4">
        <div className="flex gap-4 mb-4">
          <select
            className="border rounded-md p-2 flex-1"
            value={city}
            onChange={onChangeCity}
          >
            {cityDetailInfo.map((item) => (
              <option
                key={item.city}
                value={item.city}
              >
                {item.city}
              </option>
            ))}
          </select>
          <select
            className="border rounded-md p-2 flex-1"
            value={selectedCityDetail}
            onChange={onChangeCityDetail}
          >
            {cityDetailInfo[cityDetailInfo.findIndex((item) => item.city === selectedCity)].data.map((item) => (
              <option
                key={item.cityDetail}
                value={item.cityDetail}
              >
                {item.cityDetail}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClickSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
    
  )
}