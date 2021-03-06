import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import ApolloProvider from "../../../components/apollo/ApolloProvider";
import LoginForm from "./LoginForm";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "../../../infrastructure/redux/store";

jest.mock("../../../infrastructure/config.ts", () => ({
  __esModule: true,
  USE_MOCK_SERVER: true,
  SERVER_TYPE: {
    GRAPHQL: 0,
    REST: 1,
  },
  ACTIVE_SERVER: 0,
}));

describe("LoginForm", () => {
  test("check if LoginForm match to snapshot", () => {
    expect(
      render(
        <MemoryRouter>
          <ApolloProvider useMocks>
            <ReduxProvider store={createStore()}>
              <LoginForm />
            </ReduxProvider>
          </ApolloProvider>
        </MemoryRouter>
      ).asFragment()
    ).toMatchSnapshot();
  });
  test("validate illegal inputs and showing error", async () => {
    render(
      <MemoryRouter>
        <ApolloProvider useMocks>
          <ReduxProvider store={createStore()}>
            <LoginForm />
          </ReduxProvider>
        </ApolloProvider>
      </MemoryRouter>
    );
    userEvent.type(screen.getByLabelText(/Username/i), "beni");
    userEvent.type(screen.getByLabelText(/Password/i), "123456");
    expect(await screen.findByRole("button")).toBeDisabled();
  });

  test("check login button click with wrong credentials", async () => {
    render(
      <MemoryRouter>
        <ApolloProvider useMocks>
          <ReduxProvider store={createStore()}>
            <LoginForm />
          </ReduxProvider>
        </ApolloProvider>
      </MemoryRouter>
    );
    userEvent.type(screen.getByLabelText(/Username/i), "beni");
    userEvent.type(screen.getByLabelText(/Password/i), "!1234567");
    expect(screen.getByRole("button", { name: /SIGN IN/i })).toBeEnabled();
    userEvent.click(screen.getByRole("button", { name: /SIGN IN/i }));
    expect(
      await screen.findByText(/incorrect username or password/i)
    ).toBeInTheDocument();
  });

  test("check login button click with right credentials", async () => {
    const store = createStore();
    render(
      <MemoryRouter>
        <ApolloProvider useMocks>
          <ReduxProvider store={store}>
            <LoginForm />
          </ReduxProvider>
        </ApolloProvider>
      </MemoryRouter>
    );
    userEvent.type(screen.getByLabelText(/Username/i), "daniel");
    userEvent.type(screen.getByLabelText(/Password/i), "!1234567");
    expect(screen.getByRole("button", { name: /SIGN IN/i })).toBeEnabled();
    userEvent.click(screen.getByRole("button", { name: /SIGN IN/i }));
    await act(() => new Promise((r) => setTimeout(r, 2000)));
    expect(
      screen.queryByText(/incorrect username or password/i)
    ).not.toBeInTheDocument();
  });
});
