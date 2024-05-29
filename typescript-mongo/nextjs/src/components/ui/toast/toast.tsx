'use client';

import { ToastContainer } from 'react-toastify';

export const AppNotifications = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      pauseOnFocusLoss
      pauseOnHover
      theme="dark"
      limit={4}
    />
  );
};
