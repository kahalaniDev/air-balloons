import Navbar from "./Navbar";
import { Provider as ReduxProvider } from "react-redux";
import { render } from "@testing-library/react";
import { createStore } from "../../infrastructure/redux/store";

describe("Navbar", () => {
  test("check if Navbar match to snapshot", () => {
    expect(
      render(
        <ReduxProvider store={createStore()}>
          <Navbar />
        </ReduxProvider>
      ).asFragment()
    ).toMatchSnapshot();
  });
});
