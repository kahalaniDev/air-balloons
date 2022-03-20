import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./infrastructure/redux/store";
import { USE_MOCK_SERVER } from "./infrastructure/config";
import ApolloProvider from "./components/apollo/ApolloProvider";
import Routes from "./components/navigation/Routes";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider useMocks={USE_MOCK_SERVER}>
        <BrowserRouter>
          <CssBaseline />
          <Routes />
        </BrowserRouter>
      </ApolloProvider>
    </ReduxProvider>
  );
}

export default App;
