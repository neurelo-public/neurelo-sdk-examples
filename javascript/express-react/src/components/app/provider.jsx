import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

export function AppProvider({ children }) {
  return (
    <HelmetProvider>
      {children}
      <Toaster position="top-right" />
    </HelmetProvider>
  );
}
