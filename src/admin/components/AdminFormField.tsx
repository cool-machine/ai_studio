import React from 'react';
import { UseFormRegister, FieldError, Path, FieldValues } from 'react-hook-form';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';

interface AdminFormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'date' | 'file' | 'editor';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  value?: any;
  onChange?: (value: any) => void;
  min?: number;
  max?: number;
  rows?: number;
  accept?: string;
  disabled?: boolean;
  className?: string;
}

function AdminFormField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  required = false,
  options = [],
  value,
  onChange,
  min,
  max,
  rows = 4,
  accept,
  disabled = false,
  className = '',
}: AdminFormFieldProps<T>) {
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            {...register(name, { required: required ? `${label} is required` : false })}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              error ? 'border-red-500' : ''
            } ${className}`}
          />
        );
      case 'select':
        return (
          <select
            id={name}
            {...register(name, { required: required ? `${label} is required` : false })}
            disabled={disabled}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              error ? 'border-red-500' : ''
            } ${className}`}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'date':
        return (
          <DatePicker
            selected={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              error ? 'border-red-500' : ''
            } ${className}`}
            placeholderText={placeholder}
            disabled={disabled}
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
          />
        );
      case 'file':
        return (
          <input
            type="file"
            id={name}
            {...register(name, { required: required ? `${label} is required` : false })}
            accept={accept}
            disabled={disabled}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              error ? 'border-red-500' : ''
            } ${className}`}
          />
        );
      case 'editor':
        return (
          <ReactQuill
            value={value}
            onChange={onChange}
            theme="snow"
            placeholder={placeholder}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean'],
              ],
            }}
            className={`${error ? 'border-red-500' : ''} ${className}`}
          />
        );
      default:
        return (
          <input
            type={type}
            id={name}
            {...register(name, { required: required ? `${label} is required` : false })}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={disabled}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              error ? 'border-red-500' : ''
            } ${className}`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-neutral-dark mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

export default AdminFormField;