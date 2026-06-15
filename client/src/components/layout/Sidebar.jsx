import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanSearch, History, Cloud } from 'lucide-react';

const links = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: ScanSearch, label: 'Detect', to: '/detect' },
  { icon: History, label: 'History', to: '/history' },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-surface-100 min-h-[calc(100vh-4rem)]">
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-sm shadow-primary-100'
                  : 'text-surface-500 hover:bg-surface-50 hover:text-surface-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary-600' : 'text-surface-400 group-hover:text-surface-600'}`} />
                {label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
