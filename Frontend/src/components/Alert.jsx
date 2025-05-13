import React from 'react';

const variants = {
  info: {
    bg: 'bg-primary-50 dark:bg-primary-900/30',
    border: 'border-primary-200 dark:border-primary-800',
    text: 'text-primary-800 dark:text-primary-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  },
  success: {
    bg: 'bg-success-50 dark:bg-success-900/30',
    border: 'border-success-200 dark:border-success-800',
    text: 'text-success-800 dark:text-success-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-warning-50 dark:bg-warning-900/30',
    border: 'border-warning-200 dark:border-warning-800',
    text: 'text-warning-800 dark:text-warning-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-error-50 dark:bg-error-900/30',
    border: 'border-error-200 dark:border-error-800',
    text: 'text-error-800 dark:text-error-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-error-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  },
};

const Alert = ({
  children,
  variant = 'info',
  title = null,
  icon = true,
  dismissible = false,
  onDismiss = null,
  className = '',
  ...props
}) => {
  const variantStyles = variants[variant] || variants.info;
  
  return (
    <div
      className={`flex p-4 rounded-md border ${variantStyles.bg} ${variantStyles.border} ${className}`}
      role="alert"
      {...props}
    >
      {icon && (
        <div className="flex-shrink-0 mr-3">
          {typeof icon === 'boolean' ? variantStyles.icon : icon}
        </div>
      )}
      
      <div className="flex-1">
        {title && (
          <h3 className={`text-sm font-medium ${variantStyles.text}`}>{title}</h3>
        )}
        
        <div className={`${title ? 'mt-1' : ''} text-sm ${variantStyles.text}`}>
          {children}
        </div>
      </div>
      
      {dismissible && (
        <button
          type="button"
          className={`ml-3 flex-shrink-0 ${variantStyles.text} hover:opacity-75 focus:outline-none`}
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
