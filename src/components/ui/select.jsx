import React from "react";

export default function Select({
  options = [],
  defaultOption = null,
  placeholder = "Select option...",
  selectClasses = "",
  dropdownClasses = "",
  optionClasses = "",
  icon,
  onChange,
  setSelectedOption,
}) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    if (setSelectedOption) {
      setSelectedOption(selectedOption.value);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={`relative ${dropdownClasses}`}>
      <select
        className={`appearance-none w-full peer p-4 pe-9 block  border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:bg-[#1e1e1e] bg-white text-black border-1 ${selectClasses}`}
        onChange={handleChange}
        defaultValue={defaultOption || ""}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value} className={optionClasses}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
        {icon || (
          <svg
            className="w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
