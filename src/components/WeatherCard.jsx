import React, { useEffect, useState } from "react";

const WeatherCard = () => {
  const Api_key = import.meta.env.VITE_WEATHER_APP;
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const emojis = ["☀️", "🌤️", "⛅", "🌥️", "🌦️", "🌧️", "⛈️", "❄️"];
  
  const [emojiIndex, setEmojiIndex] = useState(0)
  const Fetch = async () => {
    try {
      const Response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${Api_key}&units=metric`,
      );
      if (!Response.ok) {
        throw new Error("City not found");
      }
      const data = await Response.json();
      setWeather(data);
    } catch (error) {
      seterror(error.message);
      setWeather(null);
      setCity("");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!search) return;
    setLoading(true);
    seterror("");
    const timer = setTimeout(() => {
      Fetch();
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(()=>{
    if (!loading) return;
    const interval = setInterval(() => {
      setEmojiIndex((prev)=>(prev+1)% emojis.length)
    }, 400);
    return(()=>{clearInterval(interval)})
  }, [loading])
  return (
    <div className="bg-radial p-4 rounded-4xl min-h-[80vh] w-[80vw] from-[#262626] to-[#0C0C0C]">
      <div className="flex items-center justify-center  gap-4 outline-none ">
        <div className="relative w-60 ">
          <div>
            <img
              src="location.svg"
              alt="location"
              className="w-7 h-7 absolute left-1 top-1/2 -translate-y-1/2 translate-x-1.8 pointer-events-none"
            />
            <input
              className="border-1 border-white text-gray-300 p-3 placeholder:text-right text-center rounded-xl outline-none"
              placeholder="Enter place (e.g. London)"
              type="text"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              value={city}
            />
          </div>
        </div>
        <button
          className="bg-white text-black roboto text-xl px-3 py-2 hover:bg-gray-300 hover:text-gray-700 rounded-xl"
          onClick={() => setsearch(city)}
        >
          Search
        </button>
      </div>
      {error && <p>No city found</p>}
      {loading && !error && 
      <div className="flex justify-center h-[60vh] flex-col items-center">
        <div className="text-5xl animate-bounce">
          {emojis[emojiIndex]}
        </div>
        <div className="text-xl roboto text-gray-200">
          <p>Please wait while we are fetching the weather</p>
        </div>

      </div>
        }
      {weather && (
        <>
        <div>
          <div className="text-white">

          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
