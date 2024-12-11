import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider
        manifestUrl={`${import.meta.env.VITE_APP_URL}/tonconnect-manifest.json`}
      >
        {children}
      </TonConnectUIProvider>

      <ToastContainer
        theme="dark"
        position="top-center"
        hideProgressBar
        stacked
      />
    </QueryClientProvider>
  );
}
