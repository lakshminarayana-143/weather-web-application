import React, { useState } from "react";
import { Card, CardContent } from "./components/Card";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { CloudSun, Wind, Droplets } from "lucide-react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "13e340f801bdb8daa29b6481ac35e8c6"; 

  const fetchWeather = async () => {
    if (!city.trim()) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setWeather(null);
        setError("City not found. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
      setWeather(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

 
  const getBackgroundImage = () => {
    if (!weather) return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"; // Default (clear day)
    const condition = weather.weather[0].main.toLowerCase();

    if (condition.includes("clear"))
      return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"; // sunny
    if (condition.includes("cloud"))
      return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"; // cloudy
    if (condition.includes("rain"))
      return "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1920&q=80"; // rain
    if (condition.includes("snow"))
      return "https://images.unsplash.com/photo-1608889175123-ff2f735e54b2?auto=format&fit=crop&w=1920&q=80"; // snow
    if (condition.includes("storm") || condition.includes("thunder"))
      return "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1920&q=80"; // thunderstorm
    if (condition.includes("mist") || condition.includes("fog"))
      return "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1920&q=80"; // mist/fog

    return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"; // fallback
  };

  const backgroundStyle = {
    backgroundImage: `url(${getBackgroundImage()})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-white transition-all duration-700 ease-in-out"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <Card className="relative z-10 w-full max-w-md p-6 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 shadow-2xl rounded-2xl border border-white/10 text-white">
        <h1 className="text-4xl font-extrabold text-center mb-6 tracking-tight bg-gradient-to-r from-teal-300 via-pink-400 to-yellow-300 text-transparent bg-clip-text">
          Weather Live
        </h1>

        <div className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-slate-800/60 border-slate-600 text-white placeholder-gray-400"
          />
          <Button
            onClick={fetchWeather}
            className="bg-gradient-to-r from-teal-400 to-pink-500 text-white hover:opacity-90"
          >
            Search
          </Button>
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {weather && (
          <CardContent className="text-center space-y-4">
            <div className="flex justify-center items-center gap-3">
              <CloudSun className="text-yellow-400 w-12 h-12 animate-pulse" />
              <h2 className="text-2xl font-semibold text-cyan-300">
                {weather.name}, {weather.sys.country}
              </h2>
            </div>

            <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 drop-shadow-md">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="capitalize text-lg text-violet-200">
              {weather.weather[0].description}
            </p>

            <div className="flex justify-around mt-6 text-sm">
              <div className="flex items-center gap-2 text-sky-300">
                <Droplets /> <span>{weather.main.humidity}%</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <Wind /> <span>{weather.wind.speed} m/s</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
