import clsx from 'clsx';

const FormInput = ({ label, required, type = 'text', placeholder, className, ...props }) => {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-sm"
        {...props}
      />
    </div>
  );
};

export default FormInput;
