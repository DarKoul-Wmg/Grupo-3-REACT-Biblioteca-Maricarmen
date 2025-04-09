export default function Badge({ children, className = "" }) {
  return (
    <div>
      <span
        className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 ${className}`}
      >
        {children}
      </span>
    </div>
  );
}
