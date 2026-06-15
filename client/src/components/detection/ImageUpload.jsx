import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import Button from '../ui/Button';

export default function ImageUpload({ onUpload, loading }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: 1,
    disabled: loading
  });

  const handleClear = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFile(null);
  };

  const handleAnalyze = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer overflow-hidden ${
          isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-surface-300 hover:border-primary-400 hover:bg-surface-50'
        } ${preview ? 'border-none p-0' : ''}`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="relative group w-full h-[400px] bg-surface-900 rounded-2xl flex items-center justify-center">
            <img src={preview} alt="Crop preview" className="max-h-full max-w-full object-contain" />
            {!loading && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={handleClear}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-lg"
                  title="Remove Image"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragActive ? 'bg-primary-100 text-primary-600' : 'bg-surface-100 text-surface-500'}`}>
              <UploadCloud className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium text-surface-800 mb-1">
              {isDragActive ? 'Drop image here' : 'Drag & drop crop image here'}
            </p>
            <p className="text-sm text-surface-500 mb-4">or click to browse from your device</p>
            <div className="flex items-center gap-2 text-xs font-medium text-surface-400 bg-surface-100 px-3 py-1.5 rounded-lg">
              <ImageIcon className="w-4 h-4" />
              <span>Supports JPG, PNG, WEBP (Max 10MB)</span>
            </div>
          </div>
        )}
      </div>

      {preview && (
        <div className="flex justify-end">
          <Button onClick={handleAnalyze} loading={loading} className="w-full sm:w-auto px-8">
            Analyze Image
          </Button>
        </div>
      )}
    </div>
  );
}
