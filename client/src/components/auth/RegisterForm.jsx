import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Welcome to AgriGuard! 🌿');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="register-name" className="block text-sm font-medium text-surface-700 mb-1.5">Full Name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input id="register-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="John Farmer" className="input pl-10" required />
        </div>
      </div>

      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-surface-700 mb-1.5">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="farmer@agriguard.com" className="input pl-10" required />
        </div>
      </div>

      <div>
        <label htmlFor="register-password" className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input id="register-password" type={showPassword ? 'text' : 'password'} value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" className="input pl-10 pr-10" required />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="register-confirm" className="block text-sm font-medium text-surface-700 mb-1.5">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input id="register-confirm" type="password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="input pl-10" required />
        </div>
      </div>

      <Button type="submit" loading={loading} className="w-full">
        Create Account
      </Button>

      <p className="text-center text-sm text-surface-500">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </form>
  );
}
