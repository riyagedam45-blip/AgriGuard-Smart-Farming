import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function PredictionHistory({ diseaseDistribution = [], scanTrend = [] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Disease Distribution */}
      <div className="card">
        <h3 className="font-display font-semibold text-surface-800 mb-4">Disease Distribution</h3>
        {diseaseDistribution.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={diseaseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="count"
                nameKey="disease"
              >
                {diseaseDistribution.map((entry, index) => (
                  <Cell key={entry.disease} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-surface-400 text-sm">
            No disease data yet
          </div>
        )}
      </div>

      {/* Scan Trend */}
      <div className="card">
        <h3 className="font-display font-semibold text-surface-800 mb-4">Scan Trends</h3>
        {scanTrend.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={scanTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4 }} name="Total" />
              <Line type="monotone" dataKey="diseased" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Diseased" />
              <Line type="monotone" dataKey="healthy" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Healthy" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-surface-400 text-sm">
            No trend data yet
          </div>
        )}
      </div>
    </div>
  );
}
