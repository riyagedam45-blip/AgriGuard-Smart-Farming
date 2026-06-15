import { useEffect, useState } from 'react';
import { getStats, getHistory } from '../services/weatherService'; // We put history in weatherService for now based on earlier file
import StatsCards from '../components/dashboard/StatsCards';
import RecentScans from '../components/dashboard/RecentScans';
import PredictionHistory from '../components/dashboard/PredictionHistory';
import WeatherWidget from '../components/weather/WeatherWidget';
import WeatherAlerts from '../components/weather/WeatherAlerts';
import Loader from '../components/ui/Loader';
import { useWeather } from '../hooks/useWeather';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { weather, alerts, loading: weatherLoading } = useWeather();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getStats();
        setStats(statsData.data);
        
        const historyData = await getHistory(1, 5);
        setRecentScans(historyData.data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading || weatherLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-surface-900">Dashboard</h1>
          <p className="text-surface-500">Welcome back! Here's an overview of your farm's health.</p>
        </div>
      </div>

      {alerts && alerts.length > 0 && <WeatherAlerts alerts={alerts} />}

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PredictionHistory 
            diseaseDistribution={stats?.diseaseDistribution} 
            scanTrend={stats?.scanTrend} 
          />
        </div>
        <div>
          <WeatherWidget weather={weather} />
        </div>
      </div>

      <RecentScans predictions={recentScans} />
    </div>
  );
}
