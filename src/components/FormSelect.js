import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const FormSelect = ({ label, required, options = [], placeholder, className, ...props }) => {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-sm appearance-none cursor-pointer"
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default FormSelect;
