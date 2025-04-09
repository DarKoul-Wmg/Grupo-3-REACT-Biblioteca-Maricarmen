export default function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const baseStyles =
    "justify-center py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg focus:outline-none disabled:opacity-50 cursor-pointer";

  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
    outline:
      "border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50",
  };

  // Las variantes disponibles son:
  // "default": Azul con texto blanco
  // "outline": Blanco con borde gris y texto negro

  return (
    <button
      type="button"
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
