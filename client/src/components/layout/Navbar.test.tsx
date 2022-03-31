import Navbar from "./Navbar";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "../../infrastructure/redux/store";
import TestRenderer, { act } from "react-test-renderer";

describe("Navbar", () => {
  test("check if Navbar match to snapshot", () => {
    const tree = TestRenderer.create(
      <ReduxProvider store={createStore()}>
        <Navbar />
      </ReduxProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("check if logout button change the redux store state", async () => {
    const username = "daniel";
    const store = createStore({
      account: {
        isAuth: true,
        loading: false,
        username,
        error: undefined,
      },
    });
    const testInstance = TestRenderer.create(
      <ReduxProvider store={store}>
        <Navbar />
      </ReduxProvider>
    ).root;

    const logoutBtn = await testInstance.findByType("button");
    const usernameH5 = await testInstance.findByType("h5");
    expect(usernameH5.children.includes(username)).toBe(true);
    await act(async () => logoutBtn.props.onClick());
    expect(usernameH5.children.includes(username)).toBe(false);
  });
});
