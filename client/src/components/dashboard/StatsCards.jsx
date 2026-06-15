import { TrendingUp, TrendingDown, ScanSearch, Bug, HeartPulse, Clock } from 'lucide-react';

const icons = {
  scans: ScanSearch,
  diseases: Bug,
  health: HeartPulse,
  last: Clock,
};

const gradients = [
  'from-primary-500 to-emerald-400',
  'from-red-500 to-orange-400',
  'from-blue-500 to-cyan-400',
  'from-accent-500 to-amber-400',
];

export default function StatsCards({ stats }) {
  const cards = [
    { key: 'scans', label: 'Total Scans', value: stats?.totalScans ?? 0, icon: 'scans' },
    { key: 'diseases', label: 'Diseases Found', value: stats?.diseasedCount ?? 0, icon: 'diseases' },
    { key: 'health', label: 'Health Rate', value: `${stats?.healthRate ?? 0}%`, icon: 'health' },
    { key: 'last', label: 'Last Scan', value: stats?.lastScan?.crop || 'None yet', icon: 'last', sub: stats?.lastScan?.disease },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = icons[card.icon];
        return (
          <div key={card.key} className="card animate-fade-in group" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-surface-500 font-medium">{card.label}</p>
                <p className="text-2xl font-display font-bold text-surface-800 mt-1">{card.value}</p>
                {card.sub && (
                  <p className="text-xs text-surface-400 mt-0.5">{card.sub}</p>
                )}
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradients[idx]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
