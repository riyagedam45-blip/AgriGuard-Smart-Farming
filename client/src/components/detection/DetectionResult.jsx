import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Card from '../ui/Card';

export default function DetectionResult({ prediction }) {
  const isHealthy = prediction.status === 'healthy';

  return (
    <Card className="overflow-hidden p-0 border-none shadow-lg">
      <div className={`p-6 border-b ${isHealthy ? 'bg-primary-50 border-primary-100' : 'bg-red-50 border-red-100'}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${isHealthy ? 'bg-primary-100 text-primary-600' : 'bg-red-100 text-red-600'}`}>
            {isHealthy ? <CheckCircle className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-surface-900 mb-1">
              {isHealthy ? 'Plant appears healthy' : prediction.disease}
            </h2>
            <p className="text-surface-600">
              Crop: <span className="font-semibold text-surface-800">{prediction.cropName}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-4">Analyzed Image</h3>
          <div className="rounded-xl overflow-hidden bg-surface-100 h-48 border border-surface-200">
            <img 
              src={prediction.imagePath} 
              alt="Analyzed crop" 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Found'; }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-4">Analysis Confidence</h3>
          <div className="flex items-center gap-4 mb-2">
            <div className="text-4xl font-display font-black text-surface-800">
              {prediction.confidence}%
            </div>
            <div className={`text-sm font-medium px-2.5 py-1 rounded-md ${
              prediction.confidence > 90 ? 'bg-primary-100 text-primary-700' : 
              prediction.confidence > 75 ? 'bg-blue-100 text-blue-700' : 'bg-accent-100 text-accent-700'
            }`}>
              {prediction.confidence > 90 ? 'High Confidence' : 
               prediction.confidence > 75 ? 'Moderate Confidence' : 'Low Confidence'}
            </div>
          </div>
          
          <div className="w-full h-3 bg-surface-100 rounded-full overflow-hidden mt-4">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                isHealthy ? 'bg-primary-500' : 'bg-red-500'
              }`}
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>

          {!isHealthy && (
            <div className="mt-6 flex items-start gap-3 bg-surface-50 p-4 rounded-xl border border-surface-200">
              <Info className="w-5 h-5 text-surface-500 shrink-0 mt-0.5" />
              <p className="text-sm text-surface-600">
                AI detection is a tool to assist, not replace, expert diagnosis. Consider consulting with a local agricultural extension if symptoms persist.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
