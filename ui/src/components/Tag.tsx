import React from 'react';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, className }) => {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        backgroundColor: 'transparent',
        border: '1.5px solid #6B4F36', // brown color
        color: '#6B4F36', // brown color
        fontSize: '0.95rem',
        fontWeight: 500,
        gap: '0.5em',
      }}
    >
      {children}
    </span>
  );
};

export default Tag;
