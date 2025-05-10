export default function Button({
  children,
  className = "",
  variant = "default",
  loading = false,
  ...props
}) {
  const baseStyles =
    "justify-center py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg focus:outline-none disabled:opacity-50 cursor-pointer " +
    "dark:bg-[#282828] dark:text-white dark:hover:bg-[#3c3c3c] dark:placeholder-gray-400";

  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
    outline:
      "border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50",
  };

  return (
    <button
      type="button"
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={loading || props.disabled} // Deshabilitar el botón si está cargando
    >
      {loading ? (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
