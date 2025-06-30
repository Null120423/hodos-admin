import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { AuthProvider } from "./contexts/auth-context.tsx";
import { SidebarProvider } from "./contexts/sidebar-context.tsx";
import { Provider } from "./provider.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider>
            <Provider>
              <App />
            </Provider>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
