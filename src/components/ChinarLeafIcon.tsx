import React from 'react';

interface ChinarLeafIconProps {
  className?: string;
  fill?: string;
}

export const ChinarLeafIcon: React.FC<ChinarLeafIconProps> = ({ 
  className = 'w-5 h-5', 
  fill = 'currentColor' 
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Authentic five-lobed Kashmiri Chinar leaf silhouette */}
      <path d="M12 2C11.5 2 11 2.4 10.8 3L10 4.8C9.4 4.6 8.7 4.6 8 4.9C7.2 5.2 6.5 5.8 6.1 6.6L3.8 7C3.1 7.1 2.5 7.8 2.6 8.6C2.7 9.2 3 9.7 3.5 10.1L5.3 11.3C5 12.1 5 13 5.4 13.8C5.8 14.5 6.4 15 7.2 15.2L6.7 17.5C6.5 18.3 7 19.1 7.8 19.3C8.3 19.4 8.8 19.3 9.3 19L11.2 17.7V21.5C11.2 22.1 11.7 22.5 12.2 22.5C12.8 22.5 13.2 22.1 13.2 21.5V17.7L15.2 19C15.6 19.3 16.1 19.4 16.6 19.3C17.4 19.1 17.9 18.3 17.7 17.5L17.2 15.2C18 15 18.6 14.5 19 13.8C19.4 13 19.4 12.1 19.1 11.3L20.9 10.1C21.4 9.7 21.7 9.2 21.8 8.6C21.9 7.8 21.3 7.1 20.6 7L18.3 6.6C17.9 5.8 17.2 5.2 16.4 4.9C15.7 4.6 15 4.6 14.4 4.8L13.6 3C13.4 2.4 12.9 2 12.4 2H12Z" />
    </svg>
  );
};
