import React from 'react';

const Skeleton = ({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  borderRadius,
  animation = 'pulse',
  ...props 
}) => {
  const baseClasses = 'bg-neutral-200 dark:bg-neutral-700 animate-pulse';
  const variantClasses = {
    rectangular: '',
    circular: 'rounded-full',
    text: 'rounded'
  };
  
  const style = {
    width: width,
    height: height,
    borderRadius: borderRadius,
  };
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant] || ''} ${className}`}
      style={style}
      {...props}
    />
  );
};

// Predefined skeleton components
export const TextSkeleton = ({ lines = 1, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          className={`h-4 ${i === lines - 1 && lines > 1 ? 'w-4/5' : 'w-full'}`}
        />
      ))}
    </div>
  );
};

export const CardSkeleton = ({ className = '', ...props }) => {
  return (
    <div className={`bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 ${className}`} {...props}>
      <Skeleton className="h-6 w-3/4 mb-4" />
      <TextSkeleton lines={3} className="mb-4" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export const TableRowSkeleton = ({ cols = 4, className = '', ...props }) => {
  return (
    <div className={`flex space-x-4 py-4 ${className}`} {...props}>
      {[...Array(cols)].map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-6 ${i === 0 ? 'w-1/6' : 'w-1/4'}`}
        />
      ))}
    </div>
  );
};

export const ProfileSkeleton = ({ className = '', ...props }) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`} {...props}>
      <Skeleton variant="circular" className="h-12 w-12" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
};

export default Skeleton;
