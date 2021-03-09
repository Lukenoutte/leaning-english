import { render, screen, cleanup } from "@testing-library/react";
import ChooseLanguage from "../components/chooseLanguage/chooseLanguage";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("check choose language", () => {
  render(<ChooseLanguage />);
  const chooseLanguage = screen.getByTestId("choose-language");
  expect(chooseLanguage).toBeInTheDocument();
});
