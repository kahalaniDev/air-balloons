import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import ApolloProvider from "../../../components/apollo/ApolloProvider";
import { createStore } from "../../../infrastructure/redux/store";
import LoginPage from "../pages/LoginPage";

describe("LoginPage", () => {
  beforeAll(() => {});
  test("check ifs LoginPage match to snapshot", () => {
    expect(
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <ApolloProvider useMocks>
            <ReduxProvider store={createStore()}>
              <LoginPage />
            </ReduxProvider>
          </ApolloProvider>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });
});
