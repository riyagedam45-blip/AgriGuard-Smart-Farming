import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center flex-grow py-20 px-4 text-center">
      <h1 className="text-5xl font-display font-extrabold text-surface-900 mb-6">
        Protect Your Crops with <span className="text-gradient">AI</span>
      </h1>
      <p className="text-xl text-surface-600 mb-10 max-w-2xl text-balance">
        AgriGuard helps farmers detect crop diseases instantly using advanced AI models. Upload a picture of a sick leaf, get instant results, and receive actionable treatment recommendations.
      </p>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link to="/register" className="btn-primary text-lg px-8 py-4">
              Get Started for Free
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-4">
              Sign In
            </Link>
          </>
        )}
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="card text-left group">
          <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 mb-4 group-hover:scale-110 transition-transform">📸</div>
          <h3 className="text-xl font-bold mb-2">Upload Image</h3>
          <p className="text-surface-600">Take a clear photo of the affected plant leaf and upload it to our platform.</p>
        </div>
        <div className="card text-left group">
          <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center text-accent-600 mb-4 group-hover:scale-110 transition-transform">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI Analyzes</h3>
          <p className="text-surface-600">Our TensorFlow.js model identifies the specific disease with high accuracy.</p>
        </div>
        <div className="card text-left group">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">💊</div>
          <h3 className="text-xl font-bold mb-2">Get Treatment</h3>
          <p className="text-surface-600">Receive step-by-step treatment protocols and prevention strategies.</p>
        </div>
      </div>
    </div>
  );
}
