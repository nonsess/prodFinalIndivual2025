import './index.css';
import { createRoot } from 'react-dom/client'

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { AppProvider } from './context/AppProvider';
import { AppRoutes } from './routing/AppRoutes';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ErrorBoundary>
  );
}

createRoot(document.getElementById('root')).render(<App />);
