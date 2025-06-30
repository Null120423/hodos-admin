import { ConfigProvider } from "antd";
import { Suspense } from "react";

import LoadingView from "./components/loading-view";
import { AppRouter } from "./routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#F5896C",
          borderRadius: 4,

          // Alias Token
          colorBgContainer: "#fff",
        },
      }}
    >
      <Suspense fallback={<LoadingView />}>
        <AppRouter />
      </Suspense>
    </ConfigProvider>
  );
}
export default App;
