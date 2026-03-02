import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const WeatherCard = () => {
  const Api_key = import.meta.env.VITE_WEATHER_APP;
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const emojis = ["☀️", "🌤️", "⛅", "🌥️", "🌦️", "🌧️", "⛈️", "❄️"];


  const iconMap = {
    "01d": "sun.svg",
    "01n": "moon.svg",
    "02d": "cloud-sun.svg",
    "02n": "cloud-moon.svg",
    "03d": "storm.svg",
    "03n": "storm.svg",
    "04d": "storm.svg",
    "04n": "storm.svg",
    "09d": "rain.svg",
    "09n": "rain.svg",
    "10d": "rain-sun.svg",
    "10n": "rain.svg",
    "11d": "storm.svg",
    "11n": "storm.svg",
    "13d": "snow.svg",
    "13n": "snow.svg",
    "50d": "rain.svg",
    "50n": "rain.svg",
  };

  const [emojiIndex, setEmojiIndex] = useState(0);
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
    setWeather(null)
    seterror("");
    const timer = setTimeout(() => {
      Fetch();
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setEmojiIndex((prev) => (prev + 1) % emojis.length);
    }, 400);
    return () => {
      clearInterval(interval);
    };
  }, [loading]);
  const weatherIcon = weather
    ? iconMap[weather.weather[0].icon] || "sun.svg"
    : null;
  return (
    <div className="bg-radial p-4 sm:p-6 md:p-8 rounded-2xl min-w-[90vw] sm:rounded-3xl md:rounded-4xl h-[75vh] sm:h-[85vh] w-full sm:w-[90vw] md:w-[85vw] lg:w-[80vw] mx-auto from-[#262626] to-[#0C0C0C] flex flex-col overflow-hidden">
      <div className="flex items-center flex-col sm:flex-row justify-center gap-3 sm:gap-4 outline-none mt-8 sm:mt-12 md:mt-15 flex-shrink-0">
        <div className="relative w-full sm:w-60 max-w-xs">
          <div>
            <img
              src="/location.svg"
              alt="location"
              className="w-6 h-6 sm:w-7 sm:h-7 absolute left-2 sm:left-1 top-1/2 -translate-y-1/2 translate-x-1.8 pointer-events-none"
            />
            <input
              className="border-1 border-white text-gray-300 p-3 w-full placeholder:text-center md:placeholder:text-right text-center rounded-xl outline-none text-sm sm:text-base"
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
          className="bg-white text-black roboto text-lg sm:text-xl px-4 sm:px-3 py-2 hover:bg-gray-300 hover:text-gray-700 rounded-xl w-full sm:w-auto max-w-xs sm:max-w-none"
          onClick={() => setsearch(city)}
        >
          Search
        </button>
      </div>
      {error && (
        <>
          <div className="flex flex-col items-center w-full flex-1 text-center justify-center px-4">
            <div className="flex justify-center items-center p-4">
              <img src="notfound.svg" className="animate-bounce w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48" alt="cloud" />
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl text-white roboto">No place found</p>
          </div>
        </>
      )}
      {loading && !error && (
        <div className="flex justify-center flex-1 flex-col items-center px-4">
          <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce">{emojis[emojiIndex]}</div>
          <div className="text-base sm:text-lg md:text-xl roboto text-gray-200 text-center mt-4">
            <p>Please wait while we are fetching the weather</p>
          </div>
        </div>
      )}
      {!weather && !loading && !error && (
        <div className="flex justify-center text-center px-4 flex-1 items-center">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-184 h-auto">
            <DotLottieReact
              src="https://lottie.host/d16680ca-0b01-4423-9a87-ea3b28c9fe04/UjdVlAe336.lottie"
              loop
              autoplay
            />
            <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl roboto mt-4">
              Start searching to check weather
            </div>
          </div>
        </div>
      )}
      {weather && (
        <>
          <div>
            {weather && (
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 min-h-[60vh] lg:h-[60vh] mx-4 sm:mx-8 md:mx-12 lg:mx-20 px-2">

                <div className="text-white lg:col-span-1 mt-6 sm:mt-8 lg:mt-12">
                  <div className="flex items-center justify-center text-center">
                    <span className="geologica font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl justify-center items-center flex text-center">
                      {weather.main.temp}
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl ml-2">°C</span>
                  </div>
                  <div className="flex items-center text-center text-xl sm:text-2xl md:text-3xl justify-center font-light roboto mt-2">
                    <p className="uppercase justify-center items-center text-center">
                      {weather.weather[0].description}
                    </p>
                  </div>
                  <div className="flex justify-around gap-8 sm:gap-12 md:gap-16 items-end py-4 sm:py-6 mt-4 sm:mt-6">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-8 justify-center font-light items-center text-center">
                      <img src="Wind.svg" alt="wind" className="w-8 h-8 sm:w-10 sm:h-10" />
                      <p className="text-lg sm:text-xl md:text-2xl">Wind</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center font-light gap-2 sm:gap-3 md:gap-5 items-center text-center">
                      <img src="cloud.svg" alt="humidity" className="w-8 h-8 sm:w-10 sm:h-10" />
                      <p className="text-lg sm:text-xl md:text-2xl">Humidity</p>
                    </div>
                  </div>
                  <div className="flex justify-around items-end gap-8 sm:gap-12 py-2">
                    <div className="flex gap-3 sm:gap-5 justify-center font-light items-center text-center">
                      <p className="geologica text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                        {weather.wind.speed} km/h
                      </p>
                    </div>
                    <div className="flex justify-center font-light gap-3 sm:gap-8 items-center text-center">
                      <p className="geologica text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                        {weather.main.humidity}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1 flex justify-center items-center">
                  <img
                    src={`/${weatherIcon}`}
                    className="w-48 h-48 animate-pulse duration-500 transition-all sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-108 xl:h-108 object-contain"
                    alt="weather icon"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
