import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-elevated max-w-lg w-full max-h-[85vh] overflow-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-surface-100">
          <h3 className="text-lg font-display font-semibold text-surface-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors">
            <X className="w-5 h-5 text-surface-400" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
