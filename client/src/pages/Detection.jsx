import { useState } from 'react';
import ImageUpload from '../components/detection/ImageUpload';
import DetectionResult from '../components/detection/DetectionResult';
import TreatmentCard from '../components/detection/TreatmentCard';
import { analyzeCropImage } from '../services/detectionService';
import toast from 'react-hot-toast';

export default function Detection() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeCropImage(file);
      setResult(data.data);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-surface-900">AI Disease Detection</h1>
        <p className="text-surface-500">Upload a clear photo of the affected crop leaf for instant analysis.</p>
      </div>

      {!result && (
        <div className="card">
          <ImageUpload onUpload={handleUpload} loading={loading} />
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-end">
            <button onClick={reset} className="btn-secondary text-sm">
              Scan Another Image
            </button>
          </div>
          <DetectionResult prediction={result.prediction} />
          <TreatmentCard treatment={result.treatment} />
        </div>
      )}
    </div>
  );
}
