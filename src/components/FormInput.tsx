import React from "react";

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  error,
  placeholder,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 bg-background border ${
          error ? "border-destructive" : "border-border"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground shadow-sm`}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;