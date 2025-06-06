import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";
import { QueryProvider } from "@shared/providers/QueryProvider";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <QueryProvider>
          <AppRoutes />
        </QueryProvider>
      </BrowserRouter>
    </>
  );
};
