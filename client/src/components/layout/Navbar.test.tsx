import Navbar from "./Navbar";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "../../infrastructure/redux/store";
import TestRenderer from "react-test-renderer";

describe("Navbar", () => {
  test("check if Navbar match to snapshot", () => {
    const tree = TestRenderer.create(
      <ReduxProvider store={createStore()}>
        <Navbar />
      </ReduxProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
