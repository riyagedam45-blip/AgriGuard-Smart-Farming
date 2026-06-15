import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-primary-400 font-display font-bold text-lg">🌿 AgriGuard</span>
            <span className="text-surface-500">|</span>
            <span className="text-sm">AI-Powered Crop Protection</span>
          </div>
          <p className="text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> for Farmers
            <span className="text-surface-600 ml-2">© {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
