export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-soft border border-surface-100 p-6 ${
        hover ? 'hover:shadow-elevated transition-shadow duration-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
