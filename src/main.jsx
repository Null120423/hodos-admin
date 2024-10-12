import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/auth.context.jsx';
import { LoadingProvider } from './contexts/loading-global/index.jsx';
import { ModalProvider } from './contexts/modal.context.jsx';
import { SidebarProvider } from './contexts/sidebar.context.jsx';
import { ToastProvider } from './contexts/toast.context.jsx';
import './index.css';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <ModalProvider>
            <LoadingProvider>
              <SidebarProvider>
                <App />
              </SidebarProvider>
            </LoadingProvider>
          </ModalProvider>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
