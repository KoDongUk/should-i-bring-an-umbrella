export const NarrowWeatherCard = () => {
  return (
    <div className="grid grid-cols-2 gap-4 pl-4 pr-4">
      <div>
        {['ex1', 'ex2', 'ex3'].map((item, index) => (
          <div key={index} className="border rounded-lg shadow-lg bg-white p-4 mb-4">
            {item}
          </div>
        ))}
      </div>
      <div>
        {['ex4', 'ex5', 'ex6'].map((item, index) => (
          <div key={index} className="border rounded-lg shadow-lg bg-white p-4 mb-4">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}