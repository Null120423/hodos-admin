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

          // Seed Token
          // colorPrimary: "#1B5335",
          // borderRadius: 4,

          // // Alias Token
          // colorBgContainer: "#CDCFC3",
          // colorBgBase: "#CDCFC3",
          // colorText: "#1E1D1D",
          // colorBgLayout: "#F2E8E0",
          // colorBgSolidActive: "#F2E8E0",
          // colorBgElevated: "#F2E8E0",
          // colorTextHeading: "#1E1D1D",
          // colorTextBase: "#1E1D1D",
          // colorTextDescription: "#1E1D1D",
          // colorTextLightSolid: "#1E1D1D",
          // colorTextLabel: "#fff",
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
