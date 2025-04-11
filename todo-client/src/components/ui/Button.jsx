import React from 'react';

const Button = React.memo(({ children, onClick, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    danger: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button
      className={`${variants[variant]} text-white py-2 px-4 rounded transition-colors`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;