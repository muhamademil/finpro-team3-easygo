'use client';

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  variant?: 'solid' | 'outlined' | 'white';
};

const Button = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  variant = 'solid',
}: ButtonProps) => {
  const baseClasses =
    'px-4 py-[12px] text-sm text-slate-800 rounded-lg transition disabled:cursor-not-allowed';

  const variantClasses = {
    solid:
      'bg-primary-blue text-white hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer',
    outlined:
      'border border-primary-blue text-primary-blue bg-transparent cursor-pointer hover:bg-primary-blue/20 hover:text-white disabled:border-gray-400 disabled:text-gray-400',
    white:
      'bg-white text-black border border-gray-300 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
