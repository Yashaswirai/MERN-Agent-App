import React, { forwardRef } from 'react';

const Input = forwardRef(({
  id,
  label,
  type = 'text',
  className = '',
  error = null,
  helperText = null,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  required = false,
  disabled = false,
  ...props
}, ref) => {
  const baseInputClasses = 'block rounded-md border-neutral-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-neutral-800 text-white placeholder-neutral-400';
  const errorInputClasses = 'border-error-500 focus:border-error-500 focus:ring-error-500';
  const disabledClasses = 'opacity-60 cursor-not-allowed bg-neutral-900';
  const widthClass = fullWidth ? 'w-full' : '';
  const iconPaddingLeft = icon && iconPosition === 'left' ? 'pl-10' : '';
  const iconPaddingRight = icon && iconPosition === 'right' ? 'pr-10' : '';

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-neutral-300 mb-1"
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          className={`
            ${baseInputClasses}
            ${error ? errorInputClasses : ''}
            ${disabled ? disabledClasses : ''}
            ${widthClass}
            ${iconPaddingLeft}
            ${iconPaddingRight}
          `}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
            {icon}
          </div>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-error-500">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${id}-helper`} className="mt-1 text-sm text-neutral-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
