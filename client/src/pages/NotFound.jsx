import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow py-20 px-4 text-center">
      <div className="text-9xl font-display font-black text-surface-200 mb-4">404</div>
      <h1 className="text-3xl font-bold text-surface-800 mb-4">Page Not Found</h1>
      <p className="text-surface-600 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  );
}
