import Main from "../pages/main";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MainProvider } from "../context/MainContext";
import React from "react";
import { AuthContext } from "../context/AuthContext";

afterEach(() => {
  cleanup();
});

it("main page tests", () => {
  var authenticated = false;


  render(
    <AuthContext.Provider
      value={{
        authenticated,
      }}
    >
      <MainProvider>
        <Main />
      </MainProvider>
    </AuthContext.Provider>
  );
  const input = screen.getByTestId("main-input");
  const tryItButton = screen.getByTestId("try-it");

  expect(input).toBeInTheDocument();
  // expect(header).toMatchSnapshot();
  expect(tryItButton).toBeInTheDocument();
});
