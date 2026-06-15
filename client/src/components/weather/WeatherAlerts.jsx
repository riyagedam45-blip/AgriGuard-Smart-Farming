import { AlertTriangle, Info, Thermometer, Wind, Droplets, CloudRain, Snowflake, CheckCircle } from 'lucide-react';

const icons = {
  frost: Snowflake,
  heat: Thermometer,
  humidity: Droplets,
  wind: Wind,
  rain: CloudRain,
  drought: Thermometer, // Using Thermometer as fallback for Sun
  'cold-spell': Snowflake, // Using Snowflake as fallback for ThermometerSnowflake
  clear: CheckCircle
};

const styles = {
  low: 'bg-primary-50 border-primary-200 text-primary-800',
  medium: 'bg-accent-50 border-accent-200 text-accent-800',
  high: 'bg-orange-50 border-orange-200 text-orange-800',
  critical: 'bg-red-50 border-red-200 text-red-800'
};

const iconColors = {
  low: 'text-primary-600',
  medium: 'text-accent-600',
  high: 'text-orange-600',
  critical: 'text-red-600'
};

export default function WeatherAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      {alerts.map((alert, index) => {
        const Icon = icons[alert.type] || Info;
        const alertStyle = styles[alert.severity] || styles.low;
        const iconColor = iconColors[alert.severity] || iconColors.low;

        return (
          <div 
            key={index} 
            className={`flex items-start gap-4 p-4 rounded-xl border ${alertStyle} shadow-sm animate-fade-in`}
          >
            <div className="shrink-0 mt-0.5">
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
              <h4 className="font-semibold mb-1">{alert.title}</h4>
              <p className="text-sm opacity-90 leading-relaxed">{alert.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
