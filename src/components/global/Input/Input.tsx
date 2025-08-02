import React, { memo, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled';
  fullWidth?: boolean;
}

const Input = memo(forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  fullWidth = false,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseClasses = 'block w-full px-3 py-2 text-sm transition-colors placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-offset-0';
  
  const variantClasses = {
    default: 'border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500',
    filled: 'bg-secondary-50 border border-transparent rounded-md focus:ring-primary-500 focus:bg-white focus:border-primary-500',
  };

  const stateClasses = {
    error: 'border-red-300 focus:ring-red-500 focus:border-red-500',
    disabled: 'bg-secondary-50 text-secondary-500 cursor-not-allowed',
  };

  const inputClasses = clsx(
    baseClasses,
    variantClasses[variant],
    {
      [stateClasses.error]: error,
      [stateClasses.disabled]: props.disabled,
      'pl-10': leftIcon,
      'pr-10': rightIcon,
      'w-full': fullWidth,
    },
    className
  );

  return (
    <div className={clsx('relative', { 'w-full': fullWidth })}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-secondary-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-secondary-400 text-sm">{leftIcon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-secondary-400 text-sm">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
      )}
    </div>
  );
}));

Input.displayName = 'Input';

export default Input;