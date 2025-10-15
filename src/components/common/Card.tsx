// components/ReusableCard.tsx (Buat folder 'components' jika belum ada)
import React from 'react';

interface CardProps {
  children: React.ReactNode; // Konten di dalam card
  className?: string; // Untuk menambahkan kelas CSS tambahan jika diperlukan
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`w-full bg-white dark:bg-gray-800 rounded-lg shadow-md ${className || ''}`}>
      {children}
    </div>
  );
};

export default Card;
