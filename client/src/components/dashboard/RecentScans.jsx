import { formatDate } from '../../utils/helpers';
import { Link } from 'react-router-dom';

export default function RecentScans({ predictions = [] }) {
  if (predictions.length === 0) {
    return (
      <div className="card text-center py-10">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-surface-500 font-medium">No scans yet</p>
        <p className="text-sm text-surface-400 mt-1">Upload a crop image to get started</p>
        <Link to="/detect" className="btn-primary mt-4 inline-block text-sm">
          Start Scanning
        </Link>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0">
      <div className="px-6 py-4 border-b border-surface-100">
        <h3 className="font-display font-semibold text-surface-800">Recent Scans</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Crop</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Result</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Confidence</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {predictions.slice(0, 5).map((pred) => (
              <tr key={pred._id} className="hover:bg-surface-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-surface-800">{pred.cropName}</td>
                <td className="px-6 py-4">
                  <span className={`badge ${pred.status === 'healthy' ? 'badge-healthy' : 'badge-diseased'}`}>
                    {pred.status === 'healthy' ? '✅ Healthy' : `🔴 ${pred.disease}`}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${pred.confidence > 80 ? 'bg-primary-500' : 'bg-accent-500'}`}
                        style={{ width: `${pred.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-surface-500">{pred.confidence}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-surface-500">{formatDate(pred.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
