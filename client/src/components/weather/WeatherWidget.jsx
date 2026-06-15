import { Cloud, Droplets, Wind, Thermometer, MapPin } from 'lucide-react';

export default function WeatherWidget({ weather }) {
  if (!weather) {
    return (
      <div className="card h-full flex flex-col justify-center items-center text-surface-400 p-8">
        <Cloud className="w-12 h-12 mb-3 text-surface-300" />
        <p>Weather data unavailable</p>
      </div>
    );
  }

  return (
    <div className="card bg-gradient-to-br from-surface-900 to-surface-800 text-white border-none shadow-xl h-full relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-display font-semibold text-surface-100 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary-400" />
              {weather.city}, {weather.country}
            </h3>
            <p className="text-sm text-surface-400 capitalize mt-1">{weather.description}</p>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center border border-white/10">
            <img 
              src={`http://openweathermap.org/img/wn/${weather.icon}.png`} 
              alt={weather.description}
              className="w-10 h-10 object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        <div className="flex items-end gap-2 mb-8">
          <div className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-surface-300">
            {Math.round(weather.temperature)}°
          </div>
          <div className="text-surface-400 mb-2 font-medium">C</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-surface-400 mb-1">
              <Droplets className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Humidity</span>
            </div>
            <div className="font-semibold">{weather.humidity}%</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-surface-400 mb-1">
              <Wind className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Wind</span>
            </div>
            <div className="font-semibold">{(weather.windSpeed * 3.6).toFixed(1)} km/h</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-surface-400 mb-1">
              <Cloud className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Rain</span>
            </div>
            <div className="font-semibold">{weather.rain} mm</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-surface-400 mb-1">
              <Thermometer className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Feels Like</span>
            </div>
            <div className="font-semibold">{Math.round(weather.feelsLike)}°C</div>
          </div>
        </div>
      </div>
    </div>
  );
}
