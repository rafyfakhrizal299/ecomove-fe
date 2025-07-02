// components/ReusableCard.tsx (Buat folder 'components' jika belum ada)
import React from 'react';

interface CardProps {
  children: React.ReactNode; // Konten di dalam card
  className?: string; // Untuk menambahkan kelas CSS tambahan jika diperlukan
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`max-w-7xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md mx-auto ${
        className || ''
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
