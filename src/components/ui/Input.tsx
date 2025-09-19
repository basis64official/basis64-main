import React from "react";

interface InputProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataI18n?: string;
  dataI18nPlaceholder?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  placeholder,
  required = false,
  onChange,
  dataI18n,
  dataI18nPlaceholder,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium dark:text-white"
        data-i18n={dataI18n}
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-i18n-placeholder={dataI18nPlaceholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white focus:outline-none focus:ring-2 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};
