import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';
import Card from '../components/ui/Card';

export default function Register() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-surface-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-surface-900">Create an Account</h2>
          <p className="mt-2 text-surface-600">Join AgriGuard today</p>
        </div>
        
        <Card>
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
}
