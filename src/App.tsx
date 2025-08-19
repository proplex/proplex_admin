
import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/common/ErrorBoundary';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 4000, // Set toast duration (default is 4000ms)
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
