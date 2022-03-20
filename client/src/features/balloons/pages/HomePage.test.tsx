import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";

describe("HomePage", () => {
  beforeAll(() => {});
  test("renders HomePage component", () => {
    render(<HomePage />);
    screen!.debug();
  });

  test("check for Button component in HomePage", () => {
    render(<HomePage />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
