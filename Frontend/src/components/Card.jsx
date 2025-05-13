import React from 'react';

const Card = ({
  children,
  className = '',
  title = null,
  subtitle = null,
  footer = null,
  noPadding = false,
  bordered = false,
  hoverable = false,
  ...props
}) => {
  const baseClasses = 'bg-neutral-800 rounded-lg shadow-sm transition-all';
  const paddingClasses = noPadding ? '' : 'p-6';
  const borderClasses = bordered ? 'border border-neutral-700' : '';
  const hoverClasses = hoverable ? 'hover:shadow-md' : '';

  return (
    <div
      className={`${baseClasses} ${paddingClasses} ${borderClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className={`${!noPadding ? 'mb-4' : 'p-6 pb-0'}`}>
          {title && (
            typeof title === 'string'
              ? <h3 className="text-lg font-semibold text-white">{title}</h3>
              : title
          )}
          {subtitle && (
            typeof subtitle === 'string'
              ? <p className="mt-1 text-sm text-neutral-400">{subtitle}</p>
              : subtitle
          )}
        </div>
      )}

      <div className={noPadding && (title || subtitle) ? 'p-6 pt-4' : ''}>
        {children}
      </div>

      {footer && (
        <div className={`${!noPadding ? 'mt-4 pt-4 border-t border-neutral-700' : 'p-6 pt-0 mt-4 border-t border-neutral-700'}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
