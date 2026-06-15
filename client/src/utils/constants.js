export const APP_NAME = 'AgriGuard';

export const SEVERITY_COLORS = {
  none: { bg: 'bg-primary-100', text: 'text-primary-700', label: 'Healthy' },
  low: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Low' },
  medium: { bg: 'bg-accent-100', text: 'text-accent-700', label: 'Medium' },
  high: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'High' },
  critical: { bg: 'bg-red-100', text: 'text-red-700', label: 'Critical' },
};

export const ALERT_COLORS = {
  low: { bg: 'bg-primary-50', border: 'border-primary-200', text: 'text-primary-700' },
  medium: { bg: 'bg-accent-50', border: 'border-accent-200', text: 'text-accent-700' },
  high: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
  critical: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
};
