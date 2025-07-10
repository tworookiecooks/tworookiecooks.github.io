import React from 'react';

interface TextButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

function TextButton({ href, children, className = '', onClick }: TextButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        bg-transparent border-none p-0 cursor-pointer 
        text-inherit no-underline inline-block
        hover:italic 
        hover:underline 
        transition-all duration-200 ease-in-out
        ${className}`}
    >
      {children}
    </a>
  );
}

export default TextButton;