// import { fireEvent, render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router";
// import ApolloProvider from "../../../components/apollo/ApolloProvider";
// import LoginForm from "./LoginForm";
// import { Provider } from "react-redux";
// import { createStore } from "../../../infrastructure/redux/store";
// import { validateUsername, validatePassword } from "../utils/validators";

// describe("LoginForm", () => {
//   test("check validateEmail return correct error message", async () => {
//     expect(validateUsername("")).toBe("Enter username");
//     expect(validateUsername("daniel")).toBe("Illegal email address");
//     expect(validateUsername("daniel")).toBe("");
//   });
//   test("check validatePassword return correct error message", async () => {
//     expect(validatePassword("")).toBe("Enter password");
//     expect(validatePassword("123456")).toBe("");
//   });

//   test("validate empty inputs and showing error", async () => {
//     render(
//       <MemoryRouter initialEntries={["/login"]}>
//         <ApolloProvider useMocks>
//           <Provider store={createStore()}>
//             <LoginForm />
//           </Provider>
//         </ApolloProvider>
//       </MemoryRouter>
//     );
//     fireEvent.submit(screen.getByTestId("form"));
//     expect(screen.getByText("Enter email")).toBeInTheDocument();
//     expect(screen.getByText("Enter password")).toBeInTheDocument();
//   });
// });
