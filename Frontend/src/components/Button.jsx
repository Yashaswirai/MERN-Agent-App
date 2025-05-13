
// Simplified button variants for dark mode only
const variants = {
  primary: 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-md hover:shadow-lg',
  secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-700 hover:to-secondary-600 text-white shadow-md hover:shadow-lg',
  success: 'bg-gradient-to-r from-success-600 to-success-500 hover:from-success-700 hover:to-success-600 text-white shadow-md hover:shadow-lg',
  danger: 'bg-gradient-to-r from-error-600 to-error-500 hover:from-error-700 hover:to-error-600 text-white shadow-md hover:shadow-lg',
  warning: 'bg-gradient-to-r from-warning-600 to-warning-500 hover:from-warning-700 hover:to-warning-600 text-white shadow-md hover:shadow-lg',
  outline: 'border-2 border-primary-400 text-primary-400 hover:bg-primary-900/30 hover:border-primary-300 shadow-sm hover:shadow',
  ghost: 'text-primary-400 hover:bg-primary-900/30',
};

const sizes = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
  xl: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  type = 'button',
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transform hover:scale-[1.02] active:scale-[0.98]';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled || loading ? 'opacity-60 cursor-not-allowed hover:scale-100 active:scale-100' : '';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}

      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}

      {children}

      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
