import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store/store';
import {MetaMaskProvider} from './providers/MetaMaskProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </Provider>
  </StrictMode>
);
