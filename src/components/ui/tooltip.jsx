export default function Tooltip({ children, message }) {
  return (
    <div className="relative group inline-block">
      {/* Contenido que activa el tooltip */}
      {children}

      {/* Tooltip */}
      {message ? (
        <span
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-hover:visible invisible z-10 py-1 px-2 bg-gray-900 text-white text-xs rounded shadow-lg transition-opacity"
          role="tooltip"
        >
          {message}
        </span>
      ) : null}
    </div>
  );
}
