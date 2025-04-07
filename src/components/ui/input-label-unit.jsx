export default function Input({
  label,
  placeholder,
  id,
  type = "text",
  value,
  onChange,
  ...props
}) {
  return (
    <div className="flex flex-col items-start max-w-sm space-y-3">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
        className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      />
    </div>
  );
}
