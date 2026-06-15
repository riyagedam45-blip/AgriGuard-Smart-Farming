import { useState, useEffect } from 'react';
import { getHistory } from '../services/weatherService';
import { formatDate } from '../utils/helpers';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import { Search } from 'lucide-react';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchHistory = async (p = 1, search = '') => {
    setLoading(true);
    try {
      const filters = search ? { crop: search } : {};
      const data = await getHistory(p, 12, filters);
      setHistory(data.data);
      setTotalPages(data.pagination.pages);
      setPage(p);
    } catch (error) {
      console.error('Failed to fetch history', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(1, searchTerm);
  }, [searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchHistory(newPage, searchTerm);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-surface-900">Prediction History</h1>
          <p className="text-surface-500">View your past crop scans and treatment records.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search by crop..."
            className="input pl-10 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && history.length === 0 ? (
        <Loader />
      ) : history.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-surface-500">No scan history found.</p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {history.map((item) => (
              <Card key={item._id} className="p-0 overflow-hidden flex flex-col hover:border-primary-300">
                <div className="h-48 overflow-hidden bg-surface-100">
                  <img
                    src={item.imagePath}
                    alt={item.cropName}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Found'; }}
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-surface-800">{item.cropName}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.status === 'healthy' ? 'bg-primary-100 text-primary-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'healthy' ? 'Healthy' : 'Diseased'}
                    </span>
                  </div>
                  {item.status !== 'healthy' && (
                    <p className="text-sm text-surface-600 mb-2 font-medium line-clamp-1">{item.disease}</p>
                  )}
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs text-surface-500">
                    <span>{formatDate(item.createdAt)}</span>
                    <span className="font-medium">{item.confidence}% confidence</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-surface-600 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
