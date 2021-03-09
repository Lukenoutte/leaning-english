import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

import HeaderandFooter from "../components/headerAndFooter/headerAndFooter";

afterEach(() => {
  cleanup();
});

test("check header and footer", () => {
  var authenticated = false;
  render(
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          authenticated,
        }}
      >
        <HeaderandFooter />
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const header = screen.getByTestId("header");
  const footer = screen.getByTestId("footer");
  expect(header).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});
