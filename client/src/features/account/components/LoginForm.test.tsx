import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import { MemoryRouter } from "react-router";
import ApolloProvider from "../../../components/apollo/ApolloProvider";
import LoginForm from "./LoginForm";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "../../../infrastructure/redux/store";
// import { validateUsername, validatePassword } from "../utils/validators";

describe("LoginForm", () => {
  test("validate empty inputs and showing error", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <ApolloProvider useMocks>
          <ReduxProvider store={createStore()}>
            <LoginForm />
          </ReduxProvider>
        </ApolloProvider>
      </MemoryRouter>
    );
    userEvent.click(screen.getByRole("button", { name: /SIGN IN/i }));
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });
  test("check login button click with right credentials", async () => {
    // render(
    //   <MemoryRouter initialEntries={["/login", "/"]}>
    //     <ApolloProvider useMocks>
    //       <ReduxProvider store={createStore()}>
    //         <LoginForm />
    //       </ReduxProvider>
    //     </ApolloProvider>
    //   </MemoryRouter>
    // );
    // userEvent.type(screen.getByLabelText(/Username/i), "daniel");
    // userEvent.type(screen.getByLabelText(/Password/i), "!1234567");
    // userEvent.click(screen.getByRole("button", { name: /SIGN IN/i }));
    // expect(screen.queryByText("Password is required")).not.toBeInTheDocument();
    // expect(
    //   await screen.findByLabelText(/Incorrect username or password/i)
    // ).not.toBeInTheDocument();
  });
});
