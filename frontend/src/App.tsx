import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import "./i18n/i18n";
import store from "./redux/store";
import { RouterWrapper } from "./routes/RouteWrapper";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterWrapper />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;