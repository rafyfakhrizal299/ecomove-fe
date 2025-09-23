// src/components/Notification.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '../../slices/notification';
import { RootState } from '../../store/mainStore';

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000); // Pesan akan hilang setelah 5 detik
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  const styleClasses = type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';

  return (
    <div className={`fixed top-5 right-5 p-4 rounded-md shadow-lg z-50 ${styleClasses}`}>
      <span>{message}</span>
      <button onClick={() => dispatch(hideNotification())} className="ml-4 text-sm font-bold">
        &times;
      </button>
    </div>
  );
};

export default Notification;
