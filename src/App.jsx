import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
function App() {
  return (
    <div className="flex flex-col px-3 pt-4 pb-4 sm:p-0 sm:block min-h-screen">
      <Navbar />
      <WeatherCard />
    </div>
  );
}

export default App;
